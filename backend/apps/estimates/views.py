from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import Estimate
from .serializers import EstimateInputSerializer
from .serializers import EstimateSerializer
from .services import calculate_sheet_estimate


class EstimateViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = EstimateSerializer

    def get_queryset(self):
        return Estimate.objects.filter(owner=self.request.user).select_related("project")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EstimateCalculationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = EstimateInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(calculate_sheet_estimate(serializer.validated_data))
