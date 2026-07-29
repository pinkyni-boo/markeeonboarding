'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ADMIN_NAVIGATION } from '@/lib/admin/navigation';
import clsx from 'clsx';
import { LogOut, ChevronDown } from 'lucide-react';

export const AdminSidebar = ({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={clsx(
      "w-[260px] h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
    )}>
      
      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 hide-scrollbar flex flex-col">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-8 px-2 shrink-0">
          <img src="https://app.markeeai.com/markeeai_logo.svg" alt="Markee Logo" className="w-9 h-9 object-contain shrink-0" />
          <div className="flex flex-col">
            <span className="text-[22px] font-semibold text-[#D7264E] leading-none tracking-tight">Markee</span>
            <span className="text-[13px] text-[#2970B6] font-medium leading-tight mt-1">Admin Portal</span>
          </div>
        </div>
        
        {/* Navigation Groups */}
        <div className="flex flex-col gap-8 flex-1">
          {(() => {
            const allHrefs = ADMIN_NAVIGATION.flatMap(g => g.items.map(i => i.href));
            const bestMatch = allHrefs
              .filter(href => pathname === href || pathname.startsWith(href + '/'))
              .sort((a, b) => b.length - a.length)[0];

            return ADMIN_NAVIGATION.map((group) => (
              <div key={group.group}>
                <h3 className="text-xs uppercase font-semibold tracking-wide text-slate-400 mb-3 px-[14px]">
                  {group.group}
                </h3>
                <div className="flex flex-col gap-[6px]">
                  {group.items.map((item) => {
                    const isActive = item.href === bestMatch;

                  const Icon = item.icon;

                  return item.disabled ? (
                    <div 
                      key={item.name}
                      className="flex items-center gap-[12px] px-[14px] py-[10px] min-h-[44px] rounded-xl text-slate-400 cursor-not-allowed opacity-60"
                      title="Đang phát triển"
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                  ) : (
                    <Link 
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={clsx(
                        "flex items-center gap-[12px] px-[14px] py-[10px] min-h-[44px] rounded-xl transition-colors duration-200 group relative",
                        isActive 
                          ? "bg-[#FDECEE] text-[#D7264E]" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-[8px] bottom-[8px] w-1 bg-[#D7264E] rounded-r-md"></div>
                      )}
                      <Icon className={clsx(
                        "w-5 h-5 shrink-0 transition-colors duration-200",
                        isActive ? "text-[#D7264E]" : "text-slate-400 group-hover:text-slate-600"
                      )} />
                      <span className={clsx(
                        "text-sm",
                        isActive ? "font-semibold text-[#D7264E]" : "font-medium"
                      )}>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))})()}
        </div>
        
      </div>

    </div>
  );
};
