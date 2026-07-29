import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../FormField';
import { OnboardingFormValues } from '@/lib/onboarding/schema';
import { chatChannelOptions, salesChannelOptions, adsChannelOptions, supportMethodOptions } from '@/lib/onboarding/options';

const Section = ({ title, onEdit, children }: { title: string, onEdit?: () => void, children: React.ReactNode }) => (
  <div className="mb-6 bg-white rounded-[14px] border border-slate-200 p-5 shadow-sm">
    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {onEdit && (
        <button 
          type="button" 
          onClick={onEdit}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Chỉnh sửa
        </button>
      )}
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const Row = ({ label, value }: { label: string, value: React.ReactNode }) => {
  if (value === undefined || value === null || value === '') return null;
  if (Array.isArray(value) && value.length === 0) return null;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      <span className="text-sm text-slate-900 sm:col-span-2 font-medium">
        {Array.isArray(value) ? value.join(', ') : value}
      </span>
    </div>
  );
};

export const ReviewStep: React.FC<{ setStep: (stepId: string) => void }> = ({ setStep }) => {
  const { register, watch, formState: { errors } } = useFormContext<OnboardingFormValues>();
  const data = watch();

  const getLabel = (id: string, options: {id: string, label: string}[]) => options.find(o => o.id === id)?.label || id;
  const getLabels = (ids: string[] | undefined, options: {id: string, label: string}[]) => (ids || []).map(id => getLabel(id, options));

  const formatProductLabel = (p: string) => {
    if (p === 'markeeChat') return 'Markee Chat';
    if (p === 'markeeSeeding') return 'Markee Seeding';
    if (p === 'markeeApp') return 'Markee App';
    return p;
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-slate-900 mb-2">Xem lại thông tin</h2>
      <p className="text-slate-500 mb-6">Vui lòng kiểm tra lại các thông tin trước khi gửi.</p>
      
      <Section title="Doanh nghiệp" onEdit={() => setStep('company')}>
        <Row label="Tên doanh nghiệp" value={data.company?.name} />
        <Row label="Tên thương hiệu" value={data.company?.brand} />
        <Row label="Người liên hệ" value={data.company?.contactName} />
        <Row label="Số điện thoại" value={data.company?.phone} />
        <Row label="Email" value={data.company?.email} />
        <Row label="Website" value={data.company?.website} />
      </Section>

      <Section title="Dịch vụ & Sản phẩm" onEdit={() => setStep('products')}>
        <Row label="Sản phẩm đã chọn" value={data.selectedProducts?.map(formatProductLabel)} />
      </Section>

      {/* Markee Chat Review Section */}
      {data.selectedProducts?.includes('markeeChat') && data.productData?.markeeChat?.channels && (
        <Section title="Chi tiết Markee Chat" onEdit={() => setStep('channels')}>
          <Row label="Kênh Chat" value={getLabels(data.productData.markeeChat.channels.chat, chatChannelOptions)} />
          <Row label="Kênh Bán hàng" value={getLabels(data.productData.markeeChat.channels.sales, salesChannelOptions)} />
          <Row label="Kênh Quảng cáo" value={getLabels(data.productData.markeeChat.channels.ads, adsChannelOptions)} />
        </Section>
      )}

      {/* Markee Seeding Review Section (Future) */}
      {data.selectedProducts?.includes('markeeSeeding') && (
        <Section title="Chi tiết Markee Seeding" onEdit={() => setStep('products')}>
          <Row label="Trạng thái" value="Chưa cấu hình (Đang cập nhật)" />
        </Section>
      )}

      {/* Markee App Review Section (Future) */}
      {data.selectedProducts?.includes('markeeApp') && (
        <Section title="Chi tiết Markee App" onEdit={() => setStep('products')}>
          <Row label="Trạng thái" value="Chưa cấu hình (Đang cập nhật)" />
        </Section>
      )}

      <Section title="Nhân sự sử dụng" onEdit={() => setStep('staffing')}>
        <Row label="Tổng số nhân sự" value={data.staff?.length} />
        {data.staff?.map((s, i) => (
          <div key={s.id} className="text-sm text-slate-700 mt-2 p-3 bg-slate-50 rounded-lg">
            <span className="font-semibold">{s.name}</span> - {s.role} 
            {s.product && <span className="text-slate-500"> ({formatProductLabel(s.product)})</span>}
          </div>
        ))}
      </Section>

      <Section title="Thời gian triển khai" onEdit={() => setStep('schedule')}>
        <Row label="Hình thức hỗ trợ" value={getLabels(data.deploymentSchedule?.supportMethods, supportMethodOptions)} />
        <Row label="Ngày mong muốn" value={data.deploymentSchedule?.preferredDate} />
        <Row label="Khung giờ" value={data.deploymentSchedule?.preferredTimeSlot} />
        <Row label="Giờ cụ thể" value={data.deploymentSchedule?.specificTime} />
        <Row label="Người tham gia" value={data.deploymentSchedule?.participants} />
      </Section>

      <div className="mt-8 mb-6 pt-6 border-t border-slate-200">
        <FormField
          as="textarea"
          label="Yêu cầu hoặc ghi chú bổ sung"
          placeholder="Nhập bất kỳ yêu cầu nào khác..."
          {...register('additionalNotes')}
        />
      </div>

      <div className="mt-6 bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="confirmed"
            type="checkbox"
            className="h-5 w-5 rounded border-slate-300 bg-white text-primary focus:ring-primary focus:ring-offset-white"
            {...register('review.confirmed')}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="confirmed" className="font-medium text-slate-900 cursor-pointer">
            Tôi xác nhận các thông tin trên là đúng theo hiểu biết hiện tại.
          </label>
          {errors.review?.confirmed && (
            <p className="text-red-500 text-sm mt-1">{errors.review.confirmed.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
