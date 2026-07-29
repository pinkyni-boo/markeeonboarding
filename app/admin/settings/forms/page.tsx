'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, MessageSquare, Megaphone, AppWindow } from 'lucide-react';
import { ProductSchemaEditor } from '@/components/admin/form-settings/ProductSchemaEditor';

const PRODUCTS = [
  { id: 'markee_chat', name: 'Markee Chat', icon: MessageSquare },
  { id: 'markee_seeding', name: 'Markee Seeding', icon: Megaphone },
  { id: 'markee_app', name: 'Markee App', icon: AppWindow },
];

export default function FormSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('markee_chat');

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/form-settings');
      if (res.ok) {
        const json = await res.json();
        setSettings(json);
      }
    } catch (error) {
      console.error('Error fetching form settings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveProduct = async (product: string, updates: any) => {
    try {
      const res = await fetch(`/api/admin/form-settings/${product}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        alert('Cập nhật cấu hình form thành công!');
        fetchSettings(); // Refresh
      }
    } catch (e) {
      alert('Lỗi khi lưu cấu hình');
    }
  };

  return (
    <div className="w-full pb-10 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cài đặt biểu mẫu</h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý cấu trúc form Onboarding theo từng sản phẩm
          </p>
        </div>
      </div>

      {loading && !settings ? (
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#D7264E] animate-spin" />
        </div>
      ) : settings ? (
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-[280px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex lg:flex-col gap-2 overflow-x-auto">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-2 hidden lg:block">Sản phẩm</div>
            {PRODUCTS.map(p => {
              const Icon = p.icon;
              const isActive = activeTab === p.id;
              const productSetting = settings[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left min-w-[200px] lg:min-w-0 ${
                    isActive ? 'bg-red-50 text-[#D7264E]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#D7264E]' : 'text-slate-400'}`} />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium whitespace-nowrap">{p.name}</span>
                    <span className="text-[11px] truncate mt-0.5 opacity-80">
                      {productSetting?.isActive ? 'Đang hoạt động' : 'Chưa cấu hình'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Editor Area */}
          <div className="flex-1 min-h-[600px] lg:min-h-0">
            <ProductSchemaEditor 
              key={activeTab} // Force remount on tab change to reset local state
              product={activeTab} 
              settings={settings[activeTab] || {}} 
              onSave={handleSaveProduct} 
            />
          </div>
        </div>
      ) : (
        <div className="text-red-500">Lỗi tải dữ liệu.</div>
      )}
    </div>
  );
}
