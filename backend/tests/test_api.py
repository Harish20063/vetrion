import pytest
from django.core.management import call_command
from rest_framework.test import APIClient
from apps.accounts.models import User
from apps.jobs.models import Job, ContactUnlock

@pytest.fixture(autouse=True)
def seed_database(db):
    call_command('seed_data')

@pytest.mark.django_db
def test_request_and_verify_otp():
    client = APIClient()
    phone = "9842100001"

    # 1. Request OTP
    req_res = client.post('/api/auth/request-otp/', {'phone': phone, 'role': 'worker'})
    assert req_res.status_code == 200
    assert 'demo_otp' in req_res.data
    otp_code = req_res.data['demo_otp']

    # 2. Verify OTP
    verify_res = client.post('/api/auth/verify-otp/', {'phone': phone, 'otp_code': otp_code})
    assert verify_res.status_code == 200
    assert 'tokens' in verify_res.data
    assert 'access' in verify_res.data['tokens']
    assert User.objects.filter(phone=phone).exists()

@pytest.mark.django_db
def test_jobs_feed_and_filtering():
    client = APIClient()
    res = client.get('/api/jobs/')
    assert res.status_code == 200
    assert len(res.data) >= 19

    # Filter by city
    res_madurai = client.get('/api/jobs/?city=Madurai')
    assert res_madurai.status_code == 200
    assert len(res_madurai.data) > 0
    for job in res_madurai.data:
        assert job['city'] == 'Madurai'

@pytest.mark.django_db
def test_worker_apply_unlocks_contact():
    client = APIClient()
    worker_user = User.objects.create_user(phone="9842199999", role='worker')
    client.force_authenticate(user=worker_user)

    job = Job.objects.first()
    apply_res = client.post(f'/api/jobs/{job.id}/apply/')
    assert apply_res.status_code == 200
    assert 'employer_phone' in apply_res.data

    # Verify contact unlock record
    assert ContactUnlock.objects.filter(viewer=worker_user, target=job.employer).exists()
