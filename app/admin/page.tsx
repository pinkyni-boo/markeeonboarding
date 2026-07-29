'use client';

import React, { useEffect, useState } from 'react';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { DashboardCharts } from '@/components/admin/dashboard/DashboardCharts';
import { RecentSubmissions } from '@/components/admin/dashboard/RecentSubmissions';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Error fetching dashboard', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#D7264E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tổng quan</h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi các chỉ số quan trọng của hệ thống
          </p>
        </div>
      </div>
      
      {data && (
        <>
          <DashboardStats data={data} />
          <DashboardCharts data={data} />
          <RecentSubmissions items={data.recentSubmissions || []} />
        </>
      )}
    </div>
  );
}
