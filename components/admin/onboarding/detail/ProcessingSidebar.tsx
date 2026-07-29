'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingSubmission } from '@/types/onboarding';
import { Save, Loader2, User, Activity, AlertCircle, Calendar, Check } from 'lucide-react';
import { Member } from '@/types/member';

interface ProcessingSidebarProps {
  submission: OnboardingSubmission;
}

export const ProcessingSidebar = ({ submission }: ProcessingSidebarProps) => {
  const router = useRouter();
  const [status, setStatus] = useState(submission.status || 'new');
  const [priority, setPriority] = useState(submission.admin_meta?.priority || 'normal');
  const [assignee, setAssignee] = useState(submission.admin_meta?.assignee || '');
  const [startDate, setStartDate] = useState(submission.admin_meta?.startDate || '');
  const [completedDate, setCompletedDate] = useState(submission.admin_meta?.completedDate || '');
  const [isSaving, setIsSaving] = useState(false);
  const [assignableMembers, setAssignableMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/admin/members/assignable');
        if (res.ok) {
          const data = await res.json();
          setAssignableMembers(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingMembers(false);
      }
    };
    fetchMembers();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setIsSuccess(false);
    try {
      // Create activity log if assignee changed
      let newActivities = submission.admin_meta?.activities || [];
      if (assignee !== (submission.admin_meta?.assignee || '')) {
        let assigneeName = 'Chưa phân công';
        if (assignee) {
          const member = assignableMembers.find(m => m.id === assignee);
          assigneeName = member ? member.fullName : assignee;
        }
        
        newActivities = [
          {
            id: Date.now().toString(),
            type: 'assigned',
            author: 'Hệ thống / Admin',
            content: `Đã phân công yêu cầu cho: ${assigneeName}`,
            createdAt: new Date().toISOString()
          },
          ...newActivities
        ];
      }

      const res = await fetch(`/api/admin/onboarding/${submission.id}/meta`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          admin_meta: { 
            priority, 
            assignee,
            startDate,
            completedDate,
            activities: newActivities
          }
        }),
      });
      if (!res.ok) throw new Error('Update failed');
      router.refresh();
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2500);
    } catch (error) {
      console.error(error);
      alert('Không thể lưu thông tin. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-visible h-auto min-h-0">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Bảng điều khiển</h3>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
            isSuccess ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-primary hover:bg-primary-hover'
          }`}
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : isSuccess ? <Check className="w-4 h-4 shrink-0" /> : <Save className="w-4 h-4 shrink-0" />}
          <span>{isSuccess ? 'Đã lưu' : 'Lưu'}</span>
        </button>
      </div>
      
      <div className="p-5 space-y-5">
        
        {/* Status */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Activity className="w-4 h-4 shrink-0" />
            <span>Trạng thái</span>
          </label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="h-10 w-full border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            <option value="new">Mới tiếp nhận</option>
            <option value="reviewing">Đang xem xét</option>
            <option value="waiting_customer">Chờ khách bổ sung</option>
            <option value="in_progress">Đang tích hợp</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Mức độ ưu tiên</span>
          </label>
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="h-10 w-full border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            <option value="high">Khẩn cấp / Cao</option>
            <option value="normal">Bình thường</option>
            <option value="low">Thấp</option>
          </select>
        </div>

        {/* Assignee */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <User className="w-4 h-4 shrink-0" />
            <span>Người phụ trách</span>
          </label>
          <select 
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            disabled={isLoadingMembers}
            className="h-10 w-full border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option value="">Chưa phân công</option>
            {assignableMembers.map(m => (
              <option key={m.id} value={m.id}>
                {m.fullName} ({m.role}) - {m.email}
              </option>
            ))}
            {/* Fallback for legacy text */}
            {assignee && !assignee.startsWith('member_') && !assignableMembers.find(m => m.id === assignee) && (
              <option value={assignee}>{assignee} (Legacy)</option>
            )}
          </select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Ngày bắt đầu</span>
          </label>
          <input 
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-10 w-full border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Ngày hoàn thành</span>
          </label>
          <input 
            type="date"
            value={completedDate}
            onChange={(e) => setCompletedDate(e.target.value)}
            className="h-10 w-full border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          />
        </div>

      </div>
    </div>
  );
};
