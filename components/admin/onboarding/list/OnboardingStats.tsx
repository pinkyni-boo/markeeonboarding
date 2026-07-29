import React from 'react';
import { FileText, Clock, PlayCircle, CheckCircle2, UserPlus } from 'lucide-react';

interface StatsProps {
  summary: {
    total: number;
    new: number;
    reviewing: number;
    waitingCustomer: number;
    inProgress: number;
    completed: number;
  };
  onFilterStatus: (status: string) => void;
}

export const OnboardingStats = ({ summary, onFilterStatus }: StatsProps) => {
  const stats = [
    { label: 'Tổng yêu cầu', value: summary.total || 0, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', filterValue: '' },
    { label: 'Mới tiếp nhận', value: summary.new || 0, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50', filterValue: 'new' },
    { label: 'Đang xử lý', value: (summary.reviewing || 0) + (summary.inProgress || 0), icon: PlayCircle, color: 'text-amber-600', bg: 'bg-amber-50', filterValue: 'in_progress' },
    { label: 'Chờ khách bổ sung', value: summary.waitingCustomer || 0, icon: UserPlus, color: 'text-orange-600', bg: 'bg-orange-50', filterValue: 'waiting_customer' },
    { label: 'Hoàn thành', value: summary.completed || 0, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', filterValue: 'completed' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, idx) => (
        <button 
          key={idx} 
          onClick={() => onFilterStatus(stat.filterValue)}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4 hover:border-primary/50 hover:shadow-md transition-all text-left"
        >
          <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        </button>
      ))}
    </div>
  );
};
