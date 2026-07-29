import React from 'react';
import { getPlatformMeta } from '@/lib/admin/platform-metadata';
import { getFieldLabel } from '@/lib/admin/field-labels';
import { ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { FieldValue } from './FieldValue';
import { clsx } from 'clsx';

interface IntegrationChannelCardProps {
  platformId: string;
  details: Record<string, unknown>;
}

export const IntegrationChannelCard = ({ platformId, details }: IntegrationChannelCardProps) => {
  const meta = getPlatformMeta(platformId);
  
  if (!details || Object.keys(details).length === 0) return null;
  const isEmpty = Object.values(details).every(v => v === undefined || v === '');
  if (isEmpty) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center border', meta.colorClass)}>
            <meta.icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{meta.name}</h3>
            <span className="text-xs text-slate-500">Chưa kiểm tra</span>
          </div>
        </div>
        <button className="text-xs font-medium text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" />
          <span>Đánh dấu</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1">
        <div className="flex flex-col">
          {Object.entries(details).map(([key, val]) => {
            if (val === undefined || val === '') return null;
            
            // Special rendering for links
            if (key.toLowerCase().includes('link') || key.toLowerCase().includes('domain')) {
              return (
                <div key={key} className="py-2.5 flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-start border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="text-sm text-slate-500 w-full sm:w-1/3 shrink-0 pt-0.5">{getFieldLabel(key)}</div>
                  <div className="text-sm font-medium text-slate-900 w-full sm:w-2/3 flex items-center gap-2">
                    <span className="truncate max-w-[200px]">{String(val)}</span>
                    <a href={String(val).startsWith('http') ? String(val) : `https://${val}`} target="_blank" rel="noreferrer" className="text-primary hover:bg-red-50 p-1 rounded transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button onClick={() => navigator.clipboard.writeText(String(val))} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            }
            
            // Special rendering for translated values
            let displayVal = String(val);
            if (displayVal === 'yes') displayVal = 'Có';
            if (displayVal === 'no') displayVal = 'Không';
            if (displayVal === 'undecided') displayVal = 'Chưa quyết định';
            
            return <FieldValue key={key} label={getFieldLabel(key)} value={displayVal} />;
          })}
        </div>
      </div>
    </div>
  );
};
