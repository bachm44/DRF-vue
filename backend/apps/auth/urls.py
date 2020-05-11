from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from apps.auth import views

urlpatterns = [
    #path('api/auth/recaptcha/', views.TaskList.as_view(), name='recaptcha-get'),
]

urlpatterns = format_suffix_patterns(urlpatterns)