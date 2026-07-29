'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { StatusBadge } from '@/components/admin/onboarding/detail/StatusBadge';

export default function ReportsDetailPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch('/api/admin/reports/detail');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Error fetching detail reports', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, []);

  return (
    <div className="w-full pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Báo cáo chi tiết</h1>
          <p className="text-sm text-slate-500 mt-1">
            Tra cứu và phân tích số liệu sâu
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          Xuất CSV
        </button>
      </div>

      {loading && !data ? (
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#D7264E] animate-spin" />
        </div>
      ) : data ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Doanh nghiệp</th>
                  <th className="px-6 py-4 font-medium">Sản phẩm</th>
                  <th className="px-6 py-4 font-medium">Kênh</th>
                  <th className="px-6 py-4 font-medium">Người phụ trách</th>
                  <th className="px-6 py-4 font-medium">Ngày gửi</th>
                  <th className="px-6 py-4 font-medium">Ngày bắt đầu</th>
                  <th className="px-6 py-4 font-medium">Hoàn thành</th>
                  <th className="px-6 py-4 font-medium">Thời gian XL</th>
                  <th className="px-6 py-4 font-medium">Trạng thái</th>
                  <th className="px-6 py-4 font-medium">Ưu tiên</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-8 text-center text-slate-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  data.items.map((item: any) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                      onClick={() => router.push(`/admin/reports/detail/${item.id}`)}
                      title="Nhấn để xem báo cáo tiến độ"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-800 group-hover:text-primary transition-colors">{item.company}</td>
                      <td className="px-6 py-4 text-slate-600">{item.product}</td>
                      <td className="px-6 py-4 text-slate-600">{item.channel}</td>
                      <td className="px-6 py-4 text-slate-600">{item.assignedTo}</td>
                      <td className="px-6 py-4 text-slate-600">{item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy') : '-'}</td>
                      <td className="px-6 py-4 text-slate-600">{item.startDate ? format(new Date(item.startDate), 'dd/MM/yyyy') : '-'}</td>
                      <td className="px-6 py-4 text-slate-600">{item.completedDate ? format(new Date(item.completedDate), 'dd/MM/yyyy') : '-'}</td>
                      <td className="px-6 py-4 text-slate-600">{item.processTime}</td>
                      <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">{item.priority}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-red-500">Lỗi tải dữ liệu.</div>
      )}
    </div>
  );
}
