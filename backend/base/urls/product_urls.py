from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('categories/', views.getCategories, name="categories"),
    path('/brands/<str:pk>/', views.getBrandProducts, name="brand"),
    path('pos/', views.getPositiveReviews, name="positive"),
    

    path('', views.getProducts, name="products"),
    path('myproducts/', views.getMyProducts, name='myproducts'),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('twitter/reviews/brand/', views.getTwitterReviews, name="twitter"),
    
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProduct, name="product"),
    

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),

    


    
]
