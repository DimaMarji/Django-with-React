from django.urls import path
from base.views import order_views as views


urlpatterns = [

    path('', views.getOrders, name='orders'),
    path('trans/', views.makeTransaction, name='transaction'),
    path('add/', views.addOrderItems, name='orders-add'),
    
    path('myorders/', views.getMyOrders, name='myorders'),
    path('brandorder/', views.getBrandOrder, name='brandorder'),
    path('todayorder/', views.getTodayOrder, name='todayorder'),
    
    
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),

    
]
