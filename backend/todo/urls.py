from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from todo import views

urlpatterns = [
    path('api/', views.api_root),
    path('api/todo/', views.TaskList.as_view(), name='todo-list'),
    path('api/todo/<int:pk>/', views.TaskDetail.as_view(), name='todo-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)