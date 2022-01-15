from django.shortcuts import render
from rest_framework import response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review,Category,Brand
from base.serializers import ProductSerializer,CategorySerializer,ReviewSerializer
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
import pickle
import os
import tweepy as tw
import pandas as pd
import csv
import re
import string
@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 15)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def getMyProducts(request):
    user = request.user
    products = user.product_set.all()
    page = request.query_params.get('page')
    paginator = Paginator(products,15)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getBrandProducts(request, pk):
    product = Product.objects.get(user=pk)
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand=user.first_name,
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    global pred
    try:
        reviewtext = data['comment']
            #Passing data to model & loading the model from disks
        word_vectorize=pickle.load(open("C:/Users/96395/Desktop/word_vectorizer.sav", 'rb'))
        lr_model = pickle.load(open("C:/Users/96395/Desktop/finalized_model.sav", 'rb'))
        reviewtext=[reviewtext]
        reviewtext=word_vectorize.transform(reviewtext)
        prediction = lr_model.predict(reviewtext)
        predictions = {
                'error' : '0',
                'message' : 'Successfull',
                'prediction' : prediction
            }
    except Exception as e:
        predictions = {
            'error' : '2',
            "message": str(e)
        }
    
    
    if prediction==[1]:
        pred='Positive'
        brand= Brand.objects.get(user=product.user)
        positiveCount=brand.positiveCount
        Brand.objects.filter(user=product.user).update(positiveCount=positiveCount+1)
        subject = 'Positive Review'
        message = f'Hi {product.user.first_name}, The Custumer {user.first_name} write a positive review about your product {product.name} in BrandUp http://localhost:3000/#/product/{product._id}'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [product.user.email,]
       
    else:   
        pred='Negative' 
        brand= Brand.objects.get(user=product.user)
        negativeCount=brand.negativeCount
        Brand.objects.filter(user=product.user).update(negativeCount=negativeCount+1)
        subject = 'Negative Review'
        message = f'Hi {product.user.first_name}, The Custumer {user.first_name} write a negative review about your product {product.name} in BrandUp http://localhost:3000/#/product/{product._id}'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [product.user.email,]
    
    send_mail( subject, message, email_from, recipient_list )
    # 1 - Review already exists
    
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

   
    
    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
            sentiment=pred,
        )
        

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response(pred)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def getPositiveReviews(request):
    user = request.user
    products=user.product_set.all()
    posreviews=Review.objects.filter(sentiment='Positive',product__in=products)
    negreviews=Review.objects.filter(sentiment='Negative',product__in=products)
    positiveCount=len(posreviews)
    negativeCount=len(negreviews)
    serializer1 = ReviewSerializer(posreviews, many=True)
    serializer2 = ReviewSerializer(negreviews, many=True)
    return Response({'posreviews':serializer1.data ,'positiveCount':positiveCount,'negreviews':serializer2.data ,'negativeCount':negativeCount})

@api_view(['POST'])
def getTwitterReviews(request):
    user=request.user
    data = request.data
    consumer_key = "P9dMiLZbZQdIscTHNXo0hQTB4"
    consumer_secret = "qIEKdsvf7VKdmnPxbWLTQMS0rBd30V5kYp7OGifo85RFrr6dx7"
    access_token = "1368162946585665536-ptxczr4BBx9nOrnxJijecqhbMuhhaH"
    access_token_secret = "PVEnP8vJdaGbhQ03kkXppbYZy3c3ONU2R2Xtkl2fvZcqd"
    auth = tw.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tw.API(auth, wait_on_rate_limit=True)
    search_words = "brandup"
    date_since = data['year']+'-'+data['month']+'-'+data['day']
    csvFile=open(search_words+'.csv', 'a')
    csvWriter=csv.writer(csvFile)
    tweets = tw.Cursor(api.search,
                q=search_words,
                since=date_since).items(10)
    users_locs = [[tweet.text,tweet.user.screen_name, tweet.user.location,tweet.created_at] for tweet in tweets]
    tweet_text = pd.DataFrame(data=users_locs, 
                        columns=['tweet','user', "location","createdAt"])
    tweet_text.head()
    tweet_text.to_csv(search_words+'.csv')

    df = pd.read_csv(search_words+'.csv')
    for letter in '#.][!XR':
        df['tweet'] = df['tweet'].astype(str).str.replace(letter,'')
    arabic_punctuations = '''`÷×؛<>_()*&^%][ـ،/:"؟.,'{}~¦+|!”…“–ـ'''
    english_punctuations = string.punctuation
    punctuations_list = arabic_punctuations + english_punctuations

    def remove_punctuations(text):
        translator = str.maketrans('', '', punctuations_list)
        return text.translate(translator)
    def normalize_arabic(text):
        text = re.sub("[إأآا]", "ا", text)
        text = re.sub("ى", "ي", text)
        text = re.sub("ة", "ه", text)
        text = re.sub("گ", "ك", text)
        return text
    def remove_repeating_char(text):
        return re.sub(r'(.)\1+', r'\1', text)
    def processPost(tweet): 

        #Replace @username with empty string
        tweet = re.sub('@[^\s]+', ' ', tweet)
        
        #Convert www.* or https?://* to " "
        tweet = re.sub('((www\.[^\s]+)|(https?://[^\s]+))',' ',tweet)
        
        #Replace #word with word
        tweet = re.sub(r'#([^\s]+)', r'\1', tweet)

        # remove punctuations
        tweet= remove_punctuations(tweet)
        
        # normalize the tweet
        #tweet= normalize_arabic(tweet)
        
        # remove repeated letters
        tweet=remove_repeating_char(tweet)
        
        return tweet

    df["tweet"] = df['tweet'].apply(lambda x: processPost(x))
    df.to_csv(search_words+'.csv')
    word_vectorize=pickle.load(open("C:/Users/96395/Desktop/word_vectorizer.sav", 'rb'))
    lr_model = pickle.load(open("C:/Users/96395/Desktop/finalized_model.sav", 'rb'))
    tweettext=word_vectorize.transform(df['tweet'].astype('str'))
    classes= lr_model.predict(tweettext)
    df["class"]=classes
    df.to_csv(search_words+'.csv')
    result = df.to_json('../frontend/src/export.json',orient="records")
    return Response({result})


