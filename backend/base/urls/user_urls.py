from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),
    

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('', views.getUsers, name="users"),
    path('balance/', views.getMyBalance, name="balance"),
    path('userbalance/<str:pk>/', views.getUserBalance, name='userbalance'),
    path('updatebalance/<str:pk>/', views.updateUserBalance, name='updatebalance'),
    

    path('<str:pk>/', views.getUserById, name='user'),

    

    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),

    path('rate/<str:pk>/', views.getBrandRate, name='brandrate'),
    path('brands/rate', views.getBrands, name='brands'),
]
