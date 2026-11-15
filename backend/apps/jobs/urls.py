from django.urls import path
from .views import (
    JobListCreateView,
    JobDetailView,
    JobApplyView,
    JobSaveToggleView,
    SavedJobListView,
    EmployerMyPostsView,
    JobStatusToggleView,
    JobApplicantsListView,
    UnlockWorkerContactView,
    ReportCreateView,
)

urlpatterns = [
    path('jobs/', JobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', JobDetailView.as_view(), name='job-detail'),
    path('jobs/<int:pk>/apply/', JobApplyView.as_view(), name='job-apply'),
    path('jobs/<int:pk>/save/', JobSaveToggleView.as_view(), name='job-save-toggle'),
    path('jobs/<int:pk>/status/', JobStatusToggleView.as_view(), name='job-status-toggle'),
    path('jobs/<int:pk>/applicants/', JobApplicantsListView.as_view(), name='job-applicants'),
    path('jobs/saved/', SavedJobListView.as_view(), name='saved-jobs-list'),
    path('jobs/my-posts/', EmployerMyPostsView.as_view(), name='employer-my-posts'),
    path('workers/<int:worker_id>/unlock-contact/', UnlockWorkerContactView.as_view(), name='unlock-worker-contact'),
    path('reports/', ReportCreateView.as_view(), name='create-report'),
]
