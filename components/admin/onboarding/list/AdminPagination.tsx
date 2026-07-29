import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onChangePage: (page: number) => void;
  onChangePageSize: (size: number) => void;
}

export const AdminPagination = ({ page, pageSize, total, totalPages, onChangePage, onChangePageSize }: PaginationProps) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  if (total === 0) return null;

  return (
    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4">
      <div className="flex items-center gap-4">
        <div>Hiển thị <span className="font-medium text-slate-900">{start}</span> đến <span className="font-medium text-slate-900">{end}</span> trong <span className="font-medium text-slate-900">{total}</span> kết quả</div>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <label>Kích thước trang:</label>
          <select 
            value={pageSize}
            onChange={(e) => {
              onChangePageSize(Number(e.target.value));
              onChangePage(1); // reset to page 1 on resize
            }}
            className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-1">
        <button 
          onClick={() => onChangePage(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="p-1.5 border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="px-4 py-1.5 border border-slate-200 bg-white rounded text-slate-900 font-medium">
          {page} / {totalPages}
        </span>
        <button 
          onClick={() => onChangePage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="p-1.5 border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
