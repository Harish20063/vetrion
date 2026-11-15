from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import WorkerProfile, EmployerProfile
from .serializers import WorkerProfileSerializer, EmployerProfileSerializer
from apps.jobs.models import ContactUnlock

class WorkerProfileMeView(generics.RetrieveUpdateAPIView):
    serializer_class = WorkerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = WorkerProfile.objects.get_or_create(
            user=self.request.user,
            defaults={
                'name': '',
                'city': 'Chennai',
                'area': '',
                'headline': '',
                'work_types': [],
                'expected_pay': 0.0,
                'experience_years': 1,
            }
        )
        return profile


class EmployerProfileMeView(generics.RetrieveUpdateAPIView):
    serializer_class = EmployerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = EmployerProfile.objects.get_or_create(
            user=self.request.user,
            defaults={
                'name_or_business': '',
                'kind': 'household',
                'city': 'Chennai',
                'area': '',
            }
        )
        return profile


class PublicWorkerDirectoryView(generics.ListAPIView):
    serializer_class = WorkerProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = WorkerProfile.objects.select_related('user').filter(user__status='active')
        
        city = self.request.query_params.get('city')
        if city and city != 'all':
            qs = qs.filter(city__iexact=city)

        availability = self.request.query_params.get('availability')
        if availability and availability != 'all':
            qs = qs.filter(availability=availability)

        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                name__icontains=search
            ) | qs.filter(
                headline__icontains=search
            ) | qs.filter(
                area__icontains=search
            )

        work_type = self.request.query_params.get('work_type')
        if work_type and work_type != 'all':
            # SQLite / JSON contains check
            qs = [p for p in qs if any(work_type.lower() in str(w).lower() for w in p.work_types)]
            return qs

        return qs.order_by('-updated_at')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # Protect privacy: hide phone numbers unless current viewer has unlocked them
        viewer = request.user if request.user.is_authenticated else None
        unlocked_target_ids = set()
        if viewer:
            unlocked_target_ids = set(ContactUnlock.objects.filter(viewer=viewer).values_list('target_id', flat=True))

        for item in data:
            profile_obj = next((p for p in queryset if p.id == item['id']), None)
            if profile_obj and (viewer and profile_obj.user_id == viewer.id or profile_obj.user_id in unlocked_target_ids):
                item['phone_masked'] = False
            else:
                # Mask phone for privacy until unlocked
                raw_phone = item['phone']
                item['phone'] = raw_phone[:3] + " " + "X" * 4 + " " + raw_phone[-2:] if len(raw_phone) >= 7 else "XXXXX"
                item['phone_masked'] = True

        return Response(data)
