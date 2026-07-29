export interface Member {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'sales' | 'implementation' | 'developer' | 'support' | 'leader';
  department: 'sales' | 'dev' | 'implementation' | 'cskh' | 'marketing' | 'other';
  jobTitle?: string;
  status: 'active' | 'locked';
  canReceiveOnboarding: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}
