import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { OnboardingFormValues } from '@/lib/onboarding/schema';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from '../FormField';

const roleOptions = [
  'Admin',
  'Leader',
  'Sale',
  'CSKH',
  'Marketing',
  'Kỹ thuật',
  'Khác'
];

export const StaffingStep: React.FC = () => {
  const { control, register, watch, formState: { errors } } = useFormContext<OnboardingFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'staff'
  });

  const selectedProducts = watch('selectedProducts') || [];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-1">Nhân sự sử dụng <span className="text-sm font-normal text-slate-500">(Không bắt buộc)</span></h2>
          <p className="text-slate-500 text-sm">Cung cấp danh sách nhân sự nếu bạn đã có sẵn, hoặc có thể thiết lập sau.</p>
        </div>
        <button
          type="button"
          onClick={() => append({ id: crypto.randomUUID(), name: '', email: '', role: 'Sale', product: selectedProducts[0] || '', channels: '' })}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-primary text-white hover:bg-primary-hover rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Thêm nhân sự</span>
          <span className="sm:hidden">Thêm</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {fields.length > 0 && (
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-3">Họ và tên *</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Vai trò *</div>
            <div className="col-span-2">Sản phẩm phụ trách</div>
            <div className="col-span-1">Kênh</div>
            <div className="col-span-1 text-center">Xóa</div>
          </div>
        )}

        {fields.length === 0 && (
          <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <p className="text-slate-500 mb-4">Bạn chưa thêm nhân sự nào. Có thể bấm <strong>Bỏ qua / Tiếp tục</strong> để sang bước sau.</p>
            <button
              type="button"
              onClick={() => append({ id: crypto.randomUUID(), name: '', email: '', role: 'Admin', product: selectedProducts[0] || '', channels: '' })}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Thêm nhân sự đầu tiên
            </button>
          </div>
        )}

        {fields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 md:p-0 md:px-4 bg-slate-50 border border-slate-200 md:border-transparent md:bg-transparent rounded-xl md:rounded-none">
            
            <div className="md:col-span-3 space-y-1">
              <label className="md:hidden text-xs font-semibold text-slate-500">Họ và tên *</label>
              <input
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                placeholder="Nguyễn Văn A"
                {...register(`staff.${index}.name` as const)}
              />
              {errors.staff?.[index]?.name && (
                <p className="text-red-500 text-[11px]">{errors.staff[index]?.name?.message}</p>
              )}
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="md:hidden text-xs font-semibold text-slate-500">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                placeholder="email@example.com"
                {...register(`staff.${index}.email` as const)}
              />
              {errors.staff?.[index]?.email && (
                <p className="text-red-500 text-[11px]">{errors.staff[index]?.email?.message}</p>
              )}
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="md:hidden text-xs font-semibold text-slate-500">Vai trò *</label>
              <select
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm appearance-none"
                {...register(`staff.${index}.role` as const)}
              >
                {roleOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {errors.staff?.[index]?.role && (
                <p className="text-red-500 text-[11px]">{errors.staff[index]?.role?.message}</p>
              )}
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="md:hidden text-xs font-semibold text-slate-500">Sản phẩm phụ trách</label>
              <select
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm appearance-none"
                {...register(`staff.${index}.product` as const)}
              >
                <option value="">-- Chọn --</option>
                {selectedProducts.map(p => (
                  <option key={p} value={p}>{p === 'markeeChat' ? 'Markee Chat' : p === 'markeeSeeding' ? 'Markee Seeding' : 'Markee App'}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1 space-y-1">
              <label className="md:hidden text-xs font-semibold text-slate-500">Kênh</label>
              <input
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                placeholder="VD: Fanpage 1"
                {...register(`staff.${index}.channels` as const)}
              />
            </div>

            <div className="md:col-span-1 flex justify-end md:justify-center pt-2 md:pt-1">
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Xóa nhân sự"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
