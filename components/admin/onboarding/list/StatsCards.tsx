import React from 'react';
import { OnboardingSubmission } from '@/types/onboarding';
import { FileText, Clock, PlayCircle, CheckCircle2 } from 'lucide-react';

export const StatsCards = ({ submissions }: { submissions: OnboardingSubmission[] }) => {
  const total = submissions.length;
  const newCount = submissions.filter(s => s.status === 'new').length;
  const inProgress = submissions.filter(s => s.status === 'in_progress').length;
  const completed = submissions.filter(s => s.status === 'completed').length;

  const stats = [
    { label: 'Tổng yêu cầu', value: total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Mới tiếp nhận', value: newCount, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Đang xử lý', value: inProgress, icon: PlayCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Hoàn thành', value: completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm font-medium text-slate-500">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
