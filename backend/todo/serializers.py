from rest_framework import serializers
from todo.models import Task
from django.utils import timezone


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField(required=True)
    isCompleted = serializers.BooleanField(default='False')
    created = serializers.DateTimeField(read_only=True, default=timezone.now)

    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):
        return Task.objects.create(**validated_data)    

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.text = validated_data.get('text', instance.text)
        instance.isCompleted = validated_data.get('isCompleted', instance.isCompleted)
        instance.save()
        return instance