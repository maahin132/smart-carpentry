from rest_framework import serializers

from apps.estimates.models import Estimate

from .models import Quotation


class QuotationFromEstimateSerializer(serializers.Serializer):
    estimate = serializers.PrimaryKeyRelatedField(queryset=Estimate.objects.none())
    currency = serializers.RegexField(regex=r"^[A-Z]{3}$", min_length=3, max_length=3)
    subtotal = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=0)
    tax_amount = serializers.DecimalField(
        max_digits=12, decimal_places=2, min_value=0, default=0
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get("request")
        if request is not None and request.user.is_authenticated:
            self.fields["estimate"].queryset = Estimate.objects.filter(
                owner=request.user
            )


class QuotationSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Quotation
        fields = (
            "id",
            "owner",
            "project",
            "estimate",
            "reference",
            "currency",
            "line_items",
            "subtotal",
            "tax_amount",
            "status",
            "valid_until",
            "created_at",
        )
        read_only_fields = ("id", "owner", "created_at")

    def validate_project(self, project):
        if project.owner_id != self.context["request"].user.id:
            raise serializers.ValidationError("Project does not belong to you.")
        return project

    def validate_estimate(self, estimate):
        if (
            estimate is not None
            and estimate.owner_id != self.context["request"].user.id
        ):
            raise serializers.ValidationError("Estimate does not belong to you.")
        return estimate
