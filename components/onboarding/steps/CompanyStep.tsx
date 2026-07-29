import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../FormField';
import { OnboardingFormValues } from '@/lib/onboarding/schema';

export const CompanyStep: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<OnboardingFormValues>();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-6">Thông tin doanh nghiệp</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Company Info */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Thông tin chung</h3>
          <hr className="border-border-color mb-4" />
        </div>

        <FormField
          label="Tên doanh nghiệp"
          placeholder="Ví dụ: Công ty CP Công nghệ Markee"
          required
          {...register('company.name')}
          error={errors.company?.name?.message}
        />
        <FormField
          label="Tên thương hiệu"
          placeholder="Ví dụ: Markee"
          {...register('company.brand')}
          error={errors.company?.brand?.message}
        />
        
        {/* Contact Info */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Người liên hệ</h3>
          <hr className="border-border-color mb-4" />
        </div>

        <FormField
          label="Họ và tên người liên hệ"
          placeholder="Nguyễn Văn A"
          required
          {...register('company.contactName')}
          error={errors.company?.contactName?.message}
        />
        <FormField
          label="Số điện thoại"
          placeholder="0901234567"
          required
          {...register('company.phone')}
          error={errors.company?.phone?.message}
        />
        <FormField
          label="Email liên hệ"
          type="email"
          placeholder="contact@markee.com"
          required
          {...register('company.email')}
          error={errors.company?.email?.message}
        />
        <FormField
          label="Website"
          placeholder="https://markee.com"
          {...register('company.website')}
          error={errors.company?.website?.message}
        />
      </div>
    </div>
  );
};
