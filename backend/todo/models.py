from django.db import models


class Task(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=100)
    isCompleted = models.BooleanField(default='False')

    class Meta:
        ordering = ['created']