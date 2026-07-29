'use client';

import React, { useState } from 'react';
import { Loader2, Save, ToggleLeft, ToggleRight, LayoutList } from 'lucide-react';
import { format } from 'date-fns';

export const ProductSchemaEditor = ({
  product,
  settings,
  onSave
}: {
  product: string;
  settings: any;
  onSave: (product: string, updates: any) => Promise<void>;
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: any) => {
    setLocalSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(product, localSettings);
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Cấu hình {localSettings.title || product}</h3>
          {localSettings.lastUpdated && (
            <p className="text-xs text-slate-500 mt-1">Cập nhật lần cuối: {format(new Date(localSettings.lastUpdated), 'dd/MM/yyyy HH:mm')}</p>
          )}
        </div>
        <button 
          onClick={() => handleChange('isActive', !localSettings.isActive)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            localSettings.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {localSettings.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
          {localSettings.isActive ? 'Đang hoạt động' : 'Tạm khóa'}
        </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề Form</label>
          <input 
            type="text" 
            value={localSettings.title || ''} 
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả ngắn</label>
          <textarea 
            rows={3}
            value={localSettings.description || ''} 
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Tổng số bước (Steps)</span>
            <span className="text-xl font-bold text-slate-900">{localSettings.steps || 0}</span>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Tổng số trường (Fields)</span>
            <span className="text-xl font-bold text-slate-900">{localSettings.fields || 0}</span>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl">
          <div className="text-center">
            <LayoutList className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-600 mb-1">Trình kéo thả (Form Builder) đang được phát triển.</p>
            <p className="text-xs text-slate-400">Bạn chỉ có thể chỉnh sửa cấu hình tĩnh trong phiên bản này.</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Lưu thay đổi cấu hình
        </button>
      </div>
    </div>
  );
};
