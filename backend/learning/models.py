from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from datetime import timedelta
from .utils import PimsleurScheduler

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    progress = models.IntegerField(default=0)
    students = models.ManyToManyField(User, related_name='enrolled_courses')

    def __str__(self):
        return self.title

class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    module_type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title} (Курс: {self.course.title})"

class Task(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='tasks')
    question_text = models.TextField()
    image = models.ImageField(upload_to='tasks/', null=True, blank=True)

    def __str__(self):
        return f"Завдання: {self.question_text[:30]}..."

class Progress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_progress')
    completed_modules_count = models.PositiveIntegerField(default=0)
    average_score = models.FloatField(default=0.0)
    current_step = models.IntegerField(default=0)
    next_review = models.DateTimeField(default=timezone.now)
    is_learned = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def update_pimsleur(self, is_correct):
        if is_correct:
            self.next_review = PimsleurScheduler.get_next_review_date(self.current_step)
            self.current_step += 1
            if self.current_step >= len(PimsleurScheduler.INTERVALS):
                self.is_learned = True
        else:
            self.current_step = max(0, self.current_step - 1)
            self.next_review = timezone.now() + timedelta(seconds=5)
        self.save()

class Answer(models.Model):
    progress = models.ForeignKey(Progress, on_delete=models.CASCADE, related_name='answers')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='task_answers')
    is_correct = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)