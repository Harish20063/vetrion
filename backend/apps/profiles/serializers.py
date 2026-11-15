from rest_framework import serializers
from .models import WorkerProfile, EmployerProfile

class WorkerProfileSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source='user.phone', read_only=True)

    class Meta:
        model = WorkerProfile
        fields = [
            'id', 'phone', 'name', 'city', 'area', 'headline', 
            'work_types', 'expected_pay', 'pay_unit', 
            'experience_years', 'availability', 'about', 'updated_at'
        ]
        read_only_fields = ['id', 'updated_at']

class EmployerProfileSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source='user.phone', read_only=True)

    class Meta:
        model = EmployerProfile
        fields = [
            'id', 'phone', 'name_or_business', 'kind', 
            'city', 'area', 'about', 'updated_at'
        ]
        read_only_fields = ['id', 'updated_at']
