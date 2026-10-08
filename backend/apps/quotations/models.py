from django.conf import settings
from django.db import models

from apps.estimates.models import Estimate
from apps.projects.models import Project


class Quotation(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        SENT = "sent", "Sent"
        ACCEPTED = "accepted", "Accepted"
        DECLINED = "declined", "Declined"
        EXPIRED = "expired", "Expired"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="quotations",
    )
    project = models.ForeignKey(
        Project, on_delete=models.PROTECT, related_name="quotations"
    )
    estimate = models.ForeignKey(
        Estimate,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="quotations",
    )
    reference = models.CharField(max_length=40, unique=True)
    currency = models.CharField(max_length=3)
    line_items = models.JSONField(default=list)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.DRAFT
    )
    valid_until = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.reference
