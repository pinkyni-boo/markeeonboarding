import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../FormField';
import { OnboardingFormValues } from '@/lib/onboarding/schema';

export const CompanyStep: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<OnboardingFormValues>();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Thông tin doanh nghiệp</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Company Info */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Thông tin chung</h3>
          <hr className="border-border-color mb-4" />
        </div>

        <div className="md:col-span-2">
          <FormField
            label="Tên doanh nghiệp / Thương hiệu"
            placeholder="Ví dụ: Công ty CP Công nghệ Markee"
            required
            {...register('company.name')}
            error={errors.company?.name?.message}
          />
        </div>
        
        {/* Contact Info */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Người liên hệ</h3>
          <hr className="border-border-color mb-4" />
        </div>

        <div className="md:col-span-2">
          <FormField
            label="Họ và tên người liên hệ"
            placeholder="Nguyễn Văn A"
            required
            {...register('company.contactName')}
            error={errors.company?.contactName?.message}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5 md:mb-2">Kênh liên hệ chính <span className="text-primary">*</span></label>
          <select 
            className="block w-full rounded-[10px] md:rounded-xl border bg-white px-3 md:px-4 py-2 md:py-3 text-foreground shadow-sm transition-colors border-slate-300 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 text-base sm:text-sm mb-4 md:mb-5"
            {...register('company.contactChannel')}
          >
            <option value="">Chọn kênh...</option>
            <option value="Zalo">Zalo</option>
            <option value="Telegram">Telegram</option>
            <option value="Phone">Điện thoại</option>
            <option value="Email">Email</option>
            <option value="Khác">Khác</option>
          </select>
          {errors.company?.contactChannel?.message && (
            <p className="mt-[-0.5rem] mb-4 text-sm text-red-500">{errors.company.contactChannel.message}</p>
          )}
        </div>

        <FormField
          label="Thông tin liên hệ (SĐT / Link)"
          placeholder="Ví dụ: 0901234567 hoặc https://t.me/nick"
          required
          {...register('company.contactId')}
          error={errors.company?.contactId?.message}
        />

        <FormField
          label="Số điện thoại dự phòng"
          placeholder="0912..."
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
        <div className="md:col-span-2">
          <FormField
            label={
              <div className="flex items-center gap-2">
                <span>Website</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 uppercase tracking-wider px-1.5 py-0.5 rounded">(Không bắt buộc)</span>
              </div>
            }
            placeholder="https://markee.com"
            {...register('company.website')}
            error={errors.company?.website?.message}
          />
        </div>
      </div>
    </div>
  );
};
