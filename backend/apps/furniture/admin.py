from django.contrib import admin

from .models import FurnitureTemplate


@admin.register(FurnitureTemplate)
class FurnitureTemplateAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("name", "description")
