from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CuttingPlanInputSerializer
from .services import optimize_cutting_plan


class CuttingPlanCalculationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = CuttingPlanInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inputs = serializer.validated_data
        try:
            layout = optimize_cutting_plan(
                inputs["sheet_width_mm"],
                inputs["sheet_height_mm"],
                inputs["kerf_mm"],
                inputs["parts"],
            )
        except ValueError as error:
            return Response({"detail": str(error)}, status=400)
        return Response(layout)
