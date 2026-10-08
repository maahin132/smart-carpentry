from decimal import Decimal

from django.test import SimpleTestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from .services import calculate_sheet_estimate


class EstimateCalculationTests(SimpleTestCase):
    def test_estimate_rounds_up_sheet_count_and_reports_scope(self):
        result = calculate_sheet_estimate(
            {
                "width_mm": Decimal("800"),
                "height_mm": Decimal("1200"),
                "depth_mm": Decimal("400"),
                "shelf_count": 2,
                "sheet_width_mm": Decimal("2440"),
                "sheet_height_mm": Decimal("1220"),
                "waste_percent": Decimal("10"),
            }
        )

        self.assertEqual(result["estimated_sheets"], 2)
        self.assertEqual(result["panel_area_m2"], Decimal("3.20"))
        self.assertIn("Excludes doors", result["scope"])


class SavedEstimateAccessTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.owner = user_model.objects.create_user(
            username="estimate-owner@example.test",
            email="estimate-owner@example.test",
            password="Test-Only-Password-928!",
        )
        self.other_user = user_model.objects.create_user(
            username="other-owner@example.test",
            email="other-owner@example.test",
            password="Test-Only-Password-928!",
        )

    def test_saved_estimates_are_owned_and_private(self):
        self.client.force_authenticate(self.owner)
        response = self.client.post(
            "/api/v1/estimates/",
            {
                "title": "Workshop cabinet",
                "inputs": {"width_mm": 1200},
                "result": {"estimated_sheets": 2},
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        estimate_id = response.data["id"]

        self.client.force_authenticate(self.other_user)
        self.assertEqual(
            self.client.get("/api/v1/estimates/").data,
            [],
        )
        self.assertEqual(
            self.client.get(f"/api/v1/estimates/{estimate_id}/").status_code,
            404,
        )
