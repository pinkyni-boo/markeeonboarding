import React from 'react';
import { Clock, ShieldCheck, Edit3 } from 'lucide-react';

export const WelcomeStep: React.FC = () => {
  return (
    <div className="flex flex-col h-full min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex-1 flex flex-col items-center justify-center text-center w-full mx-auto relative z-10">
        
        {/* Logo Markee with slight gradient behind */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <img src="https://app.markeeai.com/markeeai_logo.svg" alt="Markee Logo" className="h-10 relative z-10" />
        </div>
        
        <h1 className="text-[32px] md:text-[40px] font-bold text-foreground mb-4 tracking-tight leading-tight">
          Chào mừng đến với Markee
        </h1>
        <h2 className="text-lg md:text-xl text-primary mb-6 font-medium">
          Cùng Markee chuẩn bị cho quá trình triển khai
        </h2>
        
        <p className="text-text-muted mx-auto max-w-[760px] mb-8 md:mb-16 text-[15px] md:text-[17px] leading-relaxed">
          Hoàn tất một vài thông tin để đội ngũ Markee chuẩn bị quá trình triển khai dành riêng cho doanh nghiệp của bạn.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left">
          
          <div className="bg-white hover:bg-slate-50 border border-border-color p-4 md:p-6 rounded-[20px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-row md:flex-col items-start gap-4 md:gap-0 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] rounded-bl-full transition-transform group-hover:scale-110" />
            <div className="shrink-0 w-12 h-12 bg-primary-light rounded-[14px] flex items-center justify-center md:mb-5 border border-primary/10 relative z-10">
              <Clock className="w-6 h-6 text-primary" strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-base md:text-lg mb-1 md:mb-2 relative z-10">Thời gian nhanh chóng</h4>
              <p className="text-sm text-text-muted leading-relaxed relative z-10">Chỉ mất khoảng 3–5 phút để hoàn thành bảng khảo sát.</p>
            </div>
          </div>
          
          <div className="bg-white hover:bg-slate-50 border border-border-color p-4 md:p-6 rounded-[20px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-row md:flex-col items-start gap-4 md:gap-0 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] rounded-bl-full transition-transform group-hover:scale-110" />
            <div className="shrink-0 w-12 h-12 bg-primary-light rounded-[14px] flex items-center justify-center md:mb-5 border border-primary/10 relative z-10">
              <Edit3 className="w-6 h-6 text-primary" strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-base md:text-lg mb-1 md:mb-2 relative z-10">Dễ dàng chỉnh sửa</h4>
              <p className="text-sm text-text-muted leading-relaxed relative z-10">Có thể quay lại các bước trước để cập nhật bất cứ lúc nào trước khi gửi.</p>
            </div>
          </div>
          
          <div className="bg-white hover:bg-slate-50 border border-border-color p-4 md:p-6 rounded-[20px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-row md:flex-col items-start gap-4 md:gap-0 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] rounded-bl-full transition-transform group-hover:scale-110" />
            <div className="shrink-0 w-12 h-12 bg-primary-light rounded-[14px] flex items-center justify-center md:mb-5 border border-primary/10 relative z-10">
              <ShieldCheck className="w-6 h-6 text-primary" strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-base md:text-lg mb-1 md:mb-2 relative z-10">Bảo mật thông tin</h4>
              <p className="text-sm text-text-muted leading-relaxed relative z-10">Thông tin chỉ phục vụ quá trình tư vấn và triển khai phần mềm cho bạn.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
