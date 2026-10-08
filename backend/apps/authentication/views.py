from django.contrib.auth import login, logout, update_session_auth_hash
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import User
from apps.users.serializers import UserSerializer

from .serializers import (
    EmailVerificationSerializer,
    LoginSerializer,
    PasswordChangeSerializer,
    RegistrationSerializer,
    ResendOTPSerializer,
)

from .services import (
    authenticate_user,
    create_and_send_email_verification_otp,
    resend_email_verification_otp,
    verify_email_verification_otp,
)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CsrfTokenView(APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response(
            {
                "csrfToken": get_token(request),
            }
        )


@method_decorator(csrf_protect, name="dispatch")
class RegistrationView(APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        # Generate OTP and send it to the user's registered email.
        create_and_send_email_verification_otp(user)

        return Response(
            {
                "detail": (
                    "Registration successful. "
                    "Please verify your email using the OTP "
                    "sent to your email address."
                ),
                "email": user.email,
            },
            status=status.HTTP_201_CREATED,
        )


@method_decorator(csrf_protect, name="dispatch")
class VerifyEmailView(APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = EmailVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        otp = serializer.validated_data["otp"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {
                    "detail": "Invalid email or verification code."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.email_verified:
            return Response(
                {
                    "detail": "Email is already verified."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        verified, error = verify_email_verification_otp(
            user,
            otp,
        )

        if not verified:
            return Response(
                {
                    "detail": error
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "detail": "Email verified successfully.",
                "email": user.email,
            },
            status=status.HTTP_200_OK,
        )


@method_decorator(csrf_protect, name="dispatch")
class ResendOTPView(APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = ResendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Do not reveal whether an account exists.
            return Response(
                {
                    "detail": (
                        "If an account exists for this email, "
                        "a verification code can be requested."
                    )
                },
                status=status.HTTP_200_OK,
            )

        if user.email_verified:
            return Response(
                {
                    "detail": "Email is already verified."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            success, _verification_otp, error = (
                resend_email_verification_otp(user)
            )
        except Exception:
            return Response(
                {
                    "detail": (
                        "Unable to send verification code right now. "
                        "Please try again later."
                    )
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        if not success:
            return Response(
                {
                    "detail": error
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        return Response(
            {
                "detail": (
                    "A new verification code has been sent "
                    "to your email address."
                ),
                "email": user.email,
            },
            status=status.HTTP_200_OK,
        )


@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate_user(
            request,
            serializer.validated_data["email"],
            serializer.validated_data["password"],
        )

        if user is None:
            return Response(
                {
                    "detail": "Invalid email or password."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Users must verify their email before they can log in.
        if not user.email_verified:
            return Response(
                {
                    "detail": "Please verify your email before logging in."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        login(request, user)

        return Response(
            {
                "user": UserSerializer(user).data,
                "csrfToken": get_token(request),
            }
        )


@method_decorator(csrf_protect, name="dispatch")
class LogoutView(APIView):
    def post(self, request):
        logout(request)

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


class PasswordChangeView(APIView):
    def post(self, request):
        serializer = PasswordChangeSerializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)

        request.user.set_password(
            serializer.validated_data["new_password"]
        )

        request.user.save(
            update_fields=("password",)
        )

        update_session_auth_hash(
            request,
            request.user,
        )

        return Response(
            {
                "detail": "Password updated."
            }
        )