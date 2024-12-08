from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    title = models.CharField(max_length=100)
    firstName: models.CharField(max_length=100)
    lastName: models.CharField(max_length=100) 
    email: models.CharField(max_length=100)
    password: models.CharField(max_length=100)

    class Meta:
        app_label = 'users'