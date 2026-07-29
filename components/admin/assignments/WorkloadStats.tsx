'use client';

import React from 'react';

export const WorkloadStats = ({ workload }: { workload: any[] }) => {
  if (!workload || workload.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">Tải công việc thành viên</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {workload.map((member) => (
          <div key={member.id} className="border border-slate-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-slate-800">{member.name}</span>
              {member.isOverloaded && (
                <span className="text-[10px] uppercase font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Quá tải</span>
              )}
            </div>
            <div className="text-sm text-slate-500 mb-4">{member.role}</div>
            <div className="mt-auto flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">Đang xử lý</span>
                <span className={`text-xl font-bold ${member.isOverloaded ? 'text-red-500' : 'text-slate-700'}`}>
                  {member.activeCount} <span className="text-sm text-slate-400 font-normal">/ {member.capacity}</span>
                </span>
              </div>
              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${member.isOverloaded ? 'bg-red-500' : 'bg-primary'}`} 
                  style={{ width: `${Math.min(100, (member.activeCount / member.capacity) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
