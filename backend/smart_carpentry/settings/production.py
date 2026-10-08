"""Production settings with required secret and explicit MySQL configuration."""

import os

from .base import *  # noqa: F403

DEBUG = False

secret_key = os.environ.get("DJANGO_SECRET_KEY", "")
if not secret_key:
    raise RuntimeError("DJANGO_SECRET_KEY must be configured in production.")
if (
    len(secret_key) < 50
    or len(set(secret_key)) < 5
    or secret_key.startswith("django-insecure-")
):
    raise RuntimeError(
        "DJANGO_SECRET_KEY must be a strong, randomly generated value "
        "of at least 50 characters."
    )

required_database_settings = (
    "MYSQL_DATABASE",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "MYSQL_HOST",
    "MYSQL_PORT",
)
missing_database_settings = [
    name for name in required_database_settings if name not in os.environ
]
if missing_database_settings:
    raise RuntimeError(
        "Missing required production database settings: "
        + ", ".join(missing_database_settings)
    )

if not ALLOWED_HOSTS:  # noqa: F405
    raise RuntimeError("DJANGO_ALLOWED_HOSTS must be set in production.")

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = (
    os.environ.get("DJANGO_SECURE_SSL_REDIRECT", "True").lower()
    in {"1", "true", "yes", "on"}
)
SECURE_HSTS_SECONDS = int(os.environ.get("DJANGO_SECURE_HSTS_SECONDS", "3600"))
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = False
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_HOST = os.environ.get("DJANGO_SECURE_SSL_HOST") or None
