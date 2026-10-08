from django.urls import path
from rest_framework.routers import DefaultRouter

from .record_views import SavedCuttingPlanViewSet
from .views import CuttingPlanCalculationView

router = DefaultRouter()
router.register("cutting-plans", SavedCuttingPlanViewSet, basename="cutting-plan")

urlpatterns = [
    path(
        "optimizer/calculate/",
        CuttingPlanCalculationView.as_view(),
        name="cutting-plan-calculate",
    ),
] + router.urls
