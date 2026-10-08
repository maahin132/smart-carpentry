from django.contrib import admin

from .models import MaterialPrice


@admin.register(MaterialPrice)
class MaterialPriceAdmin(admin.ModelAdmin):
    list_display = (
        "material",
        "amount",
        "currency",
        "unit",
        "effective_from",
        "effective_until",
    )
    list_filter = ("currency", "effective_from")
    search_fields = ("material__name",)
