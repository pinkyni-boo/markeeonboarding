'use client';

import React, { useState, useEffect } from 'react';
import { User, Loader2 } from 'lucide-react';
import { Member } from '@/types/member';

interface AssigneeDisplayProps {
  id: string;
  initialAssignee?: string;
}

export const AssigneeSelect = ({ id, initialAssignee }: AssigneeDisplayProps) => {
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      if (!initialAssignee) {
        setIsLoading(false);
        return;
      }
      
      // Check if legacy text or member id
      if (initialAssignee.startsWith('member_')) {
        try {
          const res = await fetch(`/api/admin/members/${initialAssignee}`);
          if (res.ok) {
            const data = await res.json();
            setMember(data);
          }
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoading(false);
    };

    fetchMember();
  }, [initialAssignee]);

  if (isLoading) {
    return <div className="text-slate-400 flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /></div>;
  }

  const displayName = member ? member.fullName : initialAssignee;
  const avatarUrl = member?.avatarUrl;

  return (
    <div className="flex items-center gap-2">
      {displayName ? (
        <>
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-full h-full rounded-full object-cover" />
            ) : (
              displayName.charAt(0).toUpperCase()
            )}
          </div>
          <span className="text-slate-700 text-xs font-medium truncate max-w-[100px]" title={displayName}>
            {displayName}
          </span>
        </>
      ) : (
        <>
          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-400 text-xs italic">Chưa phân công</span>
        </>
      )}
    </div>
  );
};
