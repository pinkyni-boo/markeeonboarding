import React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isSubmitting
}) => {
  return (
    <div className="mt-8 flex items-center justify-between gap-3 pt-6 border-t border-border-color">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 0 || isSubmitting}
        className={currentStep === 0 ? "hidden" : "flex flex-1 md:flex-none items-center justify-center space-x-1.5 md:space-x-2 px-3 md:px-6 h-11 md:h-12 rounded-xl md:rounded-[14px] text-sm md:text-base font-medium transition-colors border border-slate-300 bg-white text-foreground hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"}
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        <span>Quay lại</span>
      </button>

      <button
        type={currentStep === totalSteps - 1 ? 'submit' : 'button'}
        onClick={currentStep === totalSteps - 1 ? undefined : onNext}
        disabled={isSubmitting}
        className="flex flex-1 md:flex-none items-center justify-center space-x-1.5 md:space-x-2 px-4 md:px-8 h-11 md:h-12 rounded-xl md:rounded-[14px] text-sm md:text-base font-medium transition-colors bg-primary text-white hover:bg-primary-hover shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
            <span>Đang gửi...</span>
          </>
        ) : (
          <>
            <span>{currentStep === totalSteps - 1 ? 'Gửi thông tin' : 'Tiếp tục'}</span>
            {currentStep !== totalSteps - 1 && <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
          </>
        )}
      </button>
    </div>
  );
};
