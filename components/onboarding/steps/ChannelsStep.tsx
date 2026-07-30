import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { SelectableCard } from '../SelectableCard';
import { chatChannelOptions, salesChannelOptions, adsChannelOptions } from '@/lib/onboarding/options';
import { OnboardingFormValues } from '@/lib/onboarding/schema';

const CollapsibleSection: React.FC<{
  title: string;
  name: "productData.markeeChat.channels.chat" | "productData.markeeChat.channels.sales" | "productData.markeeChat.channels.ads";
  options: { id: string; label: string }[];
  defaultOpen?: boolean;
}> = ({ title, name, options, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const { control } = useFormContext<OnboardingFormValues>();

  return (
    <div className="mb-6 border border-border-color rounded-2xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
      >
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <svg 
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-border-color">
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
      )}
    </div>
  );
};

export const ChannelsStep: React.FC = () => {
  const { formState: { errors } } = useFormContext<OnboardingFormValues>();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-2">Chọn các kênh cần tích hợp <span className="text-sm font-normal text-slate-500">(Không bắt buộc)</span></h2>
      <p className="text-text-muted mb-6">Bạn có thể chọn nhiều nền tảng thuộc các nhóm khác nhau, hoặc để trống và cung cấp sau.</p>
      
      {errors.productData?.markeeChat?.channels?.chat && (
        <div className="mb-6 p-4 bg-red-50 text-red-500 border border-red-200 rounded-xl text-sm">
          {errors.productData.markeeChat.channels.chat.message as string}
        </div>
      )}

      <CollapsibleSection title="Nhóm 1 – Kênh Chat" name="productData.markeeChat.channels.chat" options={chatChannelOptions} />
      <CollapsibleSection title="Nhóm 2 – Kênh Bán Hàng" name="productData.markeeChat.channels.sales" options={salesChannelOptions} />
      <CollapsibleSection title="Nhóm 3 – Kênh Quảng Cáo" name="productData.markeeChat.channels.ads" options={adsChannelOptions} />
    </div>
  );
};
