from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views



router = DefaultRouter()
router.register(r'searchQuizes', views.SearchForQuizes, basename='quizes'),




urlpatterns = [
    path('', include(router.urls) , name='quiz-fetch'),
    path('questions/', views.QuestionsOfTheQuiz.as_view() , name='oneQuiz'),
    path('quiz/', views.GetQuiz.as_view(), name='quiz')
    
]
