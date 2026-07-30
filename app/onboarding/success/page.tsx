'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setId(searchParams.get('id'));
  }, [searchParams]);

  return (
    <div className="bg-card border border-border-color rounded-2xl p-8 lg:p-12 shadow-sm max-w-xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Markee đã nhận được thông tin của bạn</h1>
      <p className="text-text-muted mb-8 text-base md:text-lg">
        Đội ngũ triển khai sẽ liên hệ trong vòng 24 giờ làm việc.
      </p>

      {id && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-block mb-8">
          <p className="text-sm text-text-muted mb-1">Mã yêu cầu</p>
          <p className="font-mono text-foreground font-medium text-lg tracking-wider">
            ONB-{new Date().getFullYear()}-{id.length > 5 ? id.substring(id.length - 5).toUpperCase() : id.toUpperCase()}
          </p>
        </div>
      )}

      <div className="text-left bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 mb-10 w-full max-w-md mx-auto">
        <h3 className="font-semibold text-foreground mb-4 md:mb-6">Việc tiếp theo</h3>
        <div className="space-y-3 md:space-y-4 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          <div className="relative flex items-center group">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-green-500 text-slate-50 shadow shrink-0 z-10">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 ml-3 md:ml-4 p-2.5 md:p-3 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">1. Đã nhận yêu cầu</span>
            </div>
          </div>
          <div className="relative flex items-center group">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-200 bg-slate-100 text-slate-500 shadow-sm shrink-0 z-10">
              <span className="text-xs font-medium">2</span>
            </div>
            <div className="flex-1 ml-3 md:ml-4 p-2.5 md:p-3 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">⏳ Kiểm tra thông tin</span>
            </div>
          </div>
          <div className="relative flex items-center group">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-200 bg-slate-100 text-slate-500 shadow-sm shrink-0 z-10">
              <span className="text-xs font-medium">3</span>
            </div>
            <div className="flex-1 ml-3 md:ml-4 p-2.5 md:p-3 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">📞 Liên hệ xác nhận</span>
            </div>
          </div>
          <div className="relative flex items-center group">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-200 bg-slate-100 text-slate-500 shadow-sm shrink-0 z-10">
              <span className="text-xs font-medium">4</span>
            </div>
            <div className="flex-1 ml-3 md:ml-4 p-2.5 md:p-3 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">🚀 Bắt đầu triển khai</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mb-8">
        <a 
          href="https://chat.markeeai.com/app/login" 
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex justify-center items-center space-x-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          <span>Mở Markee Chat</span>
          <ArrowRight className="w-5 h-5" />
        </a>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            if (typeof window !== 'undefined' && (window as any).MarkeeChat) {
              (window as any).MarkeeChat.open();
            } else {
              alert('Tính năng Live Chat đang được kết nối...');
            }
          }}
          className="w-full sm:w-auto inline-flex justify-center items-center space-x-2 bg-white text-primary border border-primary/20 px-8 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm"
        >
          <span>Liên hệ hỗ trợ</span>
        </button>

        <a 
          href="/onboarding" 
          className="mt-4 text-sm text-text-muted hover:text-primary transition-colors underline-offset-4 hover:underline"
        >
          Quay lại trang chủ
        </a>
      </div>

      <p className="mt-8 text-sm text-text-muted">
        Nếu cần hỗ trợ gấp, vui lòng liên hệ hotline <span className="font-semibold text-foreground">0765 055 708</span> hoặc mở <span className="font-semibold text-foreground whitespace-nowrap">Markee AI</span>.
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border-color bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-[1560px] items-center justify-between px-5 lg:px-8 2xl:px-10">
          <div className="flex items-center gap-3">
            <img src="https://app.markeeai.com/markeeai_logo.svg" alt="Markee Logo" className="h-7 md:h-8 w-auto" />
            <span className="text-base md:text-lg font-bold text-foreground inline-block">Markee Onboarding</span>
            <span className="hidden md:inline-block text-sm text-text-muted border-l border-border-color pl-4 ml-2">Thiết lập thông tin triển khai</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center gap-3 mr-2">
              <div className="text-right">
                <p className="text-xs text-text-muted">Cần hỗ trợ?</p>
                <p className="text-sm font-semibold text-foreground">0765 055 708</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-border-color">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=MarkeeSupport&backgroundColor=f8fafc" alt="Support Bot" className="w-full h-full object-cover p-1" />
              </div>
            </div>
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
              <span className="hidden md:inline">Chat với Markee AI</span>
              <span className="md:hidden">Mở Chat</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <Suspense fallback={<div className="animate-pulse bg-card h-64 w-full max-w-2xl rounded-2xl border border-border-color"></div>}>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
