from uuid import uuid4

from django.db import transaction
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from apps.projects.models import Project

from .models import Quotation
from .serializers import QuotationFromEstimateSerializer, QuotationSerializer


class QuotationViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuotationSerializer

    def get_queryset(self):
        return Quotation.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=("post",), url_path="from-estimate")
    def create_from_estimate(self, request):
        serializer = QuotationFromEstimateSerializer(
            data=request.data, context=self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        values = serializer.validated_data
        estimate = values["estimate"]

        with transaction.atomic():
            project = Project.objects.create(
                owner=request.user,
                name=estimate.title or f"Estimate {estimate.pk}",
                description=f"Quotation project linked to estimate {estimate.pk}.",
                measurements=estimate.inputs,
            )
            quotation = Quotation.objects.create(
                owner=request.user,
                project=project,
                estimate=estimate,
                reference=f"SC-{uuid4().hex[:12].upper()}",
                currency=values["currency"],
                line_items=[
                    {
                        "description": "Project estimate",
                        "quantity": 1,
                        "unit_price": str(values["subtotal"]),
                        "total": str(values["subtotal"]),
                    }
                ],
                subtotal=values["subtotal"],
                tax_amount=values["tax_amount"],
            )

        return Response(QuotationSerializer(quotation).data, status=201)
