from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework import generics
from django.shortcuts import get_object_or_404
from .models import Quiz, QuizQuestion, Answer
from .serializer import QuizSerializer, QuizQuestionSerializer, QuizAnswerSerializer


# Aratam quizeurile atunci cand scriem in search bar
class SearchForQuizes(viewsets.ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()

    def list(self, request, *args, **kwargs):
        text_search_bar = request.GET.get('search', '')

        if not text_search_bar:
            return Response({'error': 'Textul din search bar nu este specificat. Sunt ceva probleme'})

        quizes_who_match_the_search_bar = Quiz.objects.filter(titleQuiz__icontains=text_search_bar)

        serializer = QuizSerializer(quizes_who_match_the_search_bar, many=True)
        return Response(data=serializer.data, status=200)


# Luam toate intrebarile unui quiz si raspunsurile ce apartine fiecarei intrebari
    
class QuestionsOfTheQuiz(generics.ListAPIView) :
    serializer_class = QuizQuestionSerializer
    
    def get_queryset(self):
        queryset = QuizQuestion.objects.all()
        quiz_id = self.request.GET.get('id')
        
        if quiz_id :
            queryset = queryset.filter(quiz=quiz_id)
            
        return queryset




class GetQuiz(APIView):
    def get_queryset(self):
        return Quiz.objects.all()
    
    def get(self, request, *args, **kwargs):
        quiz_id = self.request.GET.get('id', '')

        if quiz_id:
         quiz = get_object_or_404(Quiz, id=quiz_id)
         serializer = QuizSerializer(quiz)
         return Response(serializer.data)
        else:
            return Response({"error": "Missing or invalid 'id' parameter"}, status=400)


