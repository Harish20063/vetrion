from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "name": "Vetrion API (வெற்றி)",
        "version": "1.0.0",
        "region": "Tamil Nadu, India",
        "endpoints": {
            "auth": "/api/auth/",
            "jobs": "/api/jobs/",
            "workers": "/api/workers/",
            "profiles": "/api/profiles/",
            "applications": "/api/applications/",
            "payments": "/api/payments/",
            "admin": "/admin/"
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/', include('apps.jobs.urls')),
    path('api/profiles/', include('apps.profiles.urls')),
    path('api/payments/', include('apps.payments.urls')),
]
