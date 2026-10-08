from .models import Material


def active_materials():
    return Material.objects.filter(is_active=True)
