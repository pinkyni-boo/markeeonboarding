import React from 'react';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: number | string;
  isActive: boolean;
  onClick: () => void;
  colorClass: string;
}

export const StatCard = ({ icon: Icon, title, value, isActive, onClick, colorClass }: StatCardProps) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-white border ${isActive ? 'border-primary shadow-md' : 'border-slate-200 shadow-sm'} rounded-xl p-4 flex items-center gap-4 hover:border-primary/50 transition-all text-left`}
    >
      <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-xs font-medium text-slate-500 mt-0.5">{title}</div>
      </div>
    </button>
  );
};
