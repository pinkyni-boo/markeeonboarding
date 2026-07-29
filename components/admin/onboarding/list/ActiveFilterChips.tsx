'use client';

import React from 'react';
import { X } from 'lucide-react';
import { getPlatformMeta } from '@/lib/admin/platform-metadata';
import { fieldLabels } from '@/lib/admin/field-labels';

interface ActiveFilterChipsProps {
  filters: {
    status: string;
    product: string;
    assignedTo: string;
    dateFrom: string;
    dateTo: string;
  };
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export const ActiveFilterChips = ({ filters, onRemove, onClearAll }: ActiveFilterChipsProps) => {
  const activeCount = Object.values(filters).filter(Boolean).length;
  if (activeCount === 0) return null;

  const renderChip = (key: string, label: string, value: string, formatValue?: (v: string) => string) => {
    if (!value) return null;
    return (
      <div key={key} className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-primary rounded-full text-xs font-medium border border-red-100">
        <span className="text-red-700/70">{label}:</span>
        <span>{formatValue ? formatValue(value) : value}</span>
        <button
          onClick={() => onRemove(key)}
          className="ml-1 p-0.5 hover:bg-red-100 rounded-full transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  };

  const getStatusLabel = (val: string) => {
    switch (val) {
      case 'new': return 'Mới tiếp nhận';
      case 'reviewing': return 'Đang xem xét';
      case 'waiting_customer': return 'Chờ khách bổ sung';
      case 'in_progress': return 'Đang tích hợp';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return val;
    }
  };

  const getProductLabel = (val: string) => {
    if (val === 'markeeChat') return 'Markee Chat';
    if (val === 'markeeSeeding') return 'Markee Seeding';
    if (val === 'markeeApp') return 'Markee App';
    return val;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {renderChip('status', 'Trạng thái', filters.status, getStatusLabel)}
      {renderChip('product', 'Sản phẩm', filters.product, getProductLabel)}
      {renderChip('assignedTo', 'Phụ trách', filters.assignedTo)}
      {renderChip('dateFrom', 'Từ ngày', filters.dateFrom)}
      {renderChip('dateTo', 'Đến ngày', filters.dateTo)}
      
      <button
        onClick={onClearAll}
        className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 underline-offset-2 hover:underline transition-all"
      >
        Xóa tất cả
      </button>
    </div>
  );
};
