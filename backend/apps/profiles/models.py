from django.db import models
from django.conf import settings

CITY_CHOICES = (
    ('Chennai', 'Chennai (சென்னை)'),
    ('Coimbatore', 'Coimbatore (கோயம்புத்தூர்)'),
    ('Madurai', 'Madurai (மதுரை)'),
    ('Tiruchirappalli', 'Tiruchirappalli (திருச்சிராப்பள்ளி)'),
    ('Salem', 'Salem (சேலம்)'),
    ('Tirunelveli', 'Tirunelveli (திருநெல்வேலி)'),
)

AVAILABILITY_CHOICES = (
    ('available', 'Available Now (உடனே கிடைக்கும்)'),
    ('within_week', 'Within a week (ஒரு வாரத்திற்குள்)'),
    ('not_available', 'Unavailable (தற்போது இல்லை)'),
)

PAY_UNIT_CHOICES = (
    ('day', 'Per Day (நாள் ஒன்றுக்கு)'),
    ('month', 'Per Month (மாதம் ஒன்றுக்கு)'),
)

EMPLOYER_KIND_CHOICES = (
    ('household', 'Household (வீட்டு வேலை)'),
    ('shop', 'Shop (கடை)'),
    ('company', 'Company (நிறுவனம்)'),
    ('contractor', 'Contractor (ஒப்பந்ததாரர்)'),
    ('farm', 'Farm (விவசாயம்)'),
)

class WorkerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='worker_profile', db_column='user_id')
    name = models.CharField(max_length=120)
    city = models.CharField(max_length=50, choices=CITY_CHOICES, db_index=True)
    area = models.CharField(max_length=120)
    headline = models.CharField(max_length=200)
    work_types = models.JSONField(default=list, help_text="List of work types / skills")
    expected_pay = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    pay_unit = models.CharField(max_length=10, choices=PAY_UNIT_CHOICES, default='day')
    experience_years = models.PositiveIntegerField(default=1)
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='available', db_index=True)
    about = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'worker_profiles'
        indexes = [
            models.Index(fields=['city', 'availability']),
        ]

    def __str__(self):
        return f"{self.name} - {self.headline} ({self.city})"


class EmployerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employer_profile', db_column='user_id')
    name_or_business = models.CharField(max_length=150)
    kind = models.CharField(max_length=30, choices=EMPLOYER_KIND_CHOICES, default='household')
    city = models.CharField(max_length=50, choices=CITY_CHOICES, db_index=True)
    area = models.CharField(max_length=120)
    about = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employer_profiles'

    def __str__(self):
        return f"{self.name_or_business} ({self.get_kind_display()})"
