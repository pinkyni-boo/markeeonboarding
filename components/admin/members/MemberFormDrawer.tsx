import React, { useState, useEffect } from 'react';
import { Member } from '@/types/member';
import { X, Save, Loader2, Trash2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface MemberFormDrawerProps {
  isOpen: boolean;
  onClose: (refresh?: boolean) => void;
  member: Member | null;
}

export const MemberFormDrawer = ({ isOpen, onClose, member }: MemberFormDrawerProps) => {
  const [formData, setFormData] = useState<Partial<Member>>({
    fullName: '', email: '', phone: '', role: 'sales', department: 'sales', status: 'active', canReceiveOnboarding: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (member) {
        setFormData(member);
      } else {
        setFormData({
          fullName: '', email: '', phone: '', role: 'sales', department: 'sales', status: 'active', canReceiveOnboarding: false
        });
      }
      setError('');
    }
  }, [isOpen, member]);

  const handleSave = async () => {
    if (!formData.fullName || !formData.email) {
      setError('Vui lòng nhập đầy đủ họ tên và email.');
      return;
    }

    setIsSaving(true);
    setError('');
    try {
      const url = member ? `/api/admin/members/${member.id}` : '/api/admin/members';
      const method = member ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save');
      onClose(true);
    } catch (e: any) {
      setError(e.message || 'Có lỗi xảy ra');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!member) return;
    if (!confirm('Bạn có chắc chắn muốn xoá thành viên này?')) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/members/${member.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      onClose(true);
    } catch (e: any) {
      setError(e.message || 'Không thể xoá thành viên này.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity" onClick={() => onClose()} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">
            {member ? 'Chi tiết thành viên' : 'Thêm thành viên mới'}
          </h2>
          <button onClick={() => onClose()} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Họ và tên *</label>
              <input 
                type="text" 
                value={formData.fullName} 
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Số điện thoại</label>
              <input 
                type="tel" 
                value={formData.phone || ''} 
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Vai trò</label>
                <select 
                  value={formData.role} 
                  onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="admin">Admin</option>
                  <option value="sales">Sales</option>
                  <option value="implementation">Implementation</option>
                  <option value="developer">Developer</option>
                  <option value="support">Support</option>
                  <option value="leader">Leader</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phòng ban</label>
                <select 
                  value={formData.department} 
                  onChange={e => setFormData({ ...formData, department: e.target.value as any })}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="sales">Sales</option>
                  <option value="dev">Dev</option>
                  <option value="implementation">Implementation</option>
                  <option value="cskh">CSKH</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Trạng thái</label>
              <select 
                value={formData.status} 
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="active">Đang hoạt động</option>
                <option value="locked">Đã khoá</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.canReceiveOnboarding}
                  onChange={e => setFormData({ ...formData, canReceiveOnboarding: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-slate-800">Cho phép nhận phân công Onboarding</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          {member ? (
            <button 
              onClick={handleDelete}
              disabled={isSaving}
              className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Xoá thành viên"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          ) : <div />}
          
          <div className="flex gap-3">
            <button 
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
