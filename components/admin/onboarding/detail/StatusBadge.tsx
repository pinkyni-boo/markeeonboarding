import React from 'react';
import { clsx } from 'clsx';

type StatusType = 'new' | 'reviewing' | 'in_progress' | 'waiting_customer' | 'completed' | 'cancelled';
type PriorityType = 'high' | 'normal' | 'low';

export const statusConfig: Record<StatusType, { label: string; class: string }> = {
  new: { label: 'Mới tiếp nhận', class: 'bg-blue-100 text-blue-700 border-blue-200' },
  reviewing: { label: 'Đang xem xét', class: 'bg-purple-100 text-purple-700 border-purple-200' },
  in_progress: { label: 'Đang tích hợp', class: 'bg-amber-100 text-amber-700 border-amber-200' },
  waiting_customer: { label: 'Chờ khách phản hồi', class: 'bg-orange-100 text-orange-700 border-orange-200' },
  completed: { label: 'Hoàn thành', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  cancelled: { label: 'Đã hủy', class: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export const priorityConfig: Record<PriorityType, { label: string; class: string }> = {
  high: { label: 'Ưu tiên cao', class: 'bg-red-100 text-red-700 border-red-200' },
  normal: { label: 'Bình thường', class: 'bg-slate-100 text-slate-700 border-slate-200' },
  low: { label: 'Ưu tiên thấp', class: 'bg-slate-100 text-slate-600 border-slate-200' },
};

export const StatusBadge = ({ status }: { status?: StatusType }) => {
  if (!status) return null;
  const config = statusConfig[status] || statusConfig.new;
  return (
    <span className={clsx('px-2.5 py-1 text-xs font-medium rounded-full border', config.class)}>
      {config.label}
    </span>
  );
};

export const PriorityBadge = ({ priority }: { priority?: PriorityType }) => {
  if (!priority) return null;
  const config = priorityConfig[priority];
  return (
    <span className={clsx('px-2.5 py-1 text-xs font-medium rounded-full border', config.class)}>
      {config.label}
    </span>
  );
};
