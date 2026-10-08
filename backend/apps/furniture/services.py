from .models import FurnitureTemplate


def active_furniture_templates():
    return FurnitureTemplate.objects.filter(is_active=True)
