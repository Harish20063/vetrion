from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, PhoneOTP
from .serializers import RequestOTPSerializer, VerifyOTPSerializer, UserSerializer
from django.utils import timezone

class RequestOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RequestOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        phone = serializer.validated_data['phone'].strip()
        otp_code, error = PhoneOTP.generate_otp(phone)
        if error:
            return Response({"error": error}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        # In real production, send SMS using Fast2SMS / Twilio.
        # For development and demonstration, return OTP code directly so testing is effortless!
        return Response({
            "message": "OTP sent successfully. Valid for 5 minutes.",
            "phone": phone,
            "demo_otp": otp_code,
            "note": "In production, this code is delivered via SMS."
        }, status=status.HTTP_200_OK)


class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        phone = serializer.validated_data['phone'].strip()
        code = serializer.validated_data['otp_code'].strip()

        try:
            otp_record = PhoneOTP.objects.get(phone=phone)
        except PhoneOTP.DoesNotExist:
            return Response({"error": "No OTP requested for this phone number."}, status=status.HTTP_404_NOT_FOUND)

        if otp_record.is_blocked():
            return Response({"error": "Phone number is temporarily blocked. Try again in 30 minutes."}, status=status.HTTP_403_FORBIDDEN)

        if otp_record.is_expired():
            return Response({"error": "OTP has expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)

        # Check code
        if otp_record.otp_code != code:
            otp_record.attempts += 1
            if otp_record.attempts >= 5:
                otp_record.blocked_until = timezone.now() + timezone.timedelta(minutes=30)
                otp_record.save()
                return Response({"error": "5 failed attempts. Account blocked for 30 minutes."}, status=status.HTTP_403_FORBIDDEN)
            otp_record.save()
            return Response({"error": f"Invalid OTP code. {5 - otp_record.attempts} attempts remaining."}, status=status.HTTP_400_BAD_REQUEST)

        # OTP verified! Consume it so it works only once
        otp_record.delete()

        # Find or create user
        role = request.data.get('role', 'worker')
        user, created = User.objects.get_or_create(phone=phone, defaults={'role': role})

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "tokens": {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            "user": UserSerializer(user).data,
            "is_new_user": created
        }, status=status.HTTP_200_OK)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
