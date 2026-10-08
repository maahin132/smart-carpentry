from django.contrib.auth import get_user_model
from django.test import Client, TestCase


User = get_user_model()


class SessionAuthenticationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="maker@example.com",
            email="maker@example.com",
            password="Secure-Workshop-Pass-928!",
            first_name="Workshop",
            email_verified=True,
        )

    def csrf_token(self, client=None):
        client = client or self.client
        response = client.get("/api/v1/auth/csrf/")
        self.assertEqual(response.status_code, 200)
        return response.json()["csrfToken"]

    def test_current_user_and_protected_resources_reject_anonymous_requests(self):
        self.assertIn(
            self.client.get("/api/v1/users/me/").status_code,
            (401, 403),
        )
        self.assertIn(
            self.client.get("/api/v1/projects/").status_code,
            (401, 403),
        )

    def test_login_logout_and_session_persist_across_requests(self):
        token = self.csrf_token()
        invalid_response = self.client.post(
            "/api/v1/auth/login/",
            {"email": self.user.email, "password": "incorrect"},
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
        )
        self.assertEqual(invalid_response.status_code, 400)
        self.assertEqual(
            invalid_response.json()["detail"],
            "Invalid email or password.",
        )

        login_response = self.client.post(
            "/api/v1/auth/login/",
            {
                "email": self.user.email.upper(),
                "password": "Secure-Workshop-Pass-928!",
            },
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
        )
        self.assertEqual(login_response.status_code, 200)
        self.assertEqual(login_response.json()["user"]["role"], "user")
        self.assertIn("sessionid", self.client.cookies)

        current_user = self.client.get("/api/v1/users/me/")
        self.assertEqual(current_user.status_code, 200)
        self.assertEqual(current_user.json()["email"], self.user.email)

        token = self.csrf_token()
        logout_response = self.client.post(
            "/api/v1/auth/logout/",
            {},
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
        )
        self.assertEqual(logout_response.status_code, 204)
        self.assertIn(
            self.client.get("/api/v1/users/me/").status_code,
            (401, 403),
        )

    def test_login_and_logout_require_csrf_tokens(self):
        client = Client(enforce_csrf_checks=True)
        data = {
            "email": self.user.email,
            "password": "Secure-Workshop-Pass-928!",
        }
        token = self.csrf_token(client)

        blocked_login = client.post(
            "/api/v1/auth/login/",
            data,
            content_type="application/json",
        )
        self.assertEqual(blocked_login.status_code, 403)

        login_response = client.post(
            "/api/v1/auth/login/",
            data,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
        )
        self.assertEqual(login_response.status_code, 200)

        token = self.csrf_token(client)
        blocked_logout = client.post(
            "/api/v1/auth/logout/",
            {},
            content_type="application/json",
        )
        self.assertEqual(blocked_logout.status_code, 403)

        logout_response = client.post(
            "/api/v1/auth/logout/",
            {},
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
        )
        self.assertEqual(logout_response.status_code, 204)

    def test_registration_hashes_password_and_does_not_grant_admin_access(self):
        csrf_client = Client(enforce_csrf_checks=True)
        data = {
            "email": "newmaker@example.com",
            "password": "Secure-Registration-Pass-928!",
            "first_name": "New",
            "last_name": "Maker",
        }

        blocked = csrf_client.post(
            "/api/v1/auth/register/",
            data,
            content_type="application/json",
        )
        self.assertEqual(blocked.status_code, 403)

        token = self.csrf_token(csrf_client)
        response = csrf_client.post(
            "/api/v1/auth/register/",
            data,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
        )
        self.assertEqual(response.status_code, 201)

        user = User.objects.get(email=data["email"])
        self.assertTrue(user.check_password(data["password"]))
        self.assertNotEqual(user.password, data["password"])
        self.assertFalse(user.is_staff)
        self.assertEqual(user.role, "user")

    def test_registration_rejects_weak_password(self):
        response = self.client.post(
            "/api/v1/auth/register/",
            {
                "email": "weakpassword@example.com",
                "password": "password",
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("password", response.json())

    def test_profile_can_be_updated_but_role_cannot_be_escalated(self):
        self.client.force_login(self.user)
        response = self.client.patch(
            "/api/v1/users/me/",
            {"first_name": "Updated", "role": "admin", "is_staff": True},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "Updated")
        self.assertFalse(self.user.is_staff)
        self.assertEqual(response.json()["role"], "user")

    def test_password_change_validates_old_password_and_preserves_session(self):
        self.client.force_login(self.user)

        invalid = self.client.post(
            "/api/v1/auth/password/change/",
            {
                "current_password": "incorrect",
                "new_password": "Secure-New-Workshop-Pass-829!",
            },
            content_type="application/json",
        )
        self.assertEqual(invalid.status_code, 400)
        self.assertIn("current_password", invalid.json())

        changed = self.client.post(
            "/api/v1/auth/password/change/",
            {
                "current_password": "Secure-Workshop-Pass-928!",
                "new_password": "Secure-New-Workshop-Pass-829!",
            },
            content_type="application/json",
        )
        self.assertEqual(changed.status_code, 200)
        self.assertEqual(self.client.get("/api/v1/users/me/").status_code, 200)

        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("Secure-New-Workshop-Pass-829!"))

    def test_normal_user_cannot_access_admin_but_staff_user_can(self):
        self.client.force_login(self.user)
        normal_user_response = self.client.get("/admin/")
        self.assertNotEqual(normal_user_response.status_code, 200)

        administrator = User.objects.create_superuser(
            username="admin@example.com",
            email="admin@example.com",
            password="Secure-Admin-Pass-928!",
        )
        self.client.force_login(administrator)
        administrator_response = self.client.get("/admin/")
        self.assertEqual(administrator_response.status_code, 200)
