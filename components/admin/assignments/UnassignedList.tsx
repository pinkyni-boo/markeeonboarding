'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { UserPlus } from 'lucide-react';
import { OnboardingSubmission } from '@/types/onboarding';

export const UnassignedList = ({ 
  items, 
  onAssign 
}: { 
  items: OnboardingSubmission[],
  onAssign: (item: OnboardingSubmission) => void 
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-slate-500">Tuyệt vời! Không còn yêu cầu nào chưa được phân công.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Danh sách chờ phân công ({items.length})</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4 font-medium">Doanh nghiệp</th>
              <th className="px-6 py-4 font-medium">Sản phẩm</th>
              <th className="px-6 py-4 font-medium">Ngày gửi</th>
              <th className="px-6 py-4 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{item.data.company?.name || 'Chưa cập nhật'}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {item.data.selectedProducts?.length || 0} sản phẩm
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm') : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onAssign(item)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Phân công
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
