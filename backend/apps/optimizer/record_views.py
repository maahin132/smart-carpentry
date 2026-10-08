from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import CuttingPlan
from .record_serializers import SavedCuttingPlanSerializer


class SavedCuttingPlanViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = SavedCuttingPlanSerializer

    def get_queryset(self):
        return CuttingPlan.objects.filter(owner=self.request.user).select_related(
            "project"
        )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
