from django.contrib import admin

from .models import Quotation


@admin.register(Quotation)
class QuotationAdmin(admin.ModelAdmin):
    list_display = ("reference", "project", "owner", "status", "created_at")
    list_filter = ("status", "currency")
    search_fields = ("reference", "project__name", "owner__email")
