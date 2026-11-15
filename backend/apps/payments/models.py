from django.db import models
from django.conf import settings

PAYMENT_PURPOSE_CHOICES = (
    ('job_post_fee', 'Fee per job post'),
    ('subscription', 'Monthly employer subscription'),
    ('contact_unlock_pack', 'Contact unlock credits'),
    ('featured_listing', 'Featured job listing'),
    ('worker_boost', 'Worker search boost'),
)

PAYMENT_STATUS_CHOICES = (
    ('pending', 'Pending'),
    ('completed', 'Completed'),
    ('failed', 'Failed'),
)

class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments', db_column='user_id')
    purpose = models.CharField(max_length=40, choices=PAYMENT_PURPOSE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    gateway_ref = models.CharField(max_length=120, blank=True, null=True, help_text="Razorpay order or payment ID")
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'payments'
        ordering = ['-created_at']

    def __str__(self):
        return f"Payment {self.id} - ₹{self.amount} by {self.user.phone} ({self.status})"
