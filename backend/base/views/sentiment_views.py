from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from base.models import Product
from base.serializers import ProductSerializer
from rest_framework import status
import pickle

@api_view(['POST'])
def getSentiment(request):
    data=request.data
    try:
        review = data['review']
            #Passing data to model & loading the model from disks
        word_vectorize=pickle.load(open("C:/Users/96395/Desktop/word_vectorizer.sav", 'rb'))
        lr_model = pickle.load(open("C:/Users/96395/Desktop/finalized_model.sav", 'rb'))
        review=[review]
        review=word_vectorize.transform(review)
        prediction = lr_model.predict(review)
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
    
    return Response(predictions)