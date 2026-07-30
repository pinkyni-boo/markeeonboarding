import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { SelectableCard } from '../SelectableCard';
import { chatChannelOptions, salesChannelOptions, adsChannelOptions } from '@/lib/onboarding/options';
import { OnboardingFormValues } from '@/lib/onboarding/schema';

const CollapsibleSection: React.FC<{
  title: string;
  name: "productData.markeeChat.channels.chat" | "productData.markeeChat.channels.sales" | "productData.markeeChat.channels.ads";
  options: { id: string; label: string }[];
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, name, options, isOpen, onToggle }) => {
  const { control } = useFormContext<OnboardingFormValues>();

  return (
    <div className="mb-4 md:mb-4 md:mb-6 border border-border-color rounded-2xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3.5 md:p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
      >
        <h3 className="text-sm md:text-base font-semibold text-foreground">{title}</h3>
        <svg 
          className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-3 md:p-4 border-t border-border-color">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
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
  const [openSection, setOpenSection] = React.useState<string>('chat');

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">Chá»n cÃ¡c kÃªnh cáº§n tÃ­ch há»£p <span className="text-sm font-normal text-slate-500">(KhÃ´ng báº¯t buá»™c)</span></h2>
      <p className="text-text-muted mb-4 md:mb-6">Báº¡n cÃ³ thá»ƒ chá»n nhiá»u ná»n táº£ng thuá»™c cÃ¡c nhÃ³m khÃ¡c nhau, hoáº·c Ä‘á»ƒ trá»‘ng vÃ  cung cáº¥p sau.</p>
      
      {errors.productData?.markeeChat?.channels?.chat && (
        <div className="mb-4 md:mb-6 p-4 bg-red-50 text-red-500 border border-red-200 rounded-xl text-sm">
          {errors.productData.markeeChat.channels.chat.message as string}
        </div>
      )}

      <CollapsibleSection 
        title="KÃªnh Chat" 
        name="productData.markeeChat.channels.chat" 
        options={chatChannelOptions} 
        isOpen={openSection === 'chat'}
        onToggle={() => setOpenSection(openSection === 'chat' ? '' : 'chat')}
      />
      <CollapsibleSection 
        title="KÃªnh BÃ¡n HÃ ng" 
        name="productData.markeeChat.channels.sales" 
        options={salesChannelOptions} 
        isOpen={openSection === 'sales'}
        onToggle={() => setOpenSection(openSection === 'sales' ? '' : 'sales')}
      />
      <CollapsibleSection 
        title="KÃªnh Quáº£ng CÃ¡o" 
        name="productData.markeeChat.channels.ads" 
        options={adsChannelOptions} 
        isOpen={openSection === 'ads'}
        onToggle={() => setOpenSection(openSection === 'ads' ? '' : 'ads')}
      />
    </div>
  );
};
