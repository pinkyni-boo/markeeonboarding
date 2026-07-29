'use client';

import React, { useState } from 'react';
import { Camera, Save, User } from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Admin Markee',
    email: 'admin@markee.vn',
    role: 'Quản trị hệ thống',
    phone: '0901234567',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đã lưu thông tin hồ sơ!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hồ sơ cá nhân</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý thông tin cá nhân của bạn</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <form onSubmit={handleSave} className="p-6 sm:p-8">
          
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-slate-100">
            <div className="relative group cursor-pointer">
              <img 
                src="https://i.pravatar.cc/150?u=admin_markee" 
                alt="Avatar" 
                className="w-24 h-24 rounded-full bg-slate-100 border border-slate-200 object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-slate-800 text-lg mb-1">Ảnh đại diện</h3>
              <p className="text-sm text-slate-500 mb-3 max-w-sm">
                Định dạng hỗ trợ: JPG, PNG hoặc GIF. Kích thước tối đa 2MB.
              </p>
              <div className="flex gap-3 justify-center sm:justify-start">
                <button type="button" className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">
                  Tải ảnh lên
                </button>
                <button type="button" className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
                  Xóa ảnh
                </button>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Họ và tên</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-slate-50 focus:bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500">Email không thể thay đổi</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Số điện thoại</label>
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Chức vụ</label>
              <input 
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button type="button" className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors">
              Hủy bỏ
            </button>
            <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Lưu thay đổi
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
