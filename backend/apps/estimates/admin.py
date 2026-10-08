from django.contrib import admin

from .models import Estimate


@admin.register(Estimate)
class EstimateAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "owner", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("title", "owner__email")
