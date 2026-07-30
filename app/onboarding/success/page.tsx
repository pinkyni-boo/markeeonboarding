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
    <div className="bg-card border border-border-color rounded-2xl p-8 lg:p-12 shadow-sm max-w-2xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-4">Gửi thông tin thành công!</h1>
      <p className="text-text-muted mb-8 text-lg">
        Cảm ơn bạn đã cung cấp thông tin. Đội ngũ Markee sẽ liên hệ lại với bạn trong thời gian sớm nhất để thống nhất phương án triển khai.
      </p>

      {id && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-block mb-10">
          <p className="text-sm text-text-muted mb-1">Mã yêu cầu của bạn</p>
          <p className="font-mono text-foreground font-medium">{id}</p>
        </div>
      )}

      <div>
        <a 
          href="/onboarding" 
          className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-hover transition-colors shadow-sm"
        >
          <span>Trở về trang chủ Onboarding</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="relative z-10 border-b border-border-color bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-[1560px] items-center justify-between px-5 lg:px-8 2xl:px-10">
          <div className="flex items-center gap-4">
            <img src="https://app.markeeai.com/markeeai_logo.svg" alt="Markee Logo" className="h-8 w-auto" />
            <span className="text-lg font-bold text-foreground hidden sm:inline-block">Markee Onboarding</span>
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
              className="text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-2"
            >
              Liên hệ Markee
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
