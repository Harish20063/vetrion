from rest_framework import serializers
from .models import User

class RequestOTPSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=20)
    role = serializers.ChoiceField(choices=['worker', 'admin'], default='worker')

class VerifyOTPSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=20)
    otp_code = serializers.CharField(max_length=6)

class UserSerializer(serializers.ModelSerializer):
    worker_profile = serializers.SerializerMethodField()
    employer_profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'phone', 'role', 'status', 'created_at', 'worker_profile', 'employer_profile']
        read_only_fields = ['id', 'created_at']

    def get_worker_profile(self, obj):
        if hasattr(obj, 'worker_profile'):
            from apps.profiles.serializers import WorkerProfileSerializer
            return WorkerProfileSerializer(obj.worker_profile).data
        return None

    def get_employer_profile(self, obj):
        if hasattr(obj, 'employer_profile'):
            from apps.profiles.serializers import EmployerProfileSerializer
            return EmployerProfileSerializer(obj.employer_profile).data
        return None
