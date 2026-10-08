from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=32, blank=True)
    organization = models.CharField(max_length=160, blank=True)
    email_verified = models.BooleanField(default=False)

    @property
    def role(self):
        return "admin" if self.is_staff or self.is_superuser else "user"

    def __str__(self):
        return self.email