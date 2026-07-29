import React from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Activity, User, Building, Calendar, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { getSubmissions } from '@/lib/onboarding/repository';
import { getMembers } from '@/lib/admin/members-repository';

export default async function BusinessReportPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  const submissions = await getSubmissions();
  const submission = submissions.find(s => s.id === id);

  if (!submission) {
    notFound();
  }

  const members = await getMembers();
  const assigneeId = submission.admin_meta?.assignee;
  const assignee = members.find(m => m.id === assigneeId);

  const checklistState = submission.admin_meta?.checklist || {};
  const defaultChecklist = [
    { id: 'received', label: 'Tiếp nhận yêu cầu' },
    { id: 'access', label: 'Kiểm tra quyền truy cập' },
    { id: 'connected', label: 'Kết nối hệ thống' },
    { id: 'tested', label: 'Kiểm thử luồng' },
    { id: 'accounts_created', label: 'Tạo tài khoản' },
    { id: 'trained', label: 'Đào tạo sử dụng' },
    { id: 'handed_over', label: 'Bàn giao' },
  ];

  const completedSteps = defaultChecklist.filter(item => checklistState[item.id]).length;
  const progressPercentage = Math.round((completedSteps / defaultChecklist.length) * 100);

  const activities = submission.admin_meta?.activities || [];

  return (
    <div className="w-full pb-10 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/reports/detail"
          className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Báo cáo tiến độ: {submission.data.company?.name || 'Doanh nghiệp'}
          </h1>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
            <span>Mã YC: {submission.id}</span>
            <span>•</span>
            <span>Ngày tạo: {format(new Date(submission.createdAt), 'dd/MM/yyyy HH:mm')}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Overview & Progress */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Trạng thái</p>
                <p className="font-bold text-slate-800 capitalize">
                  {submission.status === 'completed' ? 'Hoàn thành' : 
                   submission.status === 'in_progress' ? 'Đang triển khai' :
                   submission.status === 'reviewing' ? 'Đang xem xét' : 'Mới tiếp nhận'}
                </p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Thời gian XL</p>
                <p className="font-bold text-slate-800">
                  {Math.max(1, Math.floor((new Date().getTime() - new Date(submission.createdAt).getTime()) / (1000 * 3600 * 24)))} ngày
                </p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tiến độ</p>
                <p className="font-bold text-slate-800">{progressPercentage}%</p>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Chi tiết các bước triển khai</h3>
            <div className="relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100"></div>
              
              <div className="space-y-6">
                {defaultChecklist.map((item, idx) => {
                  const isChecked = !!checklistState[item.id];
                  return (
                    <div key={item.id} className="relative flex items-center gap-4 z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 bg-white transition-colors
                        ${isChecked ? 'border-emerald-500 text-emerald-500' : 'border-slate-200 text-slate-300'}`}
                      >
                        {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className={`text-sm font-medium ${isChecked ? 'text-slate-800' : 'text-slate-500'}`}>
                          Bước {idx + 1}: {item.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column: Info & Timeline */}
        <div className="space-y-6">
          
          {/* Business Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-slate-400" />
              Thông tin liên hệ
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Người đại diện</p>
                <p className="text-sm font-medium text-slate-800">{submission.data.company?.contactName || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="text-sm font-medium text-slate-800">{submission.data.company?.email || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Điện thoại</p>
                <p className="text-sm font-medium text-slate-800">{submission.data.company?.phone || '-'}</p>
              </div>
            </div>
            
            <hr className="my-5 border-slate-100" />
            
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
              Người phụ trách
            </h3>
            {assignee ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {assignee.fullName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{assignee.fullName}</p>
                  <p className="text-xs text-slate-500">{assignee.role}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">Chưa phân công</p>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              Lịch sử hoạt động
            </h3>
            {activities.length > 0 ? (
              <div className="space-y-4 relative">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-100"></div>
                {activities.slice(0, 5).map((act: any) => (
                  <div key={act.id} className="relative flex gap-4 z-10">
                    <div className="w-4 h-4 mt-1 rounded-full bg-slate-200 border-2 border-white shrink-0"></div>
                    <div>
                      <p className="text-sm text-slate-700">{act.content}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {format(new Date(act.createdAt), 'dd/MM/yyyy HH:mm')} - {act.author}
                      </p>
                    </div>
                  </div>
                ))}
                {activities.length > 5 && (
                  <p className="text-xs text-center text-slate-400 italic pt-2">
                    ... và {activities.length - 5} hoạt động khác
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">Chưa có lịch sử hoạt động</p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
