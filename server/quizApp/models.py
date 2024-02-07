from django.db import models

class Quiz(models.Model) : 
    titleQuiz = models.CharField(max_length=250)
    numberOfQuestions = models.IntegerField(default=True)
    difficulty = models.CharField(max_length=20, default=True)
    time = models.IntegerField(default=True)
    scoreToPass = models.FloatField(default=True)
    


class QuizQuestion(models.Model) :
    questionQuiz = models.TextField()
    correctAnswer = models.CharField(max_length=250) 
    quiz = models.ForeignKey(Quiz, related_name='questions' ,on_delete=models.CASCADE)
    
    
class Answer(models.Model) :
    question = models.ForeignKey(QuizQuestion, related_name='answers', on_delete=models.CASCADE, default=True) 
    text = models.CharField(max_length=250, default=True) 
    is_correct = models.BooleanField(default=False)
    