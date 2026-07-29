import React from 'react';
import { Search } from 'lucide-react';

interface MembersFiltersProps {
  filters: { search: string; role: string; status: string };
  onChange: (f: any) => void;
}

export const MembersFilters = ({ filters, onChange }: MembersFiltersProps) => {
  return (
    <div className="flex flex-wrap items-end gap-3 lg:gap-4">
      {/* Search */}
      <div className="w-full xl:w-auto xl:flex-1 xl:min-w-[320px] relative">
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Tìm kiếm</label>
        <Search className="w-4 h-4 absolute left-3 top-[29px] text-slate-400" />
        <input 
          type="text" 
          placeholder="Tên thành viên hoặc email..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full h-[42px] pl-9 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* Role */}
      <div className="w-[170px] shrink-0">
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Vai trò</label>
        <select 
          value={filters.role}
          onChange={(e) => onChange({ ...filters, role: e.target.value })}
          className="w-full h-[42px] px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        >
          <option value="">Tất cả</option>
          <option value="admin">Admin</option>
          <option value="sales">Sales</option>
          <option value="implementation">Implementation</option>
          <option value="developer">Developer</option>
        </select>
      </div>

      {/* Status */}
      <div className="w-[170px] shrink-0">
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Trạng thái</label>
        <select 
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="w-full h-[42px] px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        >
          <option value="">Tất cả</option>
          <option value="active">Đang hoạt động</option>
          <option value="locked">Đã khoá</option>
        </select>
      </div>

      <button 
        onClick={() => onChange({ search: '', role: '', status: '' })}
        className="h-[42px] px-4 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
      >
        Đặt lại
      </button>
    </div>
  );
};
