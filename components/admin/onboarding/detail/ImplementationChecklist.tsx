'use client';

import React, { useState } from 'react';
import { OnboardingSubmission } from '@/types/onboarding';
import { ListChecks, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const defaultChecklist = [
  { id: 'received', label: 'Đã nhận form và kiểm tra sơ bộ' },
  { id: 'access', label: 'Đã kiểm tra quyền truy cập (Admin/OA)' },
  { id: 'connected', label: 'Đã kết nối kênh thành công' },
  { id: 'tested', label: 'Đã test luồng hội thoại / đồng bộ' },
  { id: 'accounts_created', label: 'Đã tạo tài khoản nhân sự' },
  { id: 'trained', label: 'Đã đào tạo sử dụng' },
  { id: 'handed_over', label: 'Đã bàn giao hoàn tất' },
];

export const ImplementationChecklist = ({ submission }: { submission: OnboardingSubmission }) => {
  const router = useRouter();
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(
    submission.admin_meta?.checklist || {}
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async (id: string, checked: boolean) => {
    // Optimistic update
    const newState = { ...checklistState, [id]: checked };
    setChecklistState(newState);
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/onboarding/${submission.id}/meta`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_meta: {
            checklist: newState
          }
        }),
      });
      if (!res.ok) throw new Error('Failed to save checklist');
      router.refresh();
    } catch (e) {
      console.error(e);
      // Revert on error
      setChecklistState(checklistState);
      alert('Không thể lưu trạng thái checklist. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 overflow-visible h-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" />
          Checklist triển khai
        </h3>
        {isSaving && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
      </div>
      
      <div className="space-y-3">
        {defaultChecklist.map(item => {
          const isChecked = !!checklistState[item.id];
          return (
            <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={(e) => handleToggle(item.id, e.target.checked)}
                disabled={isSaving || isChecked}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className={`text-sm select-none transition-colors ${isChecked ? 'text-slate-500 line-through' : 'text-slate-700 group-hover:text-slate-900'}`}>
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
