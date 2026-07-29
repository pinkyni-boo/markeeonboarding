import React from 'react';
import { HardHat } from 'lucide-react';

interface AdminPlaceholderProps {
  title: string;
  description?: string;
}

export const AdminPlaceholder = ({ title, description = 'Tính năng này đang trong quá trình phát triển và sẽ sớm ra mắt.' }: AdminPlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 text-center mt-6">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
        <HardHat className="w-8 h-8 text-slate-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500 max-w-md">{description}</p>
    </div>
  );
};
