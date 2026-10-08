from django.db import models
from django.utils import timezone

from apps.materials.models import Material
from apps.common.validators import validate_non_negative_decimal


class MaterialPrice(models.Model):
    material = models.ForeignKey(
        Material, on_delete=models.PROTECT, related_name="prices"
    )
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[validate_non_negative_decimal],
    )
    currency = models.CharField(max_length=3)
    unit = models.CharField(max_length=32)
    effective_from = models.DateField(default=timezone.localdate)
    effective_until = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-effective_from", "material__name")
        constraints = [
            models.CheckConstraint(
                condition=models.Q(effective_until__isnull=True)
                | models.Q(effective_until__gte=models.F("effective_from")),
                name="material_price_valid_date_range",
            )
        ]

    def __str__(self):
        return f"{self.material} {self.amount} {self.currency}/{self.unit}"
