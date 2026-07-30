import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../FormField';
import { OnboardingFormValues } from '@/lib/onboarding/schema';

export const CompanyStep: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<OnboardingFormValues>();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-6">ThÃ´ng tin doanh nghiá»‡p</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Company Info */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">ThÃ´ng tin chung</h3>
          <hr className="border-border-color mb-4" />
        </div>

        <FormField
          label="TÃªn doanh nghiá»‡p"
          placeholder="VÃ­ dá»¥: CÃ´ng ty CP CÃ´ng nghá»‡ Markee"
          required
          {...register('company.name')}
          error={errors.company?.name?.message}
        />
        <FormField
          label={
            <div className="flex items-center gap-2">
              <span>TÃªn thÆ°Æ¡ng hiá»‡u</span>
              <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 uppercase tracking-wider px-1.5 py-0.5 rounded">(KhÃ´ng báº¯t buá»™c)</span>
            </div>
          }
          placeholder="VÃ­ dá»¥: Markee"
          {...register('company.brand')}
          error={errors.company?.brand?.message}
        />
        
        {/* Contact Info */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">NgÆ°á»i liÃªn há»‡</h3>
          <hr className="border-border-color mb-4" />
        </div>

        <FormField
          label="Há» vÃ  tÃªn ngÆ°á»i liÃªn há»‡"
          placeholder="Nguyá»…n VÄƒn A"
          required
          {...register('company.contactName')}
          error={errors.company?.contactName?.message}
        />
        <FormField
          label="Sá»‘ Ä‘iá»‡n thoáº¡i"
          placeholder="0901234567"
          required
          {...register('company.phone')}
          error={errors.company?.phone?.message}
        />
        <FormField
          label="Email liÃªn há»‡"
          type="email"
          placeholder="contact@markee.com"
          required
          {...register('company.email')}
          error={errors.company?.email?.message}
        />
        <FormField
          label={
            <div className="flex items-center gap-2">
              <span>Website</span>
              <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 uppercase tracking-wider px-1.5 py-0.5 rounded">(KhÃ´ng báº¯t buá»™c)</span>
            </div>
          }
          placeholder="https://markee.com"
          {...register('company.website')}
          error={errors.company?.website?.message}
        />
      </div>
    </div>
  );
};
