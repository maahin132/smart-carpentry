# Smart Carpentry backend

This directory contains the Django REST Framework backend. MySQL is the
required database in every environment; the application does not fall back
to SQLite. Domain apps are organized under `apps/`.

## Windows setup

From the repository root:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Copy `.env.example` to `.env`, set local MySQL credentials, and create the
configured MySQL database before migrating:

```sql
CREATE DATABASE smart_carpentry CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```powershell
Copy-Item .env.example .env
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver
```

The health endpoint is available at
`http://127.0.0.1:8000/api/v1/health/`. The frontend dev server origins on
port 5173 are allowed by default for local API integration.

Session authentication is used for `/api/v1/auth/register/`,
`/api/v1/auth/login/`, and `/api/v1/auth/logout/`. Fetch
`/api/v1/auth/csrf/` first and send the returned token in `X-CSRFToken` on
state-changing requests. `/api/v1/users/me/` returns the authenticated
profile and supports profile updates; `/api/v1/auth/password/change/` changes
the password after validating the current password. Normal accounts cannot
access Django admin; grant staff access only to trusted administrators.

The authenticated API also includes `/api/v1/projects/`,
`/api/v1/quotations/`, and `/api/v1/pricing/materials/`. Material browsing,
furniture templates, estimation, and cutting-plan calculation are also
exposed under `/api/v1/`.
The calculation endpoints are planning aids and do not replace a verified
shop drawing or production cut plan.

For deployment, configure a unique `DJANGO_SECRET_KEY`, set
`DJANGO_DEBUG=False`, and explicitly set `DJANGO_ALLOWED_HOSTS`,
`DJANGO_CORS_ALLOWED_ORIGINS`, `DJANGO_CSRF_TRUSTED_ORIGINS`, and all
`MYSQL_*` values. Set `DJANGO_SECURE_SSL_REDIRECT=True` when HTTPS is served
by the deployment. Never use local development credentials in production.
