from django.urls import path
from . import views

urlpatterns = [
    path('Register/', views.register.as_view(), name='register'),
    # path('login/', views.login_view, name='login'),
    # path('logout/', views.logout_view, name='logout'),
]