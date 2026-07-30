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
      <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-1 md:mb-2">Sản phẩm cần triển khai</h2>
      <p className="text-sm md:text-base text-slate-500 mb-4 md:mb-6">Vui lòng chọn các giải pháp bạn muốn thiết lập trong đợt này. (Có thể chọn nhiều)</p>
      
      <Controller
        name="selectedProducts"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-2">
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
                    'relative p-4 md:p-5 rounded-xl border-2 transition-all cursor-pointer group',
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
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Video giới thiệu đang được cập nhật...');
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors bg-primary/5 hover:bg-primary/10 px-2.5 py-1.5 rounded-md"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Xem video giới thiệu
                      </button>
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
