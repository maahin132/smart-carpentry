from django.conf import settings
from django.db import models

from apps.projects.models import Project


class Estimate(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        REVIEWED = "reviewed", "Reviewed"
        CONVERTED = "converted", "Converted"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="estimates"
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="estimates",
    )
    title = models.CharField(max_length=160, blank=True)
    currency = models.CharField(max_length=3, blank=True)
    inputs = models.JSONField(default=dict)
    result = models.JSONField(default=dict)
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.DRAFT
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.title or f"Estimate {self.pk}"
