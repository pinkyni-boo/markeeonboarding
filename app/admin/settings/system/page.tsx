'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert('Lưu cài đặt thành công!');
      }
    } catch (e) {
      alert('Lỗi khi lưu cài đặt');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#D7264E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cài đặt hệ thống</h1>
          <p className="text-sm text-slate-500 mt-1">
            Cấu hình các thông số cơ bản cho hệ thống Onboarding
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Lưu thay đổi
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Thông tin hệ thống</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tên hệ thống</label>
              <input 
                type="text" 
                value={settings.systemName || ''} 
                onChange={(e) => handleChange('systemName', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tên hiển thị (Public)</label>
              <input 
                type="text" 
                value={settings.displayName || ''} 
                onChange={(e) => handleChange('displayName', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email hỗ trợ</label>
              <input 
                type="email" 
                value={settings.supportEmail || ''} 
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại hỗ trợ</label>
              <input 
                type="text" 
                value={settings.supportPhone || ''} 
                onChange={(e) => handleChange('supportPhone', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Cấu hình luồng Onboarding</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái mặc định khi tạo mới</label>
              <select 
                value={settings.defaultStatus || 'new'}
                onChange={(e) => handleChange('defaultStatus', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              >
                <option value="new">Mới tiếp nhận</option>
                <option value="reviewing">Đang xem xét</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Số ngày cảnh báo trễ hạn</label>
              <input 
                type="number" 
                value={settings.warningDays || 3} 
                onChange={(e) => handleChange('warningDays', parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.allowDraft || false}
                  onChange={(e) => handleChange('allowDraft', e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <span className="text-sm font-medium text-slate-700">Cho phép khách hàng lưu nháp</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.autoSave || false}
                  onChange={(e) => handleChange('autoSave', e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <span className="text-sm font-medium text-slate-700">Bật tính năng Auto-save khi điền form</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications || false}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <span className="text-sm font-medium text-slate-700">Gửi email thông báo cho Admin khi có Yêu cầu mới</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
