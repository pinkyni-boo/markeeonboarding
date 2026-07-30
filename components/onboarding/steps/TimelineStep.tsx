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
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
        Thá»i gian dá»± kiáº¿n
        <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 uppercase tracking-wider px-1.5 py-0.5 rounded">(KhÃ´ng báº¯t buá»™c)</span>
      </h2>
      <p className="text-text-muted mb-4 md:mb-8">Cho chÃºng tÃ´i biáº¿t thá»i gian phÃ¹ há»£p Ä‘á»ƒ liÃªn há»‡ hoáº·c báº¯t Ä‘áº§u triá»ƒn khai.</p>
      
      <div className="mb-4 md:mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">HÃ¬nh thá»©c há»— trá»£ mong muá»‘n (cÃ³ thá»ƒ chá»n nhiá»u)</h3>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4 md:mb-8">
        <FormField
          label="NgÃ y mong muá»‘n triá»ƒn khai"
          type="date"
          {...register('deploymentSchedule.preferredDate')}
        />
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5 md:mb-2">Khung giá» phÃ¹ há»£p</label>
          <select 
            className="w-full px-3 md:px-4 py-2 md:py-3 rounded-[10px] md:rounded-xl border border-slate-300 bg-white text-base sm:text-sm"
            {...register('deploymentSchedule.preferredTimeSlot')}
          >
            <option value="">Chá»n...</option>
            {timeSlotOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        {preferredTimeSlot === 'specific' && (
          <div className="md:col-span-2 animate-in fade-in zoom-in-95 duration-200">
            <FormField
              label="Giá» cá»¥ thá»ƒ (VD: 14:30)"
              type="time"
              required
              {...register('deploymentSchedule.specificTime')}
              error={errors.deploymentSchedule?.specificTime?.message}
            />
          </div>
        )}

        <div className="md:col-span-2">
          <FormField
            label="NgÆ°á»i tham gia buá»•i triá»ƒn khai (tÃªn, chá»©c vá»¥)"
            placeholder="VÃ­ dá»¥: Nguyá»…n VÄƒn A (Admin), Tráº§n Thá»‹ B (Sale Lead)..."
            {...register('deploymentSchedule.participants')}
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border-color">
        <FormField
          as="textarea"
          label="Ghi chÃº vá» lá»‹ch trÃ¬nh hoáº·c yÃªu cáº§u thÃªm"
          placeholder="VÃ­ dá»¥: Chá»‰ cÃ³ thá»ƒ há»— trá»£ vÃ o cuá»‘i tuáº§n..."
          {...register('deploymentSchedule.note')}
        />
      </div>
    </div>
  );
};
