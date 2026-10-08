from django.contrib import admin

from .models import CuttingPlan


@admin.register(CuttingPlan)
class CuttingPlanAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "project", "created_at")
    search_fields = ("owner__email", "project__name")
