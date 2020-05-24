from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from apps.auth import views

urlpatterns = [
    path('api/auth/recaptcha/', views.ReCaptchaValidate.as_view(), name='recaptcha'),
]

urlpatterns = format_suffix_patterns(urlpatterns)