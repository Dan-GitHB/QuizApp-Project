from rest_framework import serializers
from .models import Quiz, QuizQuestion, Answer

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class QuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'



class QuizQuestionSerializer(serializers.ModelSerializer):
    quiz =  QuizSerializer()
    answers = QuizAnswerSerializer(many=True)
    class Meta:
        model = QuizQuestion
        fields = '__all__'



        



