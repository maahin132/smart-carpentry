from decimal import Decimal

from rest_framework import serializers

from apps.projects.models import Project

from .models import CuttingPlan
from .serializers import CuttingPartSerializer


class SavedCuttingPlanSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    parts = CuttingPartSerializer(many=True, allow_empty=False, max_length=100)
    project = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = CuttingPlan
        fields = (
            "id",
            "owner",
            "project",
            "sheet_width_mm",
            "sheet_height_mm",
            "kerf_mm",
            "parts",
            "layout",
            "created_at",
        )
        read_only_fields = ("id", "owner", "created_at")

    def validate_project(self, project):
        if project is not None and project.owner_id != self.context["request"].user.id:
            raise serializers.ValidationError("Project does not belong to you.")
        return project

    def validate_layout(self, layout):
        if not isinstance(layout, dict):
            raise serializers.ValidationError("Layout must be an object.")
        return layout

    def validate_parts(self, parts):
        return [
            {
                **part,
                "width_mm": str(part["width_mm"]),
                "height_mm": str(part["height_mm"]),
            }
            for part in parts
        ]

    def validate_kerf_mm(self, value):
        if value < Decimal("0"):
            raise serializers.ValidationError("Kerf must not be negative.")
        return value
