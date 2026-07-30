import { ClientWizardWrapper } from '@/components/onboarding/ClientWizardWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markee Onboarding',
};

export default function OnboardingPage() {
  return <ClientWizardWrapper />;
}
