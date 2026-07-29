'use client';

import React, { useState } from 'react';
import { Save, Settings, Shield, Bell } from 'lucide-react';

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState('security');
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đã cập nhật cài đặt!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cài đặt tài khoản</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý bảo mật và thông báo</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar Menu */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-100 p-6">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shrink-0 ${
                activeTab === 'security' 
                  ? 'bg-[#FDECEE] text-[#D7264E]' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-4 h-4" />
              Bảo mật & Mật khẩu
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shrink-0 ${
                activeTab === 'notifications' 
                  ? 'bg-[#FDECEE] text-[#D7264E]' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-4 h-4" />
              Thông báo
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8">
          <form onSubmit={handleSave}>
            
            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4 mb-6">
                  Đổi mật khẩu
                </h3>
                
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Mật khẩu hiện tại</label>
                    <input 
                      type="password"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-slate-50 focus:bg-white"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Mật khẩu mới</label>
                    <input 
                      type="password"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-slate-50 focus:bg-white"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Xác nhận mật khẩu mới</label>
                    <input 
                      type="password"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-slate-50 focus:bg-white"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Cập nhật mật khẩu
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4 mb-6">
                  Cài đặt thông báo
                </h3>
                
                <div className="space-y-6">
                  {/* Item */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">Email khi có yêu cầu mới</h4>
                      <p className="text-xs text-slate-500 mt-1">Nhận email ngay khi có khách hàng gửi form onboarding mới.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  {/* Item */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">Email phân công công việc</h4>
                      <p className="text-xs text-slate-500 mt-1">Nhận email khi bạn được giao phụ trách một dự án triển khai.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  {/* Item */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">Cập nhật hệ thống Markee</h4>
                      <p className="text-xs text-slate-500 mt-1">Nhận email về các tính năng mới và bảo trì hệ thống.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Lưu cài đặt
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
