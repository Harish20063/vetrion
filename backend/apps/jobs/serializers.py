from rest_framework import serializers
from .models import Job, Application, SavedJob, ContactUnlock, Report
from apps.profiles.models import EmployerProfile

class JobSerializer(serializers.ModelSerializer):
    employer_name = serializers.SerializerMethodField()
    employer_kind = serializers.SerializerMethodField()
    employer_phone = serializers.SerializerMethodField()
    applicants_count = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    is_applied = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id', 'employer', 'title', 'work_type', 'custom_work_type',
            'city', 'area', 'pay', 'pay_unit', 'description', 'status',
            'created_at', 'employer_name', 'employer_kind', 'employer_phone',
            'applicants_count', 'is_saved', 'is_applied'
        ]
        read_only_fields = ['id', 'employer', 'created_at']

    def get_employer_name(self, obj):
        try:
            return obj.employer.employer_profile.name_or_business
        except Exception:
            return "Direct Employer"

    def get_employer_kind(self, obj):
        try:
            return obj.employer.employer_profile.kind
        except Exception:
            return "household"

    def get_employer_phone(self, obj):
        # Server hides phone number until worker applies or is owner
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            # Mask phone for anonymous
            phone = obj.employer.phone
            return phone[:3] + " " + "X" * 4 + " " + phone[-2:] if len(phone) >= 7 else "XXXXX"

        user = request.user
        if user == obj.employer or user.is_staff:
            return obj.employer.phone

        # Check if applied
        if Application.objects.filter(job=obj, worker=user).exists():
            return obj.employer.phone

        # Check if contact unlocked
        if ContactUnlock.objects.filter(viewer=user, target=obj.employer).exists():
            return obj.employer.phone

        # Masked phone
        phone = obj.employer.phone
        return phone[:3] + " " + "X" * 4 + " " + phone[-2:] if len(phone) >= 7 else "XXXXX"

    def get_applicants_count(self, obj):
        return obj.applications.count()

    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return SavedJob.objects.filter(job=obj, worker=request.user).exists()
        return False

    def get_is_applied(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Application.objects.filter(job=obj, worker=request.user).exists()
        return False


class ApplicationSerializer(serializers.ModelSerializer):
    worker_phone = serializers.CharField(source='worker.phone', read_only=True)
    worker_name = serializers.SerializerMethodField()
    job_title = serializers.CharField(source='job.title', read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'job', 'job_title', 'worker', 'worker_name', 'worker_phone', 'status', 'created_at']
        read_only_fields = ['id', 'worker', 'created_at']

    def get_worker_name(self, obj):
        try:
            return obj.worker.worker_profile.name
        except Exception:
            return "Worker"


class SavedJobSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)

    class Meta:
        model = SavedJob
        fields = ['id', 'job', 'created_at']


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'reporter', 'target_type', 'target_id', 'reason', 'status', 'created_at']
        read_only_fields = ['id', 'reporter', 'status', 'created_at']
