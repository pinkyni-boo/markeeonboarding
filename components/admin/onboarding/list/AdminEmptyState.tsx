import React from 'react';
import Link from 'next/link';
import { FileSearch, Copy } from 'lucide-react';

export const AdminEmptyState = () => {
  const formUrl = 'http://localhost:3004/onboarding'; // In real app, this might be from env

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formUrl);
    alert('Đã copy link form Onboarding!');
  };

  return (
    <tr>
      <td colSpan={9} className="px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 text-slate-400 mb-5 border border-slate-100 shadow-sm">
          <FileSearch className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Không tìm thấy yêu cầu nào</h3>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          Hiện tại chưa có form đăng ký nào khớp với điều kiện lọc, hoặc hệ thống chưa nhận được yêu cầu mới từ khách hàng.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy Link Form
          </button>
          <Link 
            href="/onboarding"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
          >
            Mở Form Đăng Ký
          </Link>
        </div>
      </td>
    </tr>
  );
};
