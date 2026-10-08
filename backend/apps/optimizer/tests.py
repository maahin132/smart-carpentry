from decimal import Decimal

from django.contrib.auth import get_user_model
from django.test import SimpleTestCase
from rest_framework.test import APITestCase

from .services import optimize_cutting_plan


class CuttingPlanTests(SimpleTestCase):
    def test_parts_are_placed_within_sheet_dimensions(self):
        result = optimize_cutting_plan(
            Decimal("1000"),
            Decimal("1000"),
            Decimal("3"),
            [
                {
                    "name": "side",
                    "width_mm": Decimal("400"),
                    "height_mm": Decimal("700"),
                    "quantity": 2,
                }
            ],
        )

        self.assertEqual(result["part_count"], 2)
        for sheet in result["sheets"]:
            for row in sheet["rows"]:
                for part in row["parts"]:
                    self.assertLessEqual(
                        part["x_mm"] + part["placed_width_mm"], Decimal("1000")
                    )
                    self.assertLessEqual(
                        part["y_mm"] + part["placed_height_mm"], Decimal("1000")
                    )

    def test_part_that_cannot_fit_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "does not fit"):
            optimize_cutting_plan(
                Decimal("100"),
                Decimal("100"),
                Decimal("3"),
                [
                    {
                        "name": "oversized",
                        "width_mm": Decimal("101"),
                        "height_mm": Decimal("101"),
                        "quantity": 1,
                    }
                ],
            )


class SavedCuttingPlanAccessTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.owner = user_model.objects.create_user(
            username="plan-owner@example.test",
            email="plan-owner@example.test",
            password="Test-Only-Password-928!",
        )
        self.other_user = user_model.objects.create_user(
            username="plan-other@example.test",
            email="plan-other@example.test",
            password="Test-Only-Password-928!",
        )

    def test_saved_cutting_plans_are_owned_and_private(self):
        self.client.force_authenticate(self.owner)
        response = self.client.post(
            "/api/v1/cutting-plans/",
            {
                "sheet_width_mm": "2440",
                "sheet_height_mm": "1220",
                "kerf_mm": "3",
                "parts": [{
                    "name": "Shelf",
                    "width_mm": "600",
                    "height_mm": "400",
                    "quantity": 2,
                }],
                "layout": {"sheets": []},
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        plan_id = response.data["id"]

        self.client.force_authenticate(self.other_user)
        self.assertEqual(self.client.get("/api/v1/cutting-plans/").data, [])
        self.assertEqual(
            self.client.get(f"/api/v1/cutting-plans/{plan_id}/").status_code,
            404,
        )
