import React from 'react';
import { Building2, Link as LinkIcon, Briefcase } from 'lucide-react';
import { OnboardingData } from '@/types/onboarding';

export const CompanySummaryCard = ({ company }: { company: OnboardingData['company'] }) => {
  if (!company) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-slate-500" />
        Thông tin doanh nghiệp
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Tên doanh nghiệp</div>
          <div className="font-medium text-slate-900">{company.name || 'Chưa cung cấp'}</div>
        </div>

        {company.contactChannel && (
          <div>
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Kênh liên hệ chính
            </div>
            <div className="text-slate-700">{company.contactChannel} - {company.contactId}</div>
          </div>
        )}

        {company.website && (
          <div>
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" /> Website
            </div>
            <a 
              href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {company.website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
