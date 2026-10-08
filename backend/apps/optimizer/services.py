def optimize_cutting_plan(sheet_width_mm, sheet_height_mm, kerf_mm, parts):
    expanded_parts = []
    for part in parts:
        for index in range(part["quantity"]):
            expanded_parts.append({
                "name": part["name"],
                "width_mm": part["width_mm"],
                "height_mm": part["height_mm"],
                "key": f'{part["name"]}-{index}',
            })
    expanded_parts.sort(
        key=lambda part: max(part["width_mm"], part["height_mm"]),
        reverse=True,
    )

    sheets = []
    for part in expanded_parts:
        part_width = part["width_mm"]
        part_height = part["height_mm"]
        normal_fits = part_width <= sheet_width_mm and part_height <= sheet_height_mm
        rotated_fits = part_height <= sheet_width_mm and part_width <= sheet_height_mm
        if not normal_fits and not rotated_fits:
            raise ValueError(
                f'{part["name"]} does not fit on the selected sheet, even rotated.'
            )

        placed = False
        for sheet in sheets:
            for row in sheet["rows"]:
                next_x = row["used_width_mm"] + kerf_mm
                if (
                    next_x + part_width <= sheet_width_mm
                    and part_height <= row["height_mm"]
                ):
                    row["parts"].append({
                        **part,
                        "x_mm": next_x,
                        "y_mm": row["y_mm"],
                        "placed_width_mm": part_width,
                        "placed_height_mm": part_height,
                        "rotated": False,
                    })
                    row["used_width_mm"] = next_x + part_width
                    placed = True
                    break

                if (
                    next_x + part_height <= sheet_width_mm
                    and part_width <= row["height_mm"]
                ):
                    row["parts"].append({
                        **part,
                        "x_mm": next_x,
                        "y_mm": row["y_mm"],
                        "placed_width_mm": part_height,
                        "placed_height_mm": part_width,
                        "rotated": True,
                    })
                    row["used_width_mm"] = next_x + part_height
                    placed = True
                    break
            if placed:
                break

            next_y = sum(
                row["height_mm"] + kerf_mm for row in sheet["rows"]
            )
            row_normal_fits = (
                next_y + part_height <= sheet_height_mm
                and part_width <= sheet_width_mm
            )
            row_rotated_fits = (
                next_y + part_width <= sheet_height_mm
                and part_height <= sheet_width_mm
            )
            if row_normal_fits or row_rotated_fits:
                rotated = not row_normal_fits and row_rotated_fits
                width = part_height if rotated else part_width
                height = part_width if rotated else part_height
                sheet["rows"].append({
                    "y_mm": next_y,
                    "height_mm": height,
                    "used_width_mm": width,
                    "parts": [{
                        **part,
                        "x_mm": 0,
                        "y_mm": next_y,
                        "placed_width_mm": width,
                        "placed_height_mm": height,
                        "rotated": rotated,
                    }],
                })
                placed = True
                break

        if not placed:
            rotated = not normal_fits and rotated_fits
            width = part_height if rotated else part_width
            height = part_width if rotated else part_height
            sheets.append({
                "rows": [{
                    "y_mm": 0,
                    "height_mm": height,
                    "used_width_mm": width,
                    "parts": [{
                        **part,
                        "x_mm": 0,
                        "y_mm": 0,
                        "placed_width_mm": width,
                        "placed_height_mm": height,
                        "rotated": rotated,
                    }],
                }],
            })

    return {
        "sheet_count": len(sheets),
        "sheets": sheets,
        "part_count": len(expanded_parts),
        "algorithm": "shelf-packing-heuristic",
        "warning": (
            "Planning aid only. Verify grain direction, blade kerf, trimming, "
            "defects, clamping, and safe cut sequence before production."
        ),
    }
