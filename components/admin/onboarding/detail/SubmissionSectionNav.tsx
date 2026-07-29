'use client';

import React from 'react';

const sections = [
  { id: 'company', label: 'Doanh nghiệp' },
  { id: 'contact', label: 'Liên hệ' },
  { id: 'products', label: 'Sản phẩm' },
  { id: 'staff', label: 'Nhân sự' },
  { id: 'schedule', label: 'Lịch triển khai' },
  { id: 'notes', label: 'Ghi chú' },
  { id: 'activity', label: 'Hoạt động' },
];

export const SubmissionSectionNav = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40 lg:hidden">
      <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="whitespace-nowrap px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-sm font-medium border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};
