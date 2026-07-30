'use client';

import dynamic from 'next/dynamic';

const Wizard = dynamic(
  () => import('./OnboardingWizard').then(mod => mod.OnboardingWizard),
  { ssr: false }
);

export const ClientWizardWrapper = () => {
  return <Wizard />;
};
