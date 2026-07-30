import React from 'react';
import { ProgressSidebar, StepDefinition } from './ProgressSidebar';
import { HelpCircle, ShieldCheck } from 'lucide-react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStepIndex: number;
  steps: StepDefinition[];
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children, currentStepIndex, steps }) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary-light flex flex-col relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border-color bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-[1560px] items-center justify-between px-5 lg:px-8 2xl:px-10">
          <div className="flex items-center gap-3">
            <img src="https://app.markeeai.com/markeeai_logo.svg" alt="Markee Logo" className="h-7 md:h-8 w-auto" />
            <span className="text-base md:text-lg font-bold text-foreground inline-block">Markee Onboarding</span>
            <span className="hidden md:inline-block text-sm text-text-muted border-l border-border-color pl-4 ml-2">Thiết lập thông tin triển khai</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined' && (window as any).MarkeeChat) {
                  (window as any).MarkeeChat.open();
                } else {
                  alert('Tính năng Live Chat đang được kết nối...');
                }
              }}
              className="text-xs md:text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg shadow-sm flex items-center gap-2"
            >
              Liên hệ Markee
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 z-10 mx-auto w-full max-w-[1560px] px-5 lg:px-8 2xl:px-10 py-8 lg:py-12">
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          {/* Sidebar for Desktop */}
          <aside className="hidden lg:block relative z-20">
            <ProgressSidebar currentStepIndex={currentStepIndex} steps={steps} />
          </aside>
          
          {/* Sidebar/Progress for Mobile */}
          <div className="block lg:hidden relative z-20">
            <ProgressSidebar currentStepIndex={currentStepIndex} steps={steps} isMobile />
          </div>

          {/* Form Content */}
          <div className="min-w-0 relative z-20 w-full">
            <div className="w-full rounded-[24px] border border-border-color bg-white p-6 md:p-10 lg:p-12 shadow-sm min-h-[640px] flex flex-col relative overflow-hidden">
              {children}
            </div>

            {/* Secure watermark */}
            <div className="mt-8 flex items-center justify-center gap-2 text-text-muted text-sm pb-8">
              <ShieldCheck className="w-4 h-4" />
              <span>Thông tin của bạn được bảo mật tuyệt đối</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
