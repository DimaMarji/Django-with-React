from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress,Balance
from base.serializers import ProductSerializer, OrderSerializer,OrderItemSerializer,UserSerializer

from rest_framework import status
from datetime import datetime,date
from decimal import Decimal
from django.conf import settings
from django.core.mail import send_mail


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')




@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def getBrandOrder(request):
    user = request.user
    products=user.product_set.all()
    ordersitem = OrderItem.objects.filter(product__in=products)
    serializer =OrderItemSerializer(ordersitem, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def getTodayOrder(request):
    user = request.user
    today = date.today()
    orders = Order.objects.filter(createdAt__year=today.year, createdAt__month=today.month, createdAt__day=today.day)
    products=user.product_set.all()
    todayOrderitems = OrderItem.objects.filter(product__in=products,order__in=orders)
    todayOrderCount=len(todayOrderitems)
    
    serializer =OrderItemSerializer(todayOrderitems, many=True)
    return Response({'todayOrderitems':serializer.data,'todayOrderCount':todayOrderCount})





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def makeTransaction(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    amount=0
    try:
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            qty=i['qty']
            price=int(Decimal(i['price']))
            amount=qty*price
            senderUser=user
            receiverUser=product.user
            sender = Balance.objects.get(user = senderUser)
            receiver = Balance.objects.get(user = receiverUser)
            sender.balance = sender.balance - amount
            receiver.balance = receiver.balance +amount
            sender.save()
            receiver.save()
            subject = 'Transfer balance BrandUp'
            message = f'Hi {receiverUser.first_name}, The Custumer {senderUser.first_name} added to your balance {amount} SP.Your balance now is : {receiver.balance} SP'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [receiverUser.email, ]
            send_mail( subject, message, email_from, recipient_list )
            message1 = f'Hi {senderUser.first_name}, You have Tranfer from your balance : {amount}SP.And your balance now is {sender.balance}SP'
            email_from = settings.EMAIL_HOST_USER
            recipient_list1 = [senderUser.email, ]
            send_mail( subject, message1, email_from, recipient_list1 )
            msg = "Transaction Success"
    except Exception as e:
        print(e)
        msg = "Transaction Failure, Please check and try again"
    user = Balance.objects.get(user=request.user)
    return Response({"balance":user.balance,'msg':msg})
            


#user_ids = OrderItem.objects.filter(order=order).values_list('user_id', flat=True)