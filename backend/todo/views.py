from rest_framework import generics, permissions, renderers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from todo.models import Task
from todo.serializers import TaskSerializer


class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'todos': reverse('todo-list', request=request, format=format)
    })
