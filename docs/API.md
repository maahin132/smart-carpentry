# Smart Carpentry — API Documentation

## 1. Purpose

This document defines the API conventions and endpoint structure for the Smart Carpentry platform.

The API is implemented using:

- Python
- Django
- Django REST Framework
- MySQL

The API connects the React frontend with the backend application and provides structured access to:

- Authentication
- Users
- Materials
- Material pricing
- Furniture templates
- Estimates
- Cutting plans
- Quotations
- Administrative data

This document defines the API contract before implementation.

---

# 2. API Principles

The API should be:

- Predictable
- Consistent
- Secure
- Validated
- Versionable
- Resource-oriented
- Easy to consume from React
- Easy to maintain in Django

Business logic should remain on the backend.

The frontend must never be treated as the authority for:

- Material prices
- Labour rates
- Transport rates
- Final cost calculations
- User permissions
- Administrative actions

---

# 3. Base URL

Development:

text
http://127.0.0.1:8000/api/

## Create a quotation from a saved estimate

`POST /quotations/from-estimate/` requires an authenticated session and a CSRF token.

Request:

```json
{
  "estimate": 42,
  "currency": "INR",
  "subtotal": "12500.00",
  "tax_amount": "2250.00"
}
```

The estimate must belong to the authenticated user. The endpoint creates a project
from the estimate's title and measurements, then creates a linked quotation. Both
records are committed together; if quotation creation fails, the project creation
is rolled back. The response uses the standard quotation representation.