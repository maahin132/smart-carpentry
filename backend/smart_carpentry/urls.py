from django.contrib import admin
from django.db import DatabaseError, connection
from django.urls import include, path
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthCheckView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        except DatabaseError:
            return Response(
                {"status": "unavailable", "database": "unavailable"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return Response({"status": "ok", "database": "ok"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/health/", HealthCheckView.as_view(), name="health-check"),
    path("api/v1/", include("apps.authentication.urls")),
    path("api/v1/", include("apps.users.urls")),
    path("api/v1/", include("apps.materials.urls")),
    path("api/v1/", include("apps.furniture.urls")),
    path("api/v1/", include("apps.estimates.urls")),
    path("api/v1/", include("apps.optimizer.urls")),
    path("api/v1/", include("apps.quotations.urls")),
    path("api/v1/", include("apps.pricing.urls")),
    path("api/v1/", include("apps.projects.urls")),
]
