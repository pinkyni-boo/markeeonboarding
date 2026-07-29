'use client';

import React, { useEffect, useState } from 'react';
import { ReportCharts } from '@/components/admin/reports/ReportCharts';
import { Loader2, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ReportsOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('/api/admin/reports');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Error fetching reports', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="w-full pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Báo cáo tổng quan</h1>
          <p className="text-sm text-slate-500 mt-1">
            Tổng hợp các số liệu thống kê chung
          </p>
        </div>
      </div>
      
      {loading && !data ? (
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#D7264E] animate-spin" />
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-600">Tổng yêu cầu</span>
                <span className="text-2xl font-bold text-slate-900 mt-1">{data.summary.total}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><TrendingUp className="w-5 h-5" /></div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-600">Tỷ lệ hoàn thành</span>
                <span className="text-2xl font-bold text-emerald-600 mt-1">{data.summary.completionRate}%</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500"><CheckCircle className="w-5 h-5" /></div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-600">TG xử lý TB</span>
                <span className="text-2xl font-bold text-indigo-600 mt-1">{data.summary.avgProcessTime}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500"><Clock className="w-5 h-5" /></div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-600">Chờ khách phản hồi</span>
                <span className="text-2xl font-bold text-orange-600 mt-1">{data.summary.waitingLong}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><AlertCircle className="w-5 h-5" /></div>
            </div>
          </div>
          
          <ReportCharts charts={data.charts} />
        </>
      ) : (
        <div className="text-red-500">Lỗi tải dữ liệu.</div>
      )}
    </div>
  );
}
