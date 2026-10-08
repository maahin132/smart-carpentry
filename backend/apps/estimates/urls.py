from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import EstimateCalculationView, EstimateViewSet

router = DefaultRouter()
router.register("estimates", EstimateViewSet, basename="estimate")

urlpatterns = [
    path(
        "estimates/calculate/",
        EstimateCalculationView.as_view(),
        name="estimate-calculate",
    ),
] + router.urls
