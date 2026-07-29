'use client';

import React, { useState } from 'react';
import { Building2, Users, Package, MessagesSquare, Store, Megaphone, CalendarClock } from 'lucide-react';
import { clsx } from 'clsx';
import { OnboardingData } from '@/types/onboarding';
import { chatChannelOptions, salesChannelOptions, adsChannelOptions, supportMethodOptions } from '@/lib/onboarding/options';

export const Section = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
      <Icon className="w-5 h-5 text-primary" />
      <h2 className="font-semibold text-slate-800">{title}</h2>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

export const Row = ({ label, value }: { label: string, value: React.ReactNode }) => {
  if (value === undefined || value === null || value === '') return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 py-3 border-b border-slate-50 last:border-0 last:pb-0">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-sm font-medium text-slate-900 sm:col-span-2">
        {Array.isArray(value) ? value.join(', ') : value}
      </div>
    </div>
  );
};

export const NestedCard = ({ title, obj }: { title: string, obj: Record<string, unknown> }) => {
  if (!obj || Object.keys(obj).length === 0) return null;
  const isEmpty = Object.values(obj).every(v => v === undefined || v === '');
  if (isEmpty) return null;
  
  return (
    <div className="mb-4 last:mb-0 bg-slate-50 border border-slate-200 rounded-lg p-4">
      <h4 className="font-semibold text-slate-800 mb-3">{title}</h4>
      {Object.entries(obj).map(([key, val]) => {
        if (val === undefined || val === '') return null;
        return <Row key={key} label={key} value={String(val)} />;
      })}
    </div>
  );
};

interface AdminDetailClientProps {
  data: OnboardingData;
}

const getLabel = (id: string, options: {id: string, label: string}[]) => options.find(o => o.id === id)?.label || id;

export const AdminDetailClient: React.FC<AdminDetailClientProps> = ({ data }) => {
  const formatProductLabel = (p: string) => {
    if (p === 'markeeChat') return 'Markee Chat';
    if (p === 'markeeSeeding') return 'Markee Seeding';
    if (p === 'markeeApp') return 'Markee App';
    return p;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* THÔNG TIN CHUNG */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Thông tin chung</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Section title="Thông tin doanh nghiệp" icon={Building2}>
              <Row label="Tên doanh nghiệp" value={data.company?.name} />
              <Row label="Thương hiệu" value={data.company?.brand} />
              <Row label="Website" value={data.company?.website} />
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Người liên hệ</h4>
                <Row label="Họ tên" value={data.company?.contactName} />
                <Row label="Email" value={data.company?.email} />
                <Row label="Số điện thoại" value={data.company?.phone} />
              </div>
            </Section>
          </div>
          <div className="space-y-6">
            <Section title="Sản phẩm đã chọn" icon={Package}>
              <Row label="Sản phẩm" value={data.selectedProducts?.map(formatProductLabel)} />
            </Section>
            {data.additionalNotes && (
              <Section title="Yêu cầu bổ sung" icon={Package}>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{data.additionalNotes}</p>
              </Section>
            )}
          </div>
        </div>
      </div>

      {/* MARKEE CHAT */}
      {(data.selectedProducts?.includes('markeeChat') || data.productData?.markeeChat) && (
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Chi tiết Markee Chat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Section title="Kênh Chat & CSKH" icon={MessagesSquare}>
                {data.productData?.markeeChat?.channels?.chat?.length ? (
                  <>
                    <Row label="Nền tảng" value={data.productData.markeeChat.channels.chat.map(c => getLabel(c, chatChannelOptions))} />
                    <div className="mt-4">
                      {Object.entries(data.productData.markeeChat.channelDetails?.chat || {}).map(([channelKey, details]) => (
                        <NestedCard key={channelKey} title={getLabel(channelKey, chatChannelOptions)} obj={details as Record<string, unknown>} />
                      ))}
                    </div>
                  </>
                ) : <p className="text-sm text-slate-500">Không có</p>}
              </Section>
            </div>
            
            <div className="space-y-6">
              <Section title="Kênh Bán hàng" icon={Store}>
                {data.productData?.markeeChat?.channels?.sales?.length ? (
                  <>
                    <Row label="Nền tảng" value={data.productData.markeeChat.channels.sales.map(c => getLabel(c, salesChannelOptions))} />
                    <div className="mt-4">
                      {Object.entries(data.productData.markeeChat.channelDetails?.sales || {}).map(([channelKey, details]) => (
                        <NestedCard key={channelKey} title={getLabel(channelKey, salesChannelOptions)} obj={details as Record<string, unknown>} />
                      ))}
                    </div>
                  </>
                ) : <p className="text-sm text-slate-500">Không có</p>}
              </Section>

              <Section title="Kênh Quảng cáo" icon={Megaphone}>
                {data.productData?.markeeChat?.channels?.ads?.length ? (
                  <>
                    <Row label="Nền tảng" value={data.productData.markeeChat.channels.ads.map(c => getLabel(c, adsChannelOptions))} />
                    <div className="mt-4">
                      {Object.entries(data.productData.markeeChat.channelDetails?.ads || {}).map(([channelKey, details]) => (
                        <NestedCard key={channelKey} title={getLabel(channelKey, adsChannelOptions)} obj={details as Record<string, unknown>} />
                      ))}
                    </div>
                  </>
                ) : <p className="text-sm text-slate-500">Không có</p>}
              </Section>
            </div>
          </div>
        </div>
      )}

      {/* MARKEE SEEDING */}
      {(data.selectedProducts?.includes('markeeSeeding') || data.productData?.markeeSeeding) && (
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Chi tiết Markee Seeding</h3>
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500">Dữ liệu Markee Seeding chưa có.</p>
          </div>
        </div>
      )}

      {/* MARKEE APP */}
      {(data.selectedProducts?.includes('markeeApp') || data.productData?.markeeApp) && (
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Chi tiết Markee App</h3>
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500">Dữ liệu Markee App chưa có.</p>
          </div>
        </div>
      )}

      {/* NHÂN SỰ & TRIỂN KHAI */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Nhân sự & Triển khai</h3>
        <div className="grid grid-cols-1 gap-6">
          <Section title="Danh sách nhân sự" icon={Users}>
            {data.staff?.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">Họ Tên</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Vai trò</th>
                      <th className="px-4 py-3">Sản phẩm</th>
                      <th className="px-4 py-3 rounded-tr-lg">Kênh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.staff.map((s, i) => (
                      <tr key={s.id || i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                        <td className="px-4 py-3 text-slate-500">{s.email || '-'}</td>
                        <td className="px-4 py-3 text-slate-600">{s.role}</td>
                        <td className="px-4 py-3 text-slate-600">{s.product ? formatProductLabel(s.product) : '-'}</td>
                        <td className="px-4 py-3 text-slate-600">{s.channels || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Chưa cung cấp thông tin nhân sự.</p>
            )}
          </Section>

          <Section title="Lịch triển khai" icon={CalendarClock}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <Row label="Hình thức hỗ trợ" value={data.deploymentSchedule?.supportMethods?.map(m => getLabel(m, supportMethodOptions))} />
              <Row label="Ngày mong muốn" value={data.deploymentSchedule?.preferredDate} />
              <Row label="Khung giờ" value={data.deploymentSchedule?.preferredTimeSlot} />
              <Row label="Giờ cụ thể" value={data.deploymentSchedule?.specificTime} />
              <Row label="Người tham gia" value={data.deploymentSchedule?.participants} />
              <Row label="Ghi chú" value={data.deploymentSchedule?.note} />
            </div>
          </Section>
        </div>
      </div>

    </div>
  );
};

