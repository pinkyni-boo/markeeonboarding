'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { StatusBadge } from '@/components/admin/onboarding/detail/StatusBadge';
import { OnboardingSubmission } from '@/types/onboarding';

export const RecentSubmissions = ({ items }: { items: OnboardingSubmission[] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-6 flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-slate-500">Chưa có yêu cầu nào gần đây.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Yêu cầu mới nhất</h3>
        <Link href="/admin/onboarding" className="text-sm text-[#D7264E] font-medium hover:underline flex items-center gap-1">
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4 font-medium">Doanh nghiệp</th>
              <th className="px-6 py-4 font-medium">Ngày gửi</th>
              <th className="px-6 py-4 font-medium">Trạng thái</th>
              <th className="px-6 py-4 font-medium">Người phụ trách</th>
              <th className="px-6 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{item.data.company?.name || 'Chưa cập nhật'}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.data.company?.email || ''}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm') : '-'}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4">
                  {item.admin_meta?.assignee ? (
                    <span className="text-slate-700">{(item.admin_meta as any)?.assigneeName || item.admin_meta?.assignee}</span>
                  ) : (
                    <span className="text-slate-400 italic">Chưa phân công</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/admin/onboarding/${item.id}`}
                    className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-primary hover:bg-red-50 rounded-lg transition-colors"
                    title="Xem chi tiết"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
