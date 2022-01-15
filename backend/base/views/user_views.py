from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

from django.db.models.signals import post_save
from django.dispatch import receiver    
from base.models import Balance,Brand,Product
from django.conf import settings
from django.core.mail import send_mail







class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            is_staff=data['isAdmin']

        )
        subject = 'Welcome to BrandUp world'
        message = f'Hi {user.first_name}, thank you for registering in BrandUp.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [data['email'], ]
        send_mail( subject, message, email_from, recipient_list )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)






@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')


@receiver(post_save, sender=User)
def create_user_picks(sender, instance, created, **kwargs):
    if created :
        Balance.objects.create(user=instance)
        if instance.is_staff:
            Brand.objects.create(user=instance)
            subject = 'New Vendor Request'
            message = f'User with name {instance.first_name},and Email {instance.email} request to be a vendor in Brand UP http://localhost:3000/#/admin/userlist'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [settings.EMAIL_HOST_USER ]
            send_mail( subject, message, email_from, recipient_list )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBalance(request):
    user = Balance.objects.get(user=request.user)
    return  Response({"balance":user.balance})

@api_view(['GET'])
def getUserBalance(request, pk):
    user = User.objects.get(id=pk)
    buser = Balance.objects.get(user=user)
    return  Response({"balance":buser.balance})

@api_view(['PUT'])
def updateUserBalance(request, pk):
    user = User.objects.get(id=pk)
    buser = Balance.objects.get(user=user)
    data = request.data
    buser.balance = data['newbalance']

    buser.save()

    return Response({"balance":buser.balance})

@api_view(['GET'])
def getBrandRate(request, pk):
    product = Product.objects.get(_id=pk)
    brand = Brand.objects.get(user=product.user)
    p=brand.positiveCount
    all=p+brand.negativeCount
    rate=(p*10)/all
    return  Response({'rate':rate})

@api_view(['GET'])
def getBrands(request):
    brands=User.objects.filter(is_staff=True)
    serializer = UserSerializer(brands, many=True)
    return Response(serializer.data)
    