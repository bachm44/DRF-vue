from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from apps.auth import views

urlpatterns = [
    path('api/auth/recaptcha/', views.ReCaptchaValidate.as_view(), name='recaptcha'),
    path('api/all-profiles',
         views.UserProfileListCreateView.as_view(), name='all-profiles'),
    path('api/profile/<int:pk>',
         views.UserProfileDetailView.as_view(), name='profile')
]

#urlpatterns = format_suffix_patterns(urlpatterns)
