import React from 'react';
import { getPlatformMeta } from '@/lib/admin/platform-metadata';

export const ChannelBadges = ({ channels }: { channels: string[] }) => {
  if (!channels || channels.length === 0) return <span className="text-slate-400 text-xs italic">-</span>;

  const displayChannels = channels.slice(0, 3);
  const remaining = channels.length - 3;

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {displayChannels.map(ch => {
        const meta = getPlatformMeta(ch);
        return (
          <div key={ch} className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border ${meta.colorClass}`} title={meta.name}>
            <meta.icon className="w-3 h-3" />
            <span className="truncate max-w-[120px]">{meta.name}</span>
          </div>
        );
      })}
      {remaining > 0 && (
        <div className="px-2 py-1 rounded text-xs font-medium border bg-slate-50 border-slate-200 text-slate-600">
          +{remaining} kênh
        </div>
      )}
    </div>
  );
};
