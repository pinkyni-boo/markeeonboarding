'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { OnboardingSubmission } from '@/types/onboarding';

export const AssignDrawer = ({
  isOpen,
  onClose,
  submission,
  workload,
  onAssignSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  submission: OnboardingSubmission | null;
  workload: any[];
  onAssignSuccess: () => void;
}) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (!isOpen || !submission) return null;

  const handleAssign = async (member: any) => {
    setLoadingId(member.id);
    try {
      const res = await fetch(`/api/admin/assignments/${submission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedTo: member.name })
      });
      if (res.ok) {
        onAssignSuccess();
        onClose();
      } else {
        alert('Có lỗi xảy ra khi phân công');
      }
    } catch (e) {
      alert('Có lỗi xảy ra khi phân công');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/50 z-[100] backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-[110] flex flex-col transform transition-transform">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Phân công triển khai</h2>
            <p className="text-sm text-slate-500 mt-1">{submission.data.company?.name}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <p className="text-sm font-medium text-slate-600 mb-2">Chọn nhân sự phụ trách:</p>
          
          {workload.map(member => (
            <div key={member.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-primary/50 transition-colors">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{member.name}</span>
                <span className="text-xs text-slate-500">{member.role}</span>
                <span className={`text-xs mt-1 font-medium ${member.isOverloaded ? 'text-red-500' : 'text-slate-600'}`}>
                  Đang xử lý: {member.activeCount}/{member.capacity}
                </span>
              </div>
              <button 
                onClick={() => handleAssign(member)}
                disabled={loadingId === member.id}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loadingId === member.id ? 'Đang xử lý...' : 'Chọn'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
