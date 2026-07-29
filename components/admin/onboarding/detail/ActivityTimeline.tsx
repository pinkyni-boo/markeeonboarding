import React from 'react';
import { OnboardingSubmission } from '@/types/onboarding';
import { History, MessageSquareText } from 'lucide-react';
import { format } from 'date-fns';

export const ActivityTimeline = ({ submission }: { submission: OnboardingSubmission }) => {
  const activities = submission.admin_meta?.activities || [];
  
  // Fake some initial activity if empty to make it look nice
  const timeline = activities.length > 0 ? activities : [
    {
      id: '1',
      type: 'created',
      author: 'Hệ thống',
      content: 'Khách hàng gửi yêu cầu',
      createdAt: submission.createdAt
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <History className="w-5 h-5 text-slate-600" />
        Lịch sử hoạt động
      </h3>
      
      <div className="space-y-5 border-l-2 border-slate-100 ml-2 pl-4">
        {timeline.map(activity => (
          <div key={activity.id} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white ring-4 ring-white" />
            
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium text-sm text-slate-900">{activity.author}</span>
                <span className="text-xs text-slate-500 font-medium">{format(new Date(activity.createdAt), 'HH:mm · dd/MM')}</span>
              </div>
              <p className="text-sm text-slate-700 break-words mt-1">
                {activity.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
