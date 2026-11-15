import os
import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import Payment
from .serializers import PaymentSerializer

class CreatePaymentOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        purpose = request.data.get('purpose', 'job_post_fee')
        amount = request.data.get('amount', 99.00)

        order_id = f"order_{uuid.uuid4().hex[:14]}"

        payment = Payment.objects.create(
            user=request.user,
            purpose=purpose,
            amount=amount,
            gateway_ref=order_id,
            status='pending'
        )

        return Response({
            "order_id": order_id,
            "amount": float(amount),
            "currency": "INR",
            "razorpay_key_id": os.environ.get('RAZORPAY_KEY_ID', 'rzp_test_demo_vetrion'),
            "payment_id": payment.id,
            "message": "Payment order generated. Ready for Razorpay checkout."
        }, status=status.HTTP_201_CREATED)


class VerifyPaymentWebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        order_id = request.data.get('order_id')
        payment_id = request.data.get('payment_id')
        # In production, verify HMAC SHA256 signature from Razorpay
        try:
            payment = Payment.objects.get(gateway_ref=order_id)
            payment.status = 'completed'
            payment.gateway_ref = f"{order_id}:{payment_id}"
            payment.save()
            return Response({"status": "verified", "message": "Payment confirmed."}, status=status.HTTP_200_OK)
        except Payment.DoesNotExist:
            return Response({"error": "Payment order not found."}, status=status.HTTP_404_NOT_FOUND)
