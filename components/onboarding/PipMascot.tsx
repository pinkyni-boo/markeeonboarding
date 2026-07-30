import React from 'react';
import { getMascotMessage } from '@/lib/onboarding/mascotMessages';

interface PipMascotProps {
  stepId?: string;
  compact?: boolean;
}

export const PipMascot: React.FC<PipMascotProps> = ({ stepId, compact = false }) => {
  const message = getMascotMessage(stepId);

  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-border-color p-3">
        <img
          src="/img/mascot/pip-96.png"
          alt="Trợ lý Markee"
          className="w-11 h-11 object-contain shrink-0 animate-mascot-float"
        />
        <div className="speech-bubble-tail-left relative flex-1 bg-white rounded-2xl border border-border-color px-3 py-2 shadow-sm">
          <p className="text-xs text-foreground leading-snug">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-50 border border-border-color p-4 flex flex-col items-center text-center">
      <img
        src="/img/mascot/pip-256.png"
        alt="Trợ lý Markee"
        className="w-20 h-20 object-contain animate-mascot-float"
      />
      <div className="speech-bubble-tail-top relative mt-3 w-full bg-white rounded-2xl border border-border-color px-4 py-3 shadow-sm">
        <p className="text-xs text-foreground leading-relaxed">{message}</p>
      </div>
    </div>
  );
};
