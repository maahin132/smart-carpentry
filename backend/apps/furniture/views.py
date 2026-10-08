from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .serializers import FurnitureTemplateSerializer
from .services import active_furniture_templates


class FurnitureTemplateListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = FurnitureTemplateSerializer

    def get_queryset(self):
        return active_furniture_templates()
