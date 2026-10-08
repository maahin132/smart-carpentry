from django.db.models import Q
from django.utils import timezone

from .models import MaterialPrice


def current_material_prices():
    today = timezone.localdate()
    return (
        MaterialPrice.objects.filter(effective_from__lte=today)
        .filter(Q(effective_until__isnull=True) | Q(effective_until__gte=today))
        .select_related("material")
    )
