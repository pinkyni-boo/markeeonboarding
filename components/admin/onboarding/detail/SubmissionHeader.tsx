import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { OnboardingSubmission } from '@/types/onboarding';
import { StatusBadge, PriorityBadge } from './StatusBadge';

export const SubmissionHeader = ({ submission }: { submission: OnboardingSubmission }) => {
  const companyName = submission.data.company?.name || 'Khách hàng chưa đặt tên';
  // Fallback to "Dữ liệu chưa đầy đủ" if company name is just 1 letter and suspicious
  const isSuspicious = companyName.length <= 2 && companyName.toLowerCase() === 'f';
  const displayTitle = isSuspicious ? 'Dữ liệu chưa đầy đủ' : companyName;

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        <div className="flex items-start gap-4">
          <Link href="/admin/onboarding" className="mt-1 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              {displayTitle}
              {isSuspicious && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded border border-red-200 font-medium">
                  Thiếu dữ liệu
                </span>
              )}
            </h1>
            <div className="text-sm text-slate-500 mt-1.5 flex items-center gap-2">
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                #{submission.id}
              </span>
              <span>•</span>
              <span>Gửi lúc {format(new Date(submission.createdAt), 'HH:mm · dd/MM/yyyy')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <StatusBadge status={submission.status} />
          <PriorityBadge priority={submission.admin_meta?.priority} />
          
          {submission.admin_meta?.assignee && (
            <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-700 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                {submission.admin_meta.assignee.charAt(0).toUpperCase()}
              </div>
              {submission.admin_meta.assignee}
            </div>
          )}

          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
      </div>
    </div>
  );
};
