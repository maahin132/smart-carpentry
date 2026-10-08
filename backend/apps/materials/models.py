from django.db import models


class Material(models.Model):
    class Category(models.TextChoices):
        PLYWOOD = "plywood", "Plywood"
        MDF = "mdf", "MDF"
        BLOCKBOARD = "blockboard", "Blockboard"
        PARTICLE_BOARD = "particle_board", "Particle Board"
        LAMINATE = "laminate", "Laminate"
        VENEER = "veneer", "Veneer"
        EDGE_BAND = "edge_band", "Edge Band"
        HARDWARE = "hardware", "Hardware"

    name = models.CharField(max_length=120)
    category = models.CharField(max_length=32, choices=Category.choices)
    description = models.TextField(blank=True)
    unit = models.CharField(max_length=32, blank=True)
    specifications = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("category", "name")
        constraints = [
            models.UniqueConstraint(
                fields=("category", "name"), name="unique_material_name_per_category"
            )
        ]

    def __str__(self):
        return self.name
