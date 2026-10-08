from django.conf import settings
from django.db import models

from apps.common.validators import validate_non_negative_decimal, validate_positive_decimal
from apps.projects.models import Project


class CuttingPlan(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="cutting_plans",
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="cutting_plans",
    )
    sheet_width_mm = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[validate_positive_decimal]
    )
    sheet_height_mm = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[validate_positive_decimal]
    )
    kerf_mm = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        default=0,
        validators=[validate_non_negative_decimal],
    )
    parts = models.JSONField(default=list)
    layout = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)
