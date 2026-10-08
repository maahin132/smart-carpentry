from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .serializers import MaterialSerializer
from .services import active_materials


class MaterialListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = MaterialSerializer

    def get_queryset(self):
        return active_materials()
