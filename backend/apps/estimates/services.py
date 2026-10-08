from decimal import Decimal, ROUND_CEILING


def calculate_sheet_estimate(inputs):
    width = inputs["width_mm"]
    height = inputs["height_mm"]
    depth = inputs["depth_mm"]
    shelf_count = inputs["shelf_count"]
    sheet_width = inputs["sheet_width_mm"]
    sheet_height = inputs["sheet_height_mm"]
    waste_percent = inputs["waste_percent"]

    panel_area_mm2 = (
        (Decimal(2) * height * depth)
        + (Decimal(2) * width * depth)
        + (width * height)
        + (Decimal(shelf_count) * width * depth)
    )
    sheet_area_mm2 = sheet_width * sheet_height
    waste_factor = Decimal(1) + (waste_percent / Decimal(100))
    sheet_count = int(
        ((panel_area_mm2 * waste_factor) / sheet_area_mm2).to_integral_value(
            rounding=ROUND_CEILING
        )
    )

    return {
        "panel_area_m2": (panel_area_mm2 / Decimal(1_000_000)).quantize(
            Decimal("0.01")
        ),
        "sheet_area_m2": (sheet_area_mm2 / Decimal(1_000_000)).quantize(
            Decimal("0.01")
        ),
        "estimated_sheets": sheet_count,
        "waste_percent": waste_percent,
        "scope": (
            "Two side panels, top, bottom, one back panel, and the supplied "
            "number of shelves. Excludes doors, board thickness, grain, "
            "edge band, hardware, labour, finishing, and cutting layout."
        ),
    }
