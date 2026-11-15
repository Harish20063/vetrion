from django.urls import path
from .views import WorkerProfileMeView, EmployerProfileMeView, PublicWorkerDirectoryView

urlpatterns = [
    path('worker/me/', WorkerProfileMeView.as_view(), name='worker-profile-me'),
    path('employer/me/', EmployerProfileMeView.as_view(), name='employer-profile-me'),
    path('workers/', PublicWorkerDirectoryView.as_view(), name='public-workers-directory'),
]
