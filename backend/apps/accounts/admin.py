from django.contrib import admin
from .models import User, PhoneOTP

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('phone', 'role', 'status', 'is_active', 'is_staff', 'created_at')
    list_filter = ('role', 'status', 'is_active', 'created_at')
    search_fields = ('phone',)
    ordering = ('-created_at',)
    actions = ['approve_users', 'suspend_users']

    def approve_users(self, request, queryset):
        queryset.update(status='active', is_active=True)
        self.message_user(request, "Selected users have been approved.")
    approve_users.short_description = "Approve selected accounts"

    def suspend_users(self, request, queryset):
        queryset.update(status='suspended', is_active=False)
        self.message_user(request, "Selected users have been suspended.")
    suspend_users.short_description = "Suspend selected accounts"

@admin.register(PhoneOTP)
class PhoneOTPAdmin(admin.ModelAdmin):
    list_display = ('phone', 'otp_code', 'attempts', 'request_count', 'expires_at', 'blocked_until')
    search_fields = ('phone',)
