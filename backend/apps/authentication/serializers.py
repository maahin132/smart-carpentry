from django.contrib.auth import password_validation
from rest_framework import serializers

from apps.users.models import User


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
            "organization",
        )

    def validate_email(self, value):
        return value.strip().lower()

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        email = validated_data["email"]

        return User.objects.create_user(
            username=email,
            password=password,
            **validated_data,
        )


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate_email(self, value):
        return value.strip().lower()


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    new_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate_current_password(self, value):
        if not self.context["request"].user.check_password(value):
            raise serializers.ValidationError(
                "Current password is incorrect."
            )

        return value

    def validate_new_password(self, value):
        password_validation.validate_password(
            value,
            user=self.context["request"].user,
        )

        return value


class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

    otp = serializers.CharField(
        min_length=6,
        max_length=6,
        trim_whitespace=True,
    )

    def validate_email(self, value):
        return value.strip().lower()

    def validate_otp(self, value):
        value = value.strip()

        if not value.isdigit():
            raise serializers.ValidationError(
                "Verification code must contain only digits."
            )

        return value


class ResendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        return value.strip().lower()