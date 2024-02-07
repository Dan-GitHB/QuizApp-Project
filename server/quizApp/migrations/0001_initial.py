# Generated by Django 5.0.1 on 2024-02-01 09:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titleQuiz', models.CharField(max_length=250)),
                ('numberOfQuestions', models.IntegerField(default=True)),
                ('difficulty', models.CharField(default=True, max_length=20)),
                ('time', models.IntegerField(default=True)),
                ('scoreToPass', models.FloatField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('questionQuiz', models.TextField()),
                ('correctAnswer', models.CharField(max_length=250)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='quizApp.quiz')),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(default=True, max_length=250)),
                ('is_correct', models.BooleanField(default=False)),
                ('question', models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='quizApp.quizquestion')),
            ],
        ),
    ]