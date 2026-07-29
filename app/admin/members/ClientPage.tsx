'use client';

import React, { useState, useEffect } from 'react';
import { Member } from '@/types/member';
import { Plus, Users, UserCheck, ShieldAlert, UserMinus } from 'lucide-react';
import { MembersTable } from '@/components/admin/members/MembersTable';
import { MembersFilters } from '@/components/admin/members/MembersFilters';
import { MemberFormDrawer } from '@/components/admin/members/MemberFormDrawer';
import { StatCard } from '@/components/admin/members/StatCard';

export default function MembersClientPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [summary, setSummary] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', role: '', status: '' });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/admin/members?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMembers(data.items || []);
        setSummary(data.summary || {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [filters]);

  const handleOpenDrawer = (member?: Member) => {
    setSelectedMember(member || null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = (refresh?: boolean) => {
    setIsDrawerOpen(false);
    setSelectedMember(null);
    if (refresh) fetchMembers();
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý thành viên</h1>
          <p className="text-slate-500 mt-1">Quản lý nhân sự nội bộ và quyền xử lý onboarding</p>
        </div>
        <button 
          onClick={() => handleOpenDrawer()}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm thành viên
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={Users} title="Tổng thành viên" value={summary.total || 0} 
          isActive={false} onClick={() => {}} colorClass="text-slate-600 bg-slate-100" 
        />
        <StatCard 
          icon={UserCheck} title="Đang hoạt động" value={summary.active || 0} 
          isActive={false} onClick={() => {}} colorClass="text-green-600 bg-green-100" 
        />
        <StatCard 
          icon={ShieldAlert} title="Có thể nhận việc" value={summary.assignable || 0} 
          isActive={false} onClick={() => {}} colorClass="text-blue-600 bg-blue-100" 
        />
        <StatCard 
          icon={UserMinus} title="Đã khoá" value={summary.locked || 0} 
          isActive={false} onClick={() => {}} colorClass="text-red-600 bg-red-100" 
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        {/* Filters */}
        <div className="p-4 border-b border-slate-100">
          <MembersFilters filters={filters} onChange={setFilters} />
        </div>

        {/* Table */}
        <MembersTable 
          members={members} 
          isLoading={isLoading} 
          onEdit={handleOpenDrawer}
          onRefresh={fetchMembers}
        />
      </div>

      <MemberFormDrawer 
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        member={selectedMember}
      />
    </div>
  );
}
