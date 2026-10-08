from rest_framework import serializers

from .models import Material


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = (
            "id",
            "name",
            "category",
            "description",
            "unit",
            "specifications",
        )


class MaterialWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = (
            "id",
            "name",
            "category",
            "description",
            "unit",
            "specifications",
            "is_active",
        )
