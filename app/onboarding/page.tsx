import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markee Onboarding',
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
