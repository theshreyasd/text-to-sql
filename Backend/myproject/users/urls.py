from django.urls import path
from . import views

urlpatterns = [
    path('Register/', views.register.as_view(), name='register'),
    path('Login/', views.login.as_view(), name='login'),
    path('Logout/', views.logout.as_view(), name='logout'),
    path('Get_user/', views.get_user.as_view(), name='logout'),
    path('Add_uery/', views.add_query.as_view(), name='logout'),
    path('Generate_sql/', views.generate_sql.as_view(), name='logout'),
]

