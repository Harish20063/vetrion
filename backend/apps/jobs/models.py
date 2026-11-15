from django.db import models
from django.conf import settings
from apps.profiles.models import CITY_CHOICES, PAY_UNIT_CHOICES

JOB_STATUS_CHOICES = (
    ('open', 'Open (செயலில் உள்ளது)'),
    ('closed', 'Closed (முடிந்தது)'),
)

APPLICATION_STATUS_CHOICES = (
    ('new', 'New (புதியது)'),
    ('shortlisted', 'Shortlisted (தேர்வு செய்யப்பட்டது)'),
    ('rejected', 'Rejected (நிராகரிக்கப்பட்டது)'),
    ('hired', 'Hired (பணியமர்த்தப்பட்டது)'),
)

REPORT_TARGET_CHOICES = (
    ('job', 'Job Posting'),
    ('profile', 'User Profile'),
)

REPORT_STATUS_CHOICES = (
    ('pending', 'Pending Review'),
    ('reviewed', 'Reviewed'),
    ('dismissed', 'Dismissed'),
    ('action_taken', 'Action Taken (Removed/Blocked)'),
)

class Job(models.Model):
    employer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posted_jobs', db_column='employer_id')
    title = models.CharField(max_length=200)
    work_type = models.CharField(max_length=80, db_index=True)
    custom_work_type = models.CharField(max_length=120, blank=True, null=True, help_text="Custom text when 'Other' is picked")
    city = models.CharField(max_length=50, choices=CITY_CHOICES, db_index=True)
    area = models.CharField(max_length=120)
    pay = models.DecimalField(max_digits=10, decimal_places=2)
    pay_unit = models.CharField(max_length=10, choices=PAY_UNIT_CHOICES, default='day')
    description = models.TextField()
    status = models.CharField(max_length=20, choices=JOB_STATUS_CHOICES, default='open', db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        db_table = 'jobs'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['city', 'work_type', 'status']),
        ]

    def __str__(self):
        return f"{self.title} in {self.area}, {self.city} (₹{self.pay}/{self.pay_unit})"


class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications', db_column='job_id')
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='job_applications', db_column='worker_id')
    status = models.CharField(max_length=20, choices=APPLICATION_STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'applications'
        unique_together = ('job', 'worker')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.worker.phone} applied for {self.job.title}"


class SavedJob(models.Model):
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='saved_jobs', db_column='worker_id')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='saved_by_workers', db_column='job_id')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'saved_jobs'
        unique_together = ('worker', 'job')

    def __str__(self):
        return f"{self.worker.phone} saved {self.job.title}"


class ContactUnlock(models.Model):
    viewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='unlocked_contacts', db_column='viewer_id')
    target = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='revealed_to_viewers', db_column='target_id')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'contact_unlocks'
        unique_together = ('viewer', 'target')

    def __str__(self):
        return f"{self.viewer.phone} unlocked {self.target.phone}"


class Report(models.Model):
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='submitted_reports', db_column='reporter_id')
    target_type = models.CharField(max_length=20, choices=REPORT_TARGET_CHOICES)
    target_id = models.CharField(max_length=100)
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=REPORT_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reports'
        ordering = ['-created_at']

    def __str__(self):
        return f"Report by {self.reporter.phone} on {self.target_type}:{self.target_id} ({self.status})"
