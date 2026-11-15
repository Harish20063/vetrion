export type Role = 'worker' | 'admin';

export type Language = 'en' | 'ta';

export type WorkerTab = 'find-work' | 'saved' | 'worker-profile';
export type AdminTab = 'find-workers' | 'post-job' | 'your-posts' | 'admin-profile';

export type HiringEntity = 'household' | 'shop' | 'company' | 'contractor' | 'farm';

export type PayUnit = 'day' | 'month';

export type City = 'Chennai' | 'Coimbatore' | 'Madurai' | 'Tiruchirappalli' | 'Salem' | 'Tirunelveli';

export type Availability = 'available' | 'within-week' | 'unavailable';

export interface Job {
  id: string;
  title: string;
  entityType: HiringEntity;
  workType: string;
  locality: string;
  city: City;
  payAmount: number;
  payUnit: PayUnit;
  phone: string;
  postedDaysAgo: string;
  desc: string;
  status: 'active' | 'closed';
  postedBy?: string;
  isUserPost?: boolean;
}

export interface Worker {
  id: string;
  name: string;
  phone: string;
  city: City;
  locality: string;
  headline: string;
  skills: string[];
  expectedPay: number;
  payUnit: PayUnit;
  experience: number;
  availability: Availability;
  about: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  workerName: string;
  workerPhone: string;
  appliedAt: string;
}

export interface WorkerProfile extends Omit<Worker, 'id'> {
  id?: string;
}

export interface AdminProfile {
  name: string;
  entityType: HiringEntity;
  phone: string;
  city: City;
  locality: string;
  about: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'error';
}
