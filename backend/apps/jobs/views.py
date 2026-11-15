from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Job, Application, SavedJob, ContactUnlock, Report
from .serializers import JobSerializer, ApplicationSerializer, SavedJobSerializer, ReportSerializer
from apps.accounts.models import User

class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Job.objects.select_related('employer', 'employer__employer_profile').filter(status='open')

        city = self.request.query_params.get('city')
        if city and city != 'all':
            qs = qs.filter(city__iexact=city)

        work_type = self.request.query_params.get('work_type')
        if work_type and work_type != 'all':
            qs = qs.filter(work_type=work_type)

        pay_unit = self.request.query_params.get('pay_unit')
        if pay_unit and pay_unit != 'all':
            qs = qs.filter(pay_unit=pay_unit)

        entity = self.request.query_params.get('entity')
        if entity and entity != 'all':
            qs = qs.filter(employer__employer_profile__kind=entity)

        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(area__icontains=search) |
                Q(city__icontains=search) |
                Q(work_type__icontains=search)
            )

        return qs.order_by('-created_at')

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise permissions.exceptions.NotAuthenticated("Must be logged in to post a job.")
        serializer.save(employer=self.request.user)


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


class JobApplyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        job = get_object_or_404(Job, pk=pk)
        worker = request.user

        # Create or fetch application
        app, created = Application.objects.get_or_create(
            job=job,
            worker=worker,
            defaults={'status': 'new'}
        )

        # Unlocks contact between worker and employer
        ContactUnlock.objects.get_or_create(viewer=worker, target=job.employer)

        return Response({
            "message": "Application submitted successfully!",
            "employer_phone": job.employer.phone,
            "employer_name": getattr(getattr(job.employer, 'employer_profile', None), 'name_or_business', 'Employer'),
            "is_new_application": created
        }, status=status.HTTP_200_OK)


class JobSaveToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        job = get_object_or_404(Job, pk=pk)
        worker = request.user

        saved = SavedJob.objects.filter(worker=worker, job=job).first()
        if saved:
            saved.delete()
            return Response({"saved": False, "message": "Removed from saved bookmarks."}, status=status.HTTP_200_OK)
        else:
            SavedJob.objects.create(worker=worker, job=job)
            return Response({"saved": True, "message": "Job saved to bookmarks!"}, status=status.HTTP_200_OK)


class SavedJobListView(generics.ListAPIView):
    serializer_class = SavedJobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.select_related('job', 'job__employer').filter(worker=self.request.user).order_by('-created_at')


class EmployerMyPostsView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(employer=self.request.user).order_by('-created_at')


class JobStatusToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        job = get_object_or_404(Job, pk=pk, employer=request.user)
        job.status = 'closed' if job.status == 'open' else 'open'
        job.save()
        return Response({
            "id": job.id,
            "status": job.status,
            "message": f"Job status changed to {job.status}."
        }, status=status.HTTP_200_OK)


class JobApplicantsListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        job_id = self.kwargs.get('pk')
        job = get_object_or_404(Job, pk=job_id, employer=self.request.user)
        return job.applications.select_related('worker').all().order_by('-created_at')


class UnlockWorkerContactView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, worker_id):
        worker = get_object_or_404(User, pk=worker_id)
        viewer = request.user

        # Record unlock in contact_unlocks table
        ContactUnlock.objects.get_or_create(viewer=viewer, target=worker)

        return Response({
            "message": "Contact unlocked successfully",
            "worker_phone": worker.phone
        }, status=status.HTTP_200_OK)


class ReportCreateView(generics.CreateAPIView):
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)
