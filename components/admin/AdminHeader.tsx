'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const AdminHeader = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6 xl:px-8">
      {/* Left side: Mobile Toggle & Breadcrumb placeholder */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-700 xl:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* We can add Breadcrumbs here later if needed */}
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D7264E] rounded-full border border-white"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200"></div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-2 rounded-xl transition-colors text-left"
          >
            <img 
              src="https://i.pravatar.cc/150?u=admin_markee" 
              alt="Avatar" 
              className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 object-cover" 
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-slate-800">Admin Markee</span>
              <span className="text-xs text-slate-500">Quản trị hệ thống</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-slate-100 mb-2 sm:hidden">
                <span className="block text-sm font-semibold text-slate-800">Admin Markee</span>
                <span className="block text-xs text-slate-500">Quản trị hệ thống</span>
              </div>
              
              <Link href="/admin/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D7264E] transition-colors">
                <User className="w-4 h-4 text-slate-400" />
                Hồ sơ cá nhân
              </Link>
              
              <Link href="/admin/account" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D7264E] transition-colors">
                <Settings className="w-4 h-4 text-slate-400" />
                Cài đặt tài khoản
              </Link>
              
              <div className="h-px bg-slate-100 my-2"></div>
              
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D7264E] transition-colors text-left">
                <LogOut className="w-4 h-4 text-slate-400" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

