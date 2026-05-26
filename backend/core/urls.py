"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from learning.views import PasswordResetRequestView
from learning.views import (
    RegisterView, 
    LoginView, 
    PasswordResetRequestView, 
    PasswordResetConfirmView,
    UserProfileView,
    UserProgressView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/signup/', RegisterView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('api/password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/user/progress/', UserProgressView.as_view(), name='user-progress'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)