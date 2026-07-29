import React from 'react';
import { ClientPage } from './ClientPage';

export default function AdminOnboardingList() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tất cả yêu cầu</h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý toàn bộ danh sách yêu cầu Onboarding
          </p>
        </div>
      </div>
      <ClientPage hideHeader={true} />
    </div>
  );
}

