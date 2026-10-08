from django.db import models


class FurnitureTemplate(models.Model):
    name = models.CharField(max_length=160)
    category = models.CharField(max_length=80)
    description = models.TextField(blank=True)
    parts = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("category", "name")

    def __str__(self):
        return self.name
