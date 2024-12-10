from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, firstName, lastName, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        user = self.model(email=email, firstName=firstName, lastName=lastName)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, firstName, lastName, password=None):
        user = self.create_user(email, firstName, lastName, password)
        user.is_admin = True
        user.save(using=self._db)
        return user



class Users(AbstractBaseUser):
    firstName = models.CharField(max_length=100, null=True) # type: ignore
    lastName = models.CharField(max_length=100, null=True)  # type: ignore
    email = models.EmailField(max_length=100, null=True) # type: ignore
    password = models.CharField(max_length=100, null=True) # type: ignore

    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstName', 'lastName']
    class Meta:
        db_table = 'users'

class UserQueries(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    textContent = models.TextField()
    sqlContent = models.TextField()