'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MoreHorizontal, Eye, Trash2 } from 'lucide-react';
import { OnboardingSubmission } from '@/types/onboarding';

interface RowActionsProps {
  submission: OnboardingSubmission;
  onRefresh: () => void;
}

export const OnboardingRowActions = ({ submission, onRefresh }: RowActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4, // 4px gap
        right: window.innerWidth - rect.right // align to right edge of button
      });
    }
    setIsOpen(!isOpen);
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/onboarding/${submission.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Delete failed');
      
      setIsOpen(false);
      setShowConfirm(false);
      onRefresh();
    } catch (e) {
      alert('Không thể xoá yêu cầu.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 relative">
      <Link 
        href={`/admin/onboarding/${submission.id}`}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-primary hover:border-primary transition-colors whitespace-nowrap"
      >
        <span>Xem chi tiết</span>
        <Eye className="w-4 h-4" />
      </Link>

      <button 
        ref={buttonRef}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleMenu(); }}
        className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && !showConfirm && (
        <div 
          ref={menuRef}
          style={{ position: 'fixed', top: menuPos.top, right: menuPos.right }}
          className="w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-[9999] py-1 overflow-hidden"
        >
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowConfirm(true); }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
          >
            <Trash2 className="w-4 h-4" />
            Xóa yêu cầu
          </button>
        </div>
      )}

      {showConfirm && (
        <div 
          style={{ position: 'fixed', top: menuPos.top, right: menuPos.right }}
          className="w-64 bg-white border border-red-200 rounded-xl shadow-lg z-[9999] p-3 overflow-hidden"
        >
          <p className="text-sm text-slate-700 mb-3 font-medium">Chắc chắn xóa yêu cầu này?</p>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowConfirm(false); setIsOpen(false); }}
              disabled={isDeleting}
              className="flex-1 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(); }}
              disabled={isDeleting}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              {isDeleting ? 'Đang xóa...' : 'Xác nhận'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
