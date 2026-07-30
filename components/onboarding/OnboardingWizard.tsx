'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingFormSchema, OnboardingFormValues } from '@/lib/onboarding/schema';
import { saveDraft, getDraft, clearDraft } from '@/lib/onboarding/storage';
import { OnboardingLayout } from './OnboardingLayout';
import { StepNavigation } from './StepNavigation';
import { ProgressSidebar, StepDefinition } from './ProgressSidebar';
import { productStepRegistry } from '@/lib/onboarding/stepRegistry';

import { WelcomeStep } from './steps/WelcomeStep';
import { CompanyStep } from './steps/CompanyStep';
import { ProductsStep } from './steps/ProductsStep';
import { StaffingStep } from './steps/StaffingStep';
import { ChannelsStep } from './steps/ChannelsStep';
import { ChatDetailsStep } from './steps/ChatDetailsStep';
import { SalesDetailsStep } from './steps/SalesDetailsStep';
import { AdsDetailsStep } from './steps/AdsDetailsStep';
import { TimelineStep } from './steps/TimelineStep';
import { ReviewStep } from './steps/ReviewStep';

export const OnboardingWizard: React.FC = () => {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const methods = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema as any),
    mode: 'onTouched',
    defaultValues: {
      selectedProducts: [],
      review: { confirmed: false }
    }
  });

  const selectedProducts = methods.watch('selectedProducts');
  const watchChat = methods.watch('productData.markeeChat.channels.chat');
  const watchSales = methods.watch('productData.markeeChat.channels.sales');
  const watchAds = methods.watch('productData.markeeChat.channels.ads');

  const activeSteps = useMemo(() => {
    let steps: StepDefinition[] = [
      { id: 'welcome', label: 'Welcome' },
      { id: 'company', label: 'Doanh nghiệp', subLabel: 'Thông tin cơ bản' },
      { id: 'products', label: 'Sản phẩm', subLabel: 'Dịch vụ đăng ký' },
    ];

    if (selectedProducts && selectedProducts.length > 0) {
      selectedProducts.forEach(product => {
        const builder = productStepRegistry[product];
        if (builder) {
          steps = [...steps, ...builder(methods)];
        }
      });
    }

    steps.push({ id: 'staffing', label: 'Nhân sự', subLabel: 'Người sử dụng hệ thống' });
    steps.push({ id: 'schedule', label: 'Thời gian', subLabel: 'Lịch triển khai' });
    steps.push({ id: 'review', label: 'Xác nhận', subLabel: 'Xem lại thông tin' });

    return steps;
  }, [selectedProducts, watchChat, watchSales, watchAds, methods]);

  // Clamp currentStepIndex if activeSteps shrink
  useEffect(() => {
    if (currentStepIndex >= activeSteps.length) {
      setCurrentStepIndex(Math.max(0, activeSteps.length - 1));
    }
  }, [activeSteps.length, currentStepIndex]);

  useEffect(() => {
    const draft = getDraft();
    if (draft && Object.keys(draft).length > 0) {
      if (confirm('Chúng tôi tìm thấy dữ liệu bạn đang nhập dở. Bạn có muốn tiếp tục không?')) {
        methods.reset(draft as OnboardingFormValues);
      } else {
        clearDraft();
      }
    }
    setIsInitialized(true);
  }, [methods]);

  // Exclude watch function from being a dependency problem by refactoring
  useEffect(() => {
    if (!isInitialized) return;
    const subscription = methods.watch((value) => {
      saveDraft(value as Partial<OnboardingFormValues>);
    });
    return () => subscription.unsubscribe();
  }, [methods, isInitialized]);

  const getFieldsForStep = (stepId: string): string[] => {
    switch (stepId) {
      case 'company': return ['company.name', 'company.contactName', 'company.email', 'company.phone'];
      case 'products': return ['selectedProducts'];
      case 'staffing': return ['staff'];
      case 'channels': return ['productData.markeeChat.channels.chat', 'productData.markeeChat.channels.sales', 'productData.markeeChat.channels.ads'];
      case 'chatDetails': return ['productData.markeeChat.channelDetails.chat'];
      case 'salesDetails': return ['productData.markeeChat.channelDetails.sales'];
      case 'adsDetails': return ['productData.markeeChat.channelDetails.ads'];
      case 'schedule': return ['deploymentSchedule.specificTime'];
      case 'review': return ['review.confirmed'];
      default: return [];
    }
  };

  const handleNext = async () => {
    const currentStepId = activeSteps[currentStepIndex].id;
    const fieldsToValidate = getFieldsForStep(currentStepId);
    
    if (fieldsToValidate.length > 0) {
      const isValid = await methods.trigger(fieldsToValidate as any);
      if (!isValid) {
        setTimeout(() => {
          const firstError = document.querySelector('.border-red-500, .text-red-500');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        return;
      }
    }
    
    const scrollToTop = () => {
      const formEl = document.getElementById('form-content-top');
      if (formEl) {
        const top = formEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    scrollToTop();
    setCurrentStepIndex((prev) => Math.min(prev + 1, activeSteps.length - 1));
  };

  const handleBack = () => {
    const scrollToTop = () => {
      const formEl = document.getElementById('form-content-top');
      if (formEl) {
        const top = formEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    scrollToTop();
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const setStepById = (stepId: string) => {
    const idx = activeSteps.findIndex(s => s.id === stepId);
    if (idx !== -1) {
      setCurrentStepIndex(idx);
    }
  };

  const cleanDataBeforeSubmit = (data: OnboardingFormValues) => {
    const cleaned = structuredClone(data);
    
    // Clean up Markee Chat details
    if (cleaned.productData?.markeeChat) {
      const chatData = cleaned.productData.markeeChat;
      
      // Clean up Chat details
      if (!chatData.channels?.chat?.length) {
        if (chatData.channelDetails) delete chatData.channelDetails.chat;
      } else if (chatData.channelDetails?.chat) {
        const allowedKeys = chatData.channels.chat;
        Object.keys(chatData.channelDetails.chat).forEach(key => {
          if (!allowedKeys.includes(key)) {
            delete (chatData.channelDetails!.chat as any)[key];
          }
        });
      }

      // Clean up Sales details
      if (!chatData.channels?.sales?.length) {
        if (chatData.channelDetails) delete chatData.channelDetails.sales;
      } else if (chatData.channelDetails?.sales) {
        const allowedKeys = chatData.channels.sales;
        Object.keys(chatData.channelDetails.sales).forEach(key => {
          if (!allowedKeys.includes(key)) {
            delete (chatData.channelDetails!.sales as any)[key];
          }
        });
      }

      // Clean up Ads details
      if (!chatData.channels?.ads?.length) {
        if (chatData.channelDetails) delete chatData.channelDetails.ads;
      } else if (chatData.channelDetails?.ads) {
        const allowedKeys = chatData.channels.ads;
        Object.keys(chatData.channelDetails.ads).forEach(key => {
          if (!allowedKeys.includes(key)) {
            delete (chatData.channelDetails!.ads as any)[key];
          }
        });
      }
    }

    return cleaned;
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    if (currentStepIndex !== activeSteps.length - 1) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const cleanedData = cleanDataBeforeSubmit(data);

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        clearDraft();
        router.push(`/onboarding/success?id=${result.submissionId}`);
      } else {
        setSubmitError(result.error || 'Đã xảy ra lỗi khi gửi form. Vui lòng thử lại.');
      }
    } catch (error) {
      setSubmitError('Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isInitialized) return null;

  const currentStepId = activeSteps[currentStepIndex]?.id;

  return (
    <OnboardingLayout currentStepIndex={currentStepIndex} steps={activeSteps}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full flex flex-col">
          <div className="flex-1">
            {currentStepId === 'welcome' && <WelcomeStep />}
            {currentStepId === 'company' && <CompanyStep />}
            {currentStepId === 'products' && <ProductsStep />}
            {currentStepId === 'staffing' && <StaffingStep />}
            {currentStepId === 'channels' && <ChannelsStep />}
            {currentStepId === 'chatDetails' && <ChatDetailsStep />}
            {currentStepId === 'salesDetails' && <SalesDetailsStep />}
            {currentStepId === 'adsDetails' && <AdsDetailsStep />}
            {currentStepId === 'schedule' && <TimelineStep />}
            {currentStepId === 'review' && <ReviewStep setStep={setStepById} />}
          </div>
          
          {submitError && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {submitError}
            </div>
          )}

          <StepNavigation
            currentStep={currentStepIndex}
            totalSteps={activeSteps.length}
            onNext={handleNext}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        </form>
      </FormProvider>
    </OnboardingLayout>
  );
};
