from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from datetime import timedelta
import random

class UserManager(BaseUserManager):
    def create_user(self, phone, password=None, role='worker', **extra_fields):
        if not phone:
            raise ValueError('Users must have a phone number')
        phone = phone.strip()
        user = self.model(phone=phone, role=role, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'owner')
        return self.create_user(phone, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('worker', 'Worker (தொழிலாளி)'),
        ('admin', 'Admin / Employer (வேலை கொடுப்பவர்)'),
        ('owner', 'Platform Owner (நிர்வாகி)'),
    )

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('suspended', 'Suspended'),
        ('pending', 'Pending Approval'),
    )

    phone = models.CharField(max_length=20, unique=True, db_index=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='worker')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"{self.phone} ({self.get_role_display()})"


class PhoneOTP(models.Model):
    phone = models.CharField(max_length=20, unique=True, db_index=True)
    otp_code = models.CharField(max_length=6)
    attempts = models.IntegerField(default=0)
    request_count = models.IntegerField(default=1)
    expires_at = models.DateTimeField()
    blocked_until = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'phone_otps'

    def is_blocked(self):
        if self.blocked_until and timezone.now() < self.blocked_until:
            return True
        return False

    def is_expired(self):
        return timezone.now() > self.expires_at

    @classmethod
    def generate_otp(cls, phone):
        now = timezone.now()
        otp_record, created = cls.objects.get_or_create(
            phone=phone,
            defaults={
                'otp_code': f"{random.randint(100000, 999999)}",
                'expires_at': now + timedelta(minutes=5),
                'attempts': 0,
                'request_count': 1
            }
        )

        if not created:
            # Check rate limiting: max 3 requests in 10 minutes
            if otp_record.is_blocked():
                return None, "Phone number temporarily blocked. Please try again later."

            if otp_record.request_count >= 3 and (now - otp_record.updated_at).seconds < 600:
                otp_record.blocked_until = now + timedelta(minutes=30)
                otp_record.save()
                return None, "Too many OTP requests. Blocked for 30 minutes."

            # Generate new 6-digit code valid for 5 minutes
            otp_record.otp_code = f"{random.randint(100000, 999999)}"
            otp_record.expires_at = now + timedelta(minutes=5)
            otp_record.attempts = 0
            otp_record.request_count += 1
            otp_record.save()

        return otp_record.otp_code, None
