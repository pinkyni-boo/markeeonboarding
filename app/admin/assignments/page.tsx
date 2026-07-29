'use client';

import React, { useEffect, useState } from 'react';
import { WorkloadStats } from '@/components/admin/assignments/WorkloadStats';
import { UnassignedList } from '@/components/admin/assignments/UnassignedList';
import { AssignDrawer } from '@/components/admin/assignments/AssignDrawer';
import { Loader2 } from 'lucide-react';

export default function AssignmentsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/assignments');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error('Error fetching assignments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="w-full pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Phân công triển khai</h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý và phân công công việc cho các thành viên
          </p>
        </div>
      </div>
      
      {loading && !data ? (
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#D7264E] animate-spin" />
        </div>
      ) : data ? (
        <>
          <WorkloadStats workload={data.workload} />
          <UnassignedList items={data.unassigned} onAssign={setSelectedItem} />
        </>
      ) : (
        <div className="text-red-500">Lỗi tải dữ liệu.</div>
      )}

      <AssignDrawer 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        submission={selectedItem} 
        workload={data?.workload || []}
        onAssignSuccess={() => {
          fetchAssignments();
        }}
      />
    </div>
  );
}
