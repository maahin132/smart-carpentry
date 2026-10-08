import hashlib
import hmac
import secrets
from datetime import timedelta

from django.conf import settings
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.utils import timezone

from .models import EmailVerificationOTP


def hash_email_verification_otp(otp):
    """
    Create a secure HMAC digest for an email verification OTP.

    The application SECRET_KEY is used so the OTP cannot be
    brute-forced from the database hash alone.
    """

    secret = settings.SECRET_KEY.encode("utf-8")
    message = otp.strip().encode("utf-8")

    return hmac.new(
        secret,
        message,
        hashlib.sha256,
    ).hexdigest()


def authenticate_user(request, email, password):
    return authenticate(
        request,
        username=email,
        password=password,
    )


def generate_email_verification_otp(user):
    """
    Generate and store a new email verification OTP.

    The plain OTP is returned only to the caller so it can be
    sent through the email service. Only its HMAC digest is stored.
    """

    # Invalidate all previous unused OTPs for this user.
    EmailVerificationOTP.objects.filter(
        user=user,
        used_at__isnull=True,
    ).update(
        used_at=timezone.now(),
    )

    otp = f"{secrets.randbelow(1_000_000):06d}"

    otp_hash = hash_email_verification_otp(otp)

    expires_at = timezone.now() + timedelta(minutes=10)

    verification_otp = EmailVerificationOTP.objects.create(
        user=user,
        otp_hash=otp_hash,
        expires_at=expires_at,
    )

    return verification_otp, otp


def verify_email_verification_otp(user, otp):
    """
    Verify the latest valid email verification OTP.

    Returns:
        (True, None) on success
        (False, error_message) on failure
    """

    verification_otp = (
        EmailVerificationOTP.objects
        .filter(
            user=user,
            used_at__isnull=True,
        )
        .order_by("-created_at")
        .first()
    )

    if verification_otp is None:
        return False, "No active verification code found."

    if timezone.now() >= verification_otp.expires_at:
        verification_otp.used_at = timezone.now()
        verification_otp.save(update_fields=("used_at",))
        return False, "Verification code has expired."

    max_attempts = 5

    if verification_otp.attempts >= max_attempts:
        verification_otp.used_at = timezone.now()
        verification_otp.save(update_fields=("used_at",))
        return False, "Too many incorrect attempts."

    submitted_hash = hash_email_verification_otp(otp)

    if not secrets.compare_digest(
        submitted_hash,
        verification_otp.otp_hash,
    ):
        verification_otp.attempts += 1
        verification_otp.save(update_fields=("attempts",))

        remaining = max_attempts - verification_otp.attempts

        if remaining <= 0:
            verification_otp.used_at = timezone.now()
            verification_otp.save(update_fields=("used_at",))
            return False, "Too many incorrect attempts."

        return False, "Invalid verification code."

    verification_otp.used_at = timezone.now()
    verification_otp.save(update_fields=("used_at",))

    user.email_verified = True
    user.save(update_fields=("email_verified",))

    return True, None


def send_email_verification_otp(user, otp):
    """
    Send the email verification OTP to the user's email address.
    """

    subject = "Verify your Smart Carpentry account"

    message = f"""
Hello {user.first_name or user.email},

Thank you for registering with Smart Carpentry.

Your email verification code is:

{otp}

This code is valid for 10 minutes.

If you did not create this account, you can safely ignore this email.

Regards,
Smart Carpentry
"""

    send_mail(
        subject=subject,
        message=message.strip(),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )


def create_and_send_email_verification_otp(user):
    """
    Generate a new OTP, store its hash, and send it
    to the user's registered email address.
    """

    verification_otp, otp = generate_email_verification_otp(user)

    send_email_verification_otp(user, otp)

    return verification_otp


def resend_email_verification_otp(user):
    """
    Generate and send a new email verification OTP.

    A 60-second cooldown prevents repeated OTP requests.

    Returns:
        (True, verification_otp, None) on success
        (False, None, error_message) on failure
    """

    if user.email_verified:
        return False, None, "Email is already verified."

    latest_otp = (
        EmailVerificationOTP.objects
        .filter(
            user=user,
            used_at__isnull=True,
        )
        .order_by("-created_at")
        .first()
    )

    # Prevent requesting a new OTP within 60 seconds.
    if latest_otp is not None:
        cooldown = timedelta(seconds=60)
        next_allowed_time = latest_otp.created_at + cooldown

        now = timezone.now()

        if now < next_allowed_time:
            remaining_seconds = int(
                (next_allowed_time - now).total_seconds()
            )

            return (
                False,
                None,
                f"Please wait {remaining_seconds} seconds before requesting a new code.",
            )

    # Generate a fresh OTP.
    # This automatically invalidates the previous OTP.
    verification_otp, otp = generate_email_verification_otp(user)

    try:
        # Send the new OTP to the user's registered email.
        send_email_verification_otp(user, otp)

    except Exception:
        # Do not leave an active OTP if email delivery fails.
        verification_otp.used_at = timezone.now()
        verification_otp.save(update_fields=("used_at",))

        return (
            False,
            None,
            "Unable to send verification code right now. "
            "Please try again later.",
        )

    return True, verification_otp, None