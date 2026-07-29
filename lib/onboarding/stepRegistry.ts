import { StepDefinition } from '@/components/onboarding/ProgressSidebar';
import { OnboardingFormValues } from '@/lib/onboarding/schema';
import { UseFormReturn } from 'react-hook-form';

export type StepBuilder = (methods: UseFormReturn<OnboardingFormValues>) => StepDefinition[];

export const buildMarkeeChatSteps: StepBuilder = (methods) => {
  const watchChat = methods.watch('productData.markeeChat.channels.chat');
  const watchSales = methods.watch('productData.markeeChat.channels.sales');
  const watchAds = methods.watch('productData.markeeChat.channels.ads');

  const steps: StepDefinition[] = [
    { id: 'channels', label: 'Chọn kênh', subLabel: 'Kênh cần tích hợp' },
  ];

  if (watchChat?.length) {
    steps.push({ id: 'chatDetails', label: 'Kênh Chat', subLabel: 'Chi tiết Zalo, Facebook...' });
  }
  if (watchSales?.length) {
    steps.push({ id: 'salesDetails', label: 'Kênh Bán hàng', subLabel: 'Chi tiết Shopee, Website...' });
  }
  if (watchAds?.length) {
    steps.push({ id: 'adsDetails', label: 'Kênh Quảng cáo', subLabel: 'Chi tiết Meta, Google...' });
  }
  return steps;
};

export const buildMarkeeSeedingSteps: StepBuilder = (methods) => {
  // TODO: Add Markee Seeding steps when the question set is available
  return [];
};

export const buildMarkeeAppSteps: StepBuilder = (methods) => {
  // TODO: Add Markee App steps when the question set is available
  return [];
};

export const productStepRegistry: Record<string, StepBuilder> = {
  markeeChat: buildMarkeeChatSteps,
  markeeSeeding: buildMarkeeSeedingSteps,
  markeeApp: buildMarkeeAppSteps,
};
