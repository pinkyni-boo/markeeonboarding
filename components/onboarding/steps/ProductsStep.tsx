import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { OnboardingFormValues } from '@/lib/onboarding/schema';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

const products = [
  { id: 'markeeChat', label: 'Markee Chat', description: 'Quản lý tin nhắn và CSKH đa kênh', status: 'active' },
  { id: 'markeeSeeding', label: 'Markee Seeding', description: 'Tự động hoá seeding và quản lý thảo luận', status: 'coming_soon' },
  { id: 'markeeApp', label: 'Markee App', description: 'Ứng dụng mobile cho doanh nghiệp', status: 'coming_soon' },
];

export const ProductsStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<OnboardingFormValues>();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-slate-900 mb-2">Sản phẩm cần triển khai</h2>
      <p className="text-slate-500 mb-6">Vui lòng chọn các giải pháp bạn muốn thiết lập trong đợt này. (Có thể chọn nhiều)</p>
      
      <Controller
        name="selectedProducts"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            {products.map((opt) => {
              const isSelected = field.value?.includes(opt.id) || false;
              
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    const current = field.value || [];
                    const newValue = current.includes(opt.id)
                      ? current.filter(id => id !== opt.id)
                      : [...current, opt.id];
                    field.onChange(newValue);
                  }}
                  className={clsx(
                    'relative p-5 rounded-xl border-2 transition-all cursor-pointer group',
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{opt.label}</h3>
                        {opt.status === 'coming_soon' && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wider">
                            Đang cập nhật bộ khảo sát
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{opt.description}</p>
                    </div>
                    
                    <div className={clsx(
                      'w-5 h-5 rounded-full flex items-center justify-center border transition-colors shrink-0 mt-0.5',
                      isSelected ? 'bg-primary border-primary' : 'border-slate-300'
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      />
      {errors.selectedProducts && (
        <p className="text-red-500 text-sm mt-2">{errors.selectedProducts.message}</p>
      )}
    </div>
  );
};
