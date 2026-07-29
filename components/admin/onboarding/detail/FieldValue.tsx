import React from 'react';

export const FieldValue = ({ label, value }: { label: string, value: React.ReactNode }) => {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
    return null;
  }
  
  return (
    <div className="py-2.5 flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-start border-b border-slate-50 last:border-0 last:pb-0">
      <div className="text-sm text-slate-500 w-full sm:w-1/3 shrink-0 pt-0.5">{label}</div>
      <div className="text-sm font-medium text-slate-900 w-full sm:w-2/3">
        {Array.isArray(value) ? value.join(', ') : value}
      </div>
    </div>
  );
};
