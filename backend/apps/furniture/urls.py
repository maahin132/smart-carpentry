from django.urls import path

from .views import FurnitureTemplateListView

urlpatterns = [
    path("furniture/templates/", FurnitureTemplateListView.as_view(), name="furniture-template-list"),
]
