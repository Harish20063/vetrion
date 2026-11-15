from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'purpose', 'amount', 'gateway_ref', 'status', 'created_at']
        read_only_fields = ['id', 'user', 'status', 'created_at']
