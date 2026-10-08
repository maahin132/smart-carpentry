from django.urls import path

from .views import (
    CsrfTokenView,
    LoginView,
    LogoutView,
    PasswordChangeView,
    RegistrationView,
    ResendOTPView,
    VerifyEmailView,
)

urlpatterns = [
    path(
        "auth/csrf/",
        CsrfTokenView.as_view(),
        name="csrf-token",
    ),
    path(
        "auth/register/",
        RegistrationView.as_view(),
        name="register",
    ),
    path(
        "auth/verify-email/",
        VerifyEmailView.as_view(),
        name="verify-email",
    ),
    path(
        "auth/resend-otp/",
        ResendOTPView.as_view(),
        name="resend-otp",
    ),
    path(
        "auth/login/",
        LoginView.as_view(),
        name="login",
    ),
    path(
        "auth/logout/",
        LogoutView.as_view(),
        name="logout",
    ),
    path(
        "auth/password/change/",
        PasswordChangeView.as_view(),
        name="password-change",
    ),
]