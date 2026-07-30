import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { SelectableCard } from '../SelectableCard';
import { chatChannelOptions, salesChannelOptions, adsChannelOptions } from '@/lib/onboarding/options';
import { OnboardingFormValues } from '@/lib/onboarding/schema';

export const ChannelsStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<OnboardingFormValues>();

  const renderSection = (title: string, name: "productData.markeeChat.channels.chat" | "productData.markeeChat.channels.sales" | "productData.markeeChat.channels.ads", options: { id: string; label: string }[]) => (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-foreground mb-4">{title}</h3>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {options.map((opt) => (
              <SelectableCard
                key={opt.id}
                label={opt.label}
                selected={!!field.value?.includes(opt.id)}
                onClick={() => {
                  const current = field.value || [];
                  const newValue = current.includes(opt.id)
                    ? current.filter((id: string) => id !== opt.id)
                    : [...current, opt.id];
                  field.onChange(newValue);
                }}
              />
            ))}
          </div>
        )}
      />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-2">Chọn các kênh cần tích hợp <span className="text-sm font-normal text-slate-500">(Không bắt buộc)</span></h2>
      <p className="text-text-muted mb-6">Bạn có thể chọn nhiều nền tảng thuộc các nhóm khác nhau, hoặc để trống và cung cấp sau.</p>
      
      {errors.productData?.markeeChat?.channels?.chat && (
        <div className="mb-6 p-4 bg-red-50 text-red-500 border border-red-200 rounded-xl text-sm">
          {errors.productData.markeeChat.channels.chat.message as string}
        </div>
      )}

      {renderSection('Nhóm 1 – Kênh Chat', 'productData.markeeChat.channels.chat', chatChannelOptions)}
      {renderSection('Nhóm 2 – Kênh Bán Hàng', 'productData.markeeChat.channels.sales', salesChannelOptions)}
      {renderSection('Nhóm 3 – Kênh Quảng Cáo', 'productData.markeeChat.channels.ads', adsChannelOptions)}
    </div>
  );
};
