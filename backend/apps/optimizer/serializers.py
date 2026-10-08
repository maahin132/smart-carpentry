from decimal import Decimal

from rest_framework import serializers


class CuttingPartSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    width_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    height_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    quantity = serializers.IntegerField(min_value=1, max_value=200)


class CuttingPlanInputSerializer(serializers.Serializer):
    sheet_width_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    sheet_height_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    kerf_mm = serializers.DecimalField(
        max_digits=8, decimal_places=2, min_value=Decimal("0")
    )
    parts = CuttingPartSerializer(many=True, allow_empty=False, max_length=100)
