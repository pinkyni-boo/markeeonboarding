'use client';

import React from 'react';
import { Search, FileDown, Filter } from 'lucide-react';

export const FilterBar = () => {
  return (
    <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:w-96">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Tìm tên doanh nghiệp, mã ID..." 
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" />
          Lọc
        </button>
        <a 
          href="/api/admin/onboarding/export"
          download
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          <FileDown className="w-4 h-4" />
          Xuất CSV
        </a>
      </div>
    </div>
  );
};
