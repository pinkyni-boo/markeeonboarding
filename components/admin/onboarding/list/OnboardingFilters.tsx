import React, { useEffect, useState } from 'react';
import { Search, RotateCcw, Calendar } from 'lucide-react';
import { FilterSelect } from './FilterSelect';
import { ActiveFilterChips } from './ActiveFilterChips';

interface FiltersProps {
  filters: {
    search: string;
    status: string;
    product: string;
    assignedTo: string;
    dateFrom: string;
    dateTo: string;
  };
  onChange: (key: string, value: string) => void;
  onReset: () => void;
}

const statusOptions = [
  { label: 'Mới tiếp nhận', value: 'new' },
  { label: 'Đang xem xét', value: 'reviewing' },
  { label: 'Chờ khách bổ sung', value: 'waiting_customer' },
  { label: 'Đang tích hợp', value: 'in_progress' },
  { label: 'Hoàn thành', value: 'completed' },
  { label: 'Đã hủy', value: 'cancelled' },
];

const productOptions = [
  { label: 'Markee Chat', value: 'markeeChat', description: 'Chat đa kênh' },
  { label: 'Markee Seeding', value: 'markeeSeeding', description: 'Seeding & Automation' },
  { label: 'Markee App', value: 'markeeApp', description: 'Ứng dụng doanh nghiệp' },
];

export const OnboardingFilters = ({ filters, onChange, onReset }: FiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.search);
  const [assigneeOptions, setAssigneeOptions] = useState<{label: string, value: string}[]>([
    { label: 'Chưa phân công', value: 'unassigned' }
  ]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/admin/members/assignable');
        if (res.ok) {
          const data = await res.json();
          const options = data.map((m: any) => ({
            label: m.fullName,
            value: m.id
          }));
          setAssigneeOptions([{ label: 'Chưa phân công', value: 'unassigned' }, ...options]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchMembers();
  }, []);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange('search', searchValue);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchValue, onChange]);

  // Sync when prop changes from outside (e.g., reset)
  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  const hasActiveFilters = Object.values({ ...filters, search: '' }).some(v => v !== '');

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end gap-3 lg:gap-4">
        
        {/* Search */}
        <div className="w-full xl:w-auto xl:flex-1 xl:min-w-[320px] relative">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Tìm kiếm</label>
          <Search className="w-4 h-4 absolute left-3 top-[29px] text-slate-400" />
          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm doanh nghiệp, liên hệ hoặc mã..." 
            className="w-full h-11 pl-9 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white hover:border-slate-300"
          />
        </div>

        {/* Custom Selects */}
        <FilterSelect 
          label="Trạng thái" 
          value={filters.status} 
          options={statusOptions} 
          onChange={(val) => onChange('status', val)}
          width="w-full sm:flex-1 sm:min-w-[160px]"
        />

        <FilterSelect 
          label="Sản phẩm" 
          value={filters.product} 
          options={productOptions} 
          onChange={(val) => onChange('product', val)}
          width="w-full sm:flex-1 sm:min-w-[160px]"
        />

        <FilterSelect 
          label="Phụ trách" 
          value={filters.assignedTo} 
          options={assigneeOptions} 
          onChange={(val) => onChange('assignedTo', val)}
          width="w-full sm:flex-1 sm:min-w-[160px]"
        />

        {/* Date Inputs */}
        <div className="w-full sm:flex-1 sm:min-w-[150px] relative">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Từ ngày</label>
          <input 
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange('dateFrom', e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white hover:border-slate-300 text-slate-700"
          />
        </div>

        <div className="w-full sm:flex-1 sm:min-w-[150px] relative">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Đến ngày</label>
          <input 
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange('dateTo', e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white hover:border-slate-300 text-slate-700"
          />
        </div>

        {/* Reset Button */}
        <button 
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="shrink-0 flex items-center justify-center gap-1.5 h-11 px-4 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors bg-white w-full xl:w-auto ml-auto disabled:opacity-50 disabled:hover:bg-white"
        >
          <RotateCcw className="w-4 h-4 shrink-0" />
          <span>Đặt lại</span>
        </button>
      </div>

      <ActiveFilterChips 
        filters={filters}
        onRemove={(key) => onChange(key, '')}
        onClearAll={onReset}
      />
    </div>
  );
};
