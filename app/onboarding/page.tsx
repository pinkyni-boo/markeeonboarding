import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const OnboardingWizard = dynamic(
  () => import('@/components/onboarding/OnboardingWizard').then(mod => mod.OnboardingWizard),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Markee Onboarding',
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
