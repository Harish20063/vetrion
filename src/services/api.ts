/**
 * Vetrion Backend API Client
 * Connects to Django REST Framework backend (http://localhost:8000/api)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = {
  // Authentication via Phone OTP
  async requestOtp(phone: string, role: 'worker' | 'admin' = 'worker') {
    const res = await fetch(`${API_BASE_URL}/auth/request-otp/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, role })
    });
    return res.json();
  },

  async verifyOtp(phone: string, otp_code: string, role?: string) {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp_code, role })
    });
    return res.json();
  },

  // Jobs
  async getJobs(params?: { city?: string; work_type?: string; pay_unit?: string; search?: string }) {
    const url = new URL(`${API_BASE_URL}/jobs/`);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val && val !== 'all') url.searchParams.append(key, val);
      });
    }
    const token = localStorage.getItem('vetrion_jwt_access');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url.toString(), { headers });
    return res.json();
  },

  async applyToJob(jobId: number | string) {
    const token = localStorage.getItem('vetrion_jwt_access');
    const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.json();
  },

  async toggleSaveJob(jobId: number | string) {
    const token = localStorage.getItem('vetrion_jwt_access');
    const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/save/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.json();
  },

  // Workers
  async getWorkers(params?: { city?: string; availability?: string; work_type?: string; search?: string }) {
    const url = new URL(`${API_BASE_URL}/profiles/workers/`);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val && val !== 'all') url.searchParams.append(key, val);
      });
    }
    const token = localStorage.getItem('vetrion_jwt_access');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url.toString(), { headers });
    return res.json();
  },

  async unlockWorkerContact(workerId: number | string) {
    const token = localStorage.getItem('vetrion_jwt_access');
    const res = await fetch(`${API_BASE_URL}/jobs/workers/${workerId}/unlock-contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.json();
  }
};
