import React from 'react';
import { Mail, Phone, Copy, MessageCircle, Contact } from 'lucide-react';
import { OnboardingData } from '@/types/onboarding';

export const ContactCard = ({ company }: { company: OnboardingData['company'] }) => {
  if (!company) return null;

  const initials = company.contactName
    ? company.contactName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <Contact className="w-4 h-4 text-slate-500" />
        Người liên hệ
      </h3>
      
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
          {initials}
        </div>
        <div>
          <div className="font-semibold text-slate-900">{company.contactName || 'Chưa cung cấp'}</div>
          <div className="text-xs text-slate-500 mt-0.5">Người đại diện</div>
        </div>
      </div>

      <div className="space-y-3">
        {company.email && (
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-sm font-medium text-slate-700">{company.email}</div>
            </div>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => navigator.clipboard.writeText(company.email)} 
                className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                title="Copy email"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a 
                href={`mailto:${company.email}`} 
                className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                title="Gửi email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {company.phone && (
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-sm font-medium text-slate-700">{company.phone}</div>
            </div>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => navigator.clipboard.writeText(company.phone || '')} 
                className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                title="Copy số điện thoại"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a 
                href={`tel:${company.phone}`} 
                className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                title="Gọi điện"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href={`https://zalo.me/${company.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
                title="Mở Zalo"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
