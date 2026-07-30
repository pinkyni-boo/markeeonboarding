import React from 'react';
import { Check, Headset } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface StepDefinition {
  id: string;
  label: string;
  subLabel?: string;
}

interface ProgressSidebarProps {
  currentStepIndex: number;
  steps: StepDefinition[];
  isMobile?: boolean;
}

export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({ currentStepIndex, steps, isMobile = false }) => {
  const displayStep = Math.max(0, currentStepIndex - 1);
  const progressPercent = Math.round((currentStepIndex / Math.max(1, steps.length - 1)) * 100);

  return (
    <div className="w-full shrink-0">
      <div className={twMerge(
        clsx(
          "bg-white/95 backdrop-blur-sm border border-border-color rounded-2xl shadow-sm flex flex-col",
          !isMobile ? "sticky top-8 p-6" : "p-4 relative z-30"
        )
      )}>
        {!isMobile && (
          <h2 className="text-base font-semibold text-foreground mb-6">Tiến trình thiết lập</h2>
        )}
        
        {/* Progress Bar */}
        <div className={!isMobile ? "mb-8" : ""}>
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="text-text-muted font-medium">Tiến độ thiết lập</span>
            <span className="font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs">Bước {Math.min(steps.length - 1, Math.max(1, currentStepIndex))} / {steps.length - 1}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>

        {!isMobile && (
          <div className="space-y-1 flex-1">
            {steps.slice(1).map((step, index) => { // slice(1) to skip 'welcome'
              const isCompleted = index < displayStep;
              const isActive = index === displayStep && currentStepIndex > 0;

              return (
                <div 
                  key={step.id}
                  className={twMerge(
                    clsx(
                      'flex items-start space-x-3 py-2 px-3 rounded-xl transition-all duration-300',
                      isActive ? 'bg-primary-light' : 'bg-transparent'
                    )
                  )}
                >
                  <div 
                    className={twMerge(
                      clsx(
                        'flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium border transition-colors shrink-0 mt-0.5',
                        isCompleted ? 'bg-green-500 border-green-500 text-white shadow-sm' : 
                        isActive ? 'border-primary bg-primary text-white shadow-sm' : 
                        'border-slate-200 text-slate-400 bg-white'
                      )
                    )}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : (index + 1)}
                  </div>
                  <div className="flex flex-col">
                    <span 
                      className={twMerge(
                        clsx(
                          'text-sm transition-colors',
                          isActive ? 'font-semibold text-primary' : 
                          isCompleted ? 'font-medium text-foreground' : 
                          'font-medium text-slate-400'
                        )
                      )}
                    >
                      {step.label}
                    </span>
                    {step.subLabel && (
                      <span className={clsx("text-xs mt-0.5", isActive ? "text-primary/70" : "text-text-muted")}>
                        {step.subLabel}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Support block */}
        {!isMobile && (
          <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-border-color">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Headset className="w-5 h-5" />
              <h4 className="font-semibold text-sm">Cần hỗ trợ?</h4>
            </div>
            <p className="text-xs text-text-muted mb-4">
              Đội ngũ Markee luôn sẵn sàng hỗ trợ bạn trong quá trình thiết lập.
            </p>
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined' && (window as any).MarkeeChat) {
                  (window as any).MarkeeChat.open();
                } else {
                  alert('Tính năng Live Chat đang được kết nối...');
                }
              }}
              className="block w-full text-center py-2 px-4 rounded-lg border border-primary/20 text-primary bg-white text-sm font-medium hover:bg-primary-light transition-colors"
            >
              Liên hệ ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
