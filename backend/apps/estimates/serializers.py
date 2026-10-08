from decimal import Decimal

from rest_framework import serializers

from .models import Estimate


class EstimateSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Estimate
        fields = (
            "id",
            "owner",
            "project",
            "title",
            "currency",
            "inputs",
            "result",
            "status",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "owner", "status", "created_at", "updated_at")

    def validate_project(self, project):
        if project is not None and project.owner_id != self.context["request"].user.id:
            raise serializers.ValidationError("Project does not belong to you.")
        return project


class EstimateInputSerializer(serializers.Serializer):
    width_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    height_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    depth_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    shelf_count = serializers.IntegerField(min_value=0, max_value=100)
    sheet_width_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    sheet_height_mm = serializers.DecimalField(
        max_digits=10, decimal_places=2, min_value=Decimal("0.01")
    )
    waste_percent = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        min_value=Decimal("0"),
        max_value=Decimal("100"),
    )
