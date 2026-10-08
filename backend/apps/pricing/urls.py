from django.urls import path

from .views import MaterialPriceListView

urlpatterns = [
    path(
        "pricing/materials/",
        MaterialPriceListView.as_view(),
        name="material-price-list",
    ),
]
