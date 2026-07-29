import React from 'react';
import { FileText, Clock, AlertCircle, CheckCircle, Users, UserPlus, FileQuestion } from 'lucide-react';

export const DashboardStats = ({ data }: { data: any }) => {
  if (!data) return null;

  const { summary, membersSummary } = data;

  return (
    <div className="flex flex-col gap-6">
      {/* Onboarding Stats */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Thống kê Onboarding</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard title="Tổng yêu cầu" value={summary.total} icon={<FileText className="w-5 h-5 text-blue-500" />} color="border-blue-100 bg-blue-50/50" />
          <StatCard title="Mới tiếp nhận" value={summary.new} icon={<AlertCircle className="w-5 h-5 text-amber-500" />} color="border-amber-100 bg-amber-50/50" />
          <StatCard title="Đang xử lý" value={summary.inProgress} icon={<Clock className="w-5 h-5 text-indigo-500" />} color="border-indigo-100 bg-indigo-50/50" />
          <StatCard title="Chờ phản hồi" value={summary.waitingCustomer} icon={<AlertCircle className="w-5 h-5 text-orange-500" />} color="border-orange-100 bg-orange-50/50" />
          <StatCard title="Hoàn thành" value={summary.completed} icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} color="border-emerald-100 bg-emerald-50/50" />
        </div>
      </div>

      {/* Members Stats */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Nhân sự & Phân công</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Tổng thành viên nội bộ" value={membersSummary.total} icon={<Users className="w-5 h-5 text-slate-500" />} color="border-slate-200 bg-slate-50/50" />
          <StatCard title="Có thể nhận phân công" value={membersSummary.assignable} icon={<UserPlus className="w-5 h-5 text-primary" />} color="border-primary/20 bg-primary/5" />
          <StatCard title="Yêu cầu chưa phân công" value={membersSummary.unassignedTasks} icon={<FileQuestion className="w-5 h-5 text-red-500" />} color="border-red-100 bg-red-50/50" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => {
  return (
    <div className={`p-5 rounded-2xl border ${color} flex items-center justify-between`}>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-600">{title}</span>
        <span className="text-2xl font-bold text-slate-900 mt-1">{value}</span>
      </div>
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
        {icon}
      </div>
    </div>
  );
};
