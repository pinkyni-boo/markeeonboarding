import { OnboardingFormValues } from './schema';

const STORAGE_KEY = 'markee_onboarding_draft';

export const saveDraft = (data: Partial<OnboardingFormValues>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const getDraft = (): Partial<OnboardingFormValues> | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Failed to parse onboarding draft:', error);
        return null;
      }
    }
  }
  return null;
};

export const clearDraft = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};
