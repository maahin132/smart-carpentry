from unittest.mock import patch

from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from apps.estimates.models import Estimate
from apps.projects.models import Project

from .models import Quotation


class QuotationAccessTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.owner = user_model.objects.create_user(
            username="quotation-owner@example.test",
            email="quotation-owner@example.test",
            password="Secure-Quotation-Pass-928!",
        )
        self.other_user = user_model.objects.create_user(
            username="quotation-other@example.test",
            email="quotation-other@example.test",
            password="Secure-Quotation-Pass-829!",
        )
        self.project = Project.objects.create(owner=self.owner, name="Workshop cabinet")

    def test_quotations_are_private_to_their_owner(self):
        self.client.force_authenticate(self.owner)
        response = self.client.post(
            "/api/v1/quotations/",
            {
                "project": self.project.id,
                "reference": "SC-PRIVATE-TEST",
                "currency": "INR",
                "line_items": [
                    {"description": "Project estimate", "quantity": 1, "total": 1234}
                ],
                "subtotal": "1234.00",
                "tax_amount": "0.00",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        quotation_id = response.data["id"]

        self.client.force_authenticate(self.other_user)
        self.assertEqual(self.client.get("/api/v1/quotations/").data, [])
        self.assertEqual(
            self.client.get(f"/api/v1/quotations/{quotation_id}/").status_code,
            404,
        )

    def test_creating_quotation_from_estimate_creates_linked_records(self):
        estimate = Estimate.objects.create(
            owner=self.owner,
            title="Hallway cabinet",
            inputs={"width_mm": 1200},
            result={"estimated_sheets": 2},
        )
        self.client.force_authenticate(self.owner)

        response = self.client.post(
            "/api/v1/quotations/from-estimate/",
            {
                "estimate": estimate.id,
                "currency": "INR",
                "subtotal": "12500.00",
                "tax_amount": "2250.00",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["estimate"], estimate.id)
        project = Project.objects.get(pk=response.data["project"])
        self.assertEqual(project.owner, self.owner)
        self.assertEqual(project.name, estimate.title)
        self.assertEqual(project.measurements, estimate.inputs)
        self.assertEqual(Quotation.objects.count(), 1)

    def test_cannot_create_quotation_from_another_users_estimate(self):
        estimate = Estimate.objects.create(owner=self.other_user, title="Private")
        self.client.force_authenticate(self.owner)

        response = self.client.post(
            "/api/v1/quotations/from-estimate/",
            {
                "estimate": estimate.id,
                "currency": "INR",
                "subtotal": "1000.00",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Project.objects.filter(owner=self.owner).count(), 1)
        self.assertEqual(Quotation.objects.count(), 0)

    @patch("apps.quotations.views.Quotation.objects.create")
    def test_project_creation_rolls_back_if_quotation_creation_fails(self, create):
        estimate = Estimate.objects.create(owner=self.owner, title="Hallway cabinet")
        create.side_effect = RuntimeError("Simulated quotation creation failure")
        self.client.force_authenticate(self.owner)

        with self.assertRaisesRegex(
            RuntimeError, "Simulated quotation creation failure"
        ):
            self.client.post(
                "/api/v1/quotations/from-estimate/",
                {
                    "estimate": estimate.id,
                    "currency": "INR",
                    "subtotal": "12500.00",
                },
                format="json",
            )

        self.assertEqual(Project.objects.filter(owner=self.owner).count(), 1)
        self.assertEqual(Quotation.objects.count(), 0)
