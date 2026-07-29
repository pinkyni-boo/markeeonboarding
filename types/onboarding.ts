import { OnboardingFormValues } from '@/lib/onboarding/schema';

export type OnboardingData = OnboardingFormValues;

export interface ProductStatus {
  status: 'new' | 'reviewing' | 'in_progress' | 'waiting_customer' | 'completed' | 'cancelled';
  assignedTo?: string;
  note?: string;
}

export interface AdminMeta {
  priority?: 'high' | 'normal' | 'low';
  assignee?: string;
  startDate?: string;
  completedDate?: string;
  checklist?: Record<string, boolean>;
  notes?: {
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }[];
  activities?: {
    id: string;
    type: 'status_change' | 'note_added' | 'assigned' | 'created';
    author: string;
    content: string;
    createdAt: string;
  }[];
}

export interface OnboardingSubmission {
  id: string;
  data: OnboardingData;
  status: 'new' | 'reviewing' | 'in_progress' | 'waiting_customer' | 'completed' | 'cancelled';
  productStatuses?: {
    markeeChat?: ProductStatus;
    markeeSeeding?: ProductStatus;
    markeeApp?: ProductStatus;
  };
  admin_meta?: AdminMeta;
  createdAt: string;
  updatedAt: string;
}
