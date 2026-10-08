from rest_framework import serializers

from .models import FurnitureTemplate


class FurnitureTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurnitureTemplate
        fields = ("id", "name", "category", "description", "parts")
