from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import MaterialPriceSerializer
from .services import current_material_prices


class MaterialPriceListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MaterialPriceSerializer

    def get_queryset(self):
        return current_material_prices()
