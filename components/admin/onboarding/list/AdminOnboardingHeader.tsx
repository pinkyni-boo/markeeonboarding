import React from 'react';
import { FileDown, RefreshCw } from 'lucide-react';

interface AdminOnboardingHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const AdminOnboardingHeader = ({ onRefresh, isRefreshing }: AdminOnboardingHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Quản lý Onboarding</h1>
        <p className="text-slate-500 mt-1">Theo dõi yêu cầu khách hàng và tiến độ triển khai</p>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Làm mới
        </button>
        <a 
          href="/api/admin/onboarding/export"
          download
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm whitespace-nowrap"
        >
          <FileDown className="w-4 h-4" />
          Xuất CSV
        </a>
      </div>
    </div>
  );
};
