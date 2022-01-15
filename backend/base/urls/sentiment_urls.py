from django.urls import path
from base.views import sentiment_views as views

urlpatterns = [
    path('', views.getSentiment ,name='sentiment'),
]