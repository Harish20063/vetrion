import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Job, 
  Worker, 
  JobApplication, 
  WorkerProfile, 
  AdminProfile, 
  Role, 
  WorkerTab, 
  AdminTab,
  ToastMessage 
} from '../types';
import { INITIAL_JOBS } from '../data/mockJobs';
import { INITIAL_WORKERS } from '../data/mockWorkers';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  workerTab: WorkerTab;
  setWorkerTab: (tab: WorkerTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  
  jobs: Job[];
  workers: Worker[];
  savedJobIds: string[];
  appliedJobIds: string[];
  applications: JobApplication[];
  
  workerProfile: WorkerProfile | null;
  adminProfile: AdminProfile | null;
  
  toggleSaveJob: (jobId: string) => void;
  applyToJob: (jobId: string, workerName: string, workerPhone: string) => void;
  saveWorkerProfile: (profile: WorkerProfile) => void;
  saveAdminProfile: (profile: AdminProfile) => void;
  createJobPost: (jobData: Omit<Job, 'id' | 'postedDaysAgo' | 'status' | 'isUserPost'>) => void;
  toggleJobStatus: (jobId: string) => void;
  deleteJobPost: (jobId: string) => void;
  resetDemoData: () => void;
  
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('worker');
  const [workerTab, setWorkerTab] = useState<WorkerTab>('find-work');
  const [adminTab, setAdminTab] = useState<AdminTab>('find-workers');

  // Stored state
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('vetrion_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [workers, setWorkers] = useState<Worker[]>(() => {
    const saved = localStorage.getItem('vetrion_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('vetrion_saved_jobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('vetrion_applied_jobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('vetrion_applications');
    return saved ? JSON.parse(saved) : [];
  });

  const [workerProfile, setWorkerProfileState] = useState<WorkerProfile | null>(() => {
    const saved = localStorage.getItem('vetrion_worker_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [adminProfile, setAdminProfileState] = useState<AdminProfile | null>(() => {
    const saved = localStorage.getItem('vetrion_admin_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('vetrion_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('vetrion_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('vetrion_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('vetrion_applied_jobs', JSON.stringify(appliedJobIds));
  }, [appliedJobIds]);

  useEffect(() => {
    localStorage.setItem('vetrion_applications', JSON.stringify(applications));
  }, [applications]);

  // Toast Helpers
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions
  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        showToast('Job removed from saved bookmarks', 'info');
        return prev.filter((id) => id !== jobId);
      } else {
        showToast('Job saved to your bookmarks!', 'success');
        return [...prev, jobId];
      }
    });
  };

  const applyToJob = (jobId: string, workerName: string, workerPhone: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds((prev) => [...prev, jobId]);
    }

    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      jobId,
      workerName,
      workerPhone,
      appliedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast('Application submitted successfully!', 'success');
  };

  const saveWorkerProfile = (profile: WorkerProfile) => {
    setWorkerProfileState(profile);
    localStorage.setItem('vetrion_worker_profile', JSON.stringify(profile));

    // Upsert into workers directory so employers can find them
    const workerId = profile.id || 'worker-user-' + Date.now();
    const updatedWorker: Worker = {
      ...profile,
      id: workerId
    };

    setWorkers((prev) => {
      const idx = prev.findIndex((w) => w.id === workerId);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = updatedWorker;
        return next;
      } else {
        return [updatedWorker, ...prev];
      }
    });

    showToast('Profile saved & published to worker directory!', 'success');
  };

  const saveAdminProfile = (profile: AdminProfile) => {
    setAdminProfileState(profile);
    localStorage.setItem('vetrion_admin_profile', JSON.stringify(profile));
    showToast('Admin profile saved successfully!', 'success');
  };

  const createJobPost = (jobData: Omit<Job, 'id' | 'postedDaysAgo' | 'status' | 'isUserPost'>) => {
    const newJob: Job = {
      ...jobData,
      id: 'job-user-' + Date.now(),
      postedDaysAgo: 'Just now',
      status: 'active',
      isUserPost: true
    };

    setJobs((prev) => [newJob, ...prev]);
    showToast('Job opening published successfully!', 'success');
    setAdminTab('your-posts');
  };

  const toggleJobStatus = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: j.status === 'active' ? 'closed' : 'active' } : j))
    );
    showToast('Job status updated!', 'info');
  };

  const deleteJobPost = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    showToast('Job post deleted successfully', 'info');
  };

  const resetDemoData = () => {
    setJobs(INITIAL_JOBS);
    setWorkers(INITIAL_WORKERS);
    setSavedJobIds([]);
    setAppliedJobIds([]);
    setApplications([]);
    localStorage.setItem('vetrion_jobs', JSON.stringify(INITIAL_JOBS));
    localStorage.setItem('vetrion_workers', JSON.stringify(INITIAL_WORKERS));
    localStorage.setItem('vetrion_saved_jobs', JSON.stringify([]));
    localStorage.setItem('vetrion_applied_jobs', JSON.stringify([]));
    localStorage.setItem('vetrion_applications', JSON.stringify([]));
    showToast('All sample data has been reset to defaults!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        workerTab,
        setWorkerTab,
        adminTab,
        setAdminTab,
        jobs,
        workers,
        savedJobIds,
        appliedJobIds,
        applications,
        workerProfile,
        adminProfile,
        toggleSaveJob,
        applyToJob,
        saveWorkerProfile,
        saveAdminProfile,
        createJobPost,
        toggleJobStatus,
        deleteJobPost,
        resetDemoData,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
