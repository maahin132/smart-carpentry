from rest_framework import serializers

from .models import MaterialPrice


class MaterialPriceSerializer(serializers.ModelSerializer):
    material_name = serializers.CharField(source="material.name", read_only=True)

    class Meta:
        model = MaterialPrice
        fields = ("id", "material", "material_name", "amount", "currency", "unit")
