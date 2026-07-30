import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormField } from '../FormField';
import { SelectableCard } from '../SelectableCard';
import { supportMethodOptions, timeSlotOptions } from '@/lib/onboarding/options';
import { OnboardingFormValues } from '@/lib/onboarding/schema';

export const TimelineStep: React.FC = () => {
  const { register, control, watch, formState: { errors } } = useFormContext<OnboardingFormValues>();
  const preferredTimeSlot = watch('deploymentSchedule.preferredTimeSlot');

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Thời gian triển khai <span className="text-sm font-normal text-slate-500">(Không bắt buộc)</span></h2>
        <p className="text-slate-500 text-sm mb-6">Bạn có thể cung cấp lịch hẹn cụ thể để Markee tiện sắp xếp, hoặc bấm Bỏ qua để thiết lập sau.</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">Hình thức hỗ trợ mong muốn (có thể chọn nhiều)</h3>
        <Controller
          name="deploymentSchedule.supportMethods"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {supportMethodOptions.map((opt) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
        <FormField
          label="Ngày mong muốn triển khai"
          type="date"
          {...register('deploymentSchedule.preferredDate')}
        />
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5 md:mb-2">Khung giờ phù hợp</label>
          <select 
            className="w-full px-3 md:px-4 py-2 md:py-3 rounded-[10px] md:rounded-xl border border-slate-300 bg-white text-base sm:text-sm"
            {...register('deploymentSchedule.preferredTimeSlot')}
          >
            <option value="">Chọn...</option>
            {timeSlotOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        {preferredTimeSlot === 'specific' && (
          <div className="md:col-span-2 animate-in fade-in zoom-in-95 duration-200">
            <FormField
              label="Giờ cụ thể (VD: 14:30)"
              type="time"
              required
              {...register('deploymentSchedule.specificTime')}
              error={errors.deploymentSchedule?.specificTime?.message}
            />
          </div>
        )}

        <div className="md:col-span-2">
          <FormField
            label="Người tham gia buổi triển khai (tên, chức vụ)"
            placeholder="Ví dụ: Nguyễn Văn A (Admin), Trần Thị B (Sale Lead)..."
            {...register('deploymentSchedule.participants')}
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border-color">
        <FormField
          as="textarea"
          label="Ghi chú về lịch trình hoặc yêu cầu thêm"
          placeholder="Ví dụ: Chỉ có thể hỗ trợ vào cuối tuần..."
          {...register('deploymentSchedule.note')}
        />
      </div>
    </div>
  );
};
