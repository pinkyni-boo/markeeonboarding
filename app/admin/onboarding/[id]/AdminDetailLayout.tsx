'use client';

import React from 'react';
import { OnboardingSubmission } from '@/types/onboarding';
import { SubmissionHeader } from '@/components/admin/onboarding/detail/SubmissionHeader';
import { CompanySummaryCard } from '@/components/admin/onboarding/detail/CompanySummaryCard';
import { ContactCard } from '@/components/admin/onboarding/detail/ContactCard';
import { IntegrationChannelCard } from '@/components/admin/onboarding/detail/IntegrationChannelCard';
import { ProcessingSidebar } from '@/components/admin/onboarding/detail/ProcessingSidebar';
import { ImplementationChecklist } from '@/components/admin/onboarding/detail/ImplementationChecklist';
import { ActivityTimeline } from '@/components/admin/onboarding/detail/ActivityTimeline';
import { InternalNotes } from '@/components/admin/onboarding/detail/InternalNotes';
import { SubmissionSectionNav } from '@/components/admin/onboarding/detail/SubmissionSectionNav';
import { Users, CalendarClock, Package, MessagesSquare, Store, Megaphone, Building2, Contact, NotebookPen, History } from 'lucide-react';

export const AdminDetailLayout = ({ submission }: { submission: OnboardingSubmission }) => {
  const data = submission.data;

  const formatProductLabel = (p: string) => {
    if (p === 'markeeChat') return 'Markee Chat';
    if (p === 'markeeSeeding') return 'Markee Seeding';
    if (p === 'markeeApp') return 'Markee App';
    return p;
  };

  const hasChat = (data.productData?.markeeChat?.channels?.chat?.length ?? 0) > 0;
  const hasSales = (data.productData?.markeeChat?.channels?.sales?.length ?? 0) > 0;
  const hasAds = (data.productData?.markeeChat?.channels?.ads?.length ?? 0) > 0;
  const showMarkeeChatSection = hasChat || hasSales || hasAds;

  return (
    <div className="min-h-screen bg-white">
      <SubmissionHeader submission={submission} />
      <SubmissionSectionNav />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          
          {/* MAIN CONTENT AREA */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-10 min-w-0 pb-32">
            
            {/* A & B. Thông tin chung */}
            <section id="company" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-600" />
                Tổng quan
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <CompanySummaryCard company={data.company} />
                <ContactCard company={data.company} />
              </div>
            </section>

            <hr className="border-t border-slate-200" />

            {/* C. Sản phẩm đã mua */}
            <section id="products" className="scroll-mt-24">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-slate-600" />
                  Sản phẩm đăng ký
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.selectedProducts?.map(p => (
                    <span key={p} className="px-3 py-1.5 bg-red-50 text-primary border border-red-100 font-medium rounded-lg text-sm">
                      {formatProductLabel(p)}
                    </span>
                  ))}
                </div>
                {data.additionalNotes && (
                  <>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2 mt-6 flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-500" />
                      Yêu cầu bổ sung
                    </h3>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{data.additionalNotes}</p>
                  </>
                )}
              </div>
            </section>

            {/* D. Markee Chat */}
            {showMarkeeChatSection && (
              <>
                <hr className="border-t border-slate-200" />
                <section id="markee-chat" className="scroll-mt-24">
                  <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                    <MessagesSquare className="w-5 h-5 text-slate-600" />
                    Tích hợp các Kênh
                  </h2>
                <div className="space-y-8">
                  {hasChat && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <MessagesSquare className="w-4 h-4 text-slate-500" />
                        Kênh Chat & CSKH
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.productData?.markeeChat?.channels?.chat?.map(ch => (
                          <IntegrationChannelCard key={ch} platformId={ch} details={(data.productData?.markeeChat?.channelDetails?.chat as any)?.[ch] || {}} />
                        ))}
                      </div>
                    </div>
                  )}

                  {hasSales && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Store className="w-4 h-4 text-slate-500" />
                        Kênh Bán hàng & TMĐT
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.productData?.markeeChat?.channels?.sales?.map(ch => (
                          <IntegrationChannelCard key={ch} platformId={ch} details={(data.productData?.markeeChat?.channelDetails?.sales as any)?.[ch] || {}} />
                        ))}
                      </div>
                    </div>
                  )}

                  {hasAds && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-slate-500" />
                        Tài khoản Quảng cáo
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.productData?.markeeChat?.channels?.ads?.map(ch => (
                          <IntegrationChannelCard key={ch} platformId={ch} details={(data.productData?.markeeChat?.channelDetails?.ads as any)?.[ch] || {}} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                </section>
              </>
            )}

            <hr className="border-t border-slate-200" />

            {/* E. Nhân sự sử dụng */}
            <section id="staff" className="scroll-mt-24">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-600" />
                  Danh sách nhân sự ({data.staff?.length || 0})
                </h3>
                {data.staff?.length ? (
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                        <tr>
                          <th className="px-5 py-3">Họ Tên</th>
                          <th className="px-5 py-3">Email</th>
                          <th className="px-5 py-3">Vai trò</th>
                          <th className="px-5 py-3">Sản phẩm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.staff.map((s, i) => (
                          <tr key={s.id || i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                            <td className="px-5 py-4 font-medium text-slate-900">{s.name}</td>
                            <td className="px-5 py-4 text-slate-600">{s.email || '-'}</td>
                            <td className="px-5 py-4 text-slate-600">
                              <span className="px-2 py-1 bg-slate-100 rounded text-xs">{s.role}</span>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{s.product ? formatProductLabel(s.product) : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500">Chưa cung cấp thông tin nhân sự.</div>
                )}
              </div>
            </section>

            <hr className="border-t border-slate-200" />

            {/* F. Lịch triển khai */}
            <section id="schedule" className="scroll-mt-24">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-slate-600" />
                  Yêu cầu triển khai
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">Hình thức hỗ trợ</div>
                    <div className="text-slate-900 font-medium">
                      {data.deploymentSchedule?.supportMethods?.join(', ') || 'Chưa cung cấp'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">Ngày mong muốn</div>
                    <div className="text-slate-900 font-medium">{data.deploymentSchedule?.preferredDate || '-'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">Khung giờ</div>
                    <div className="text-slate-900 font-medium">
                      {data.deploymentSchedule?.preferredTimeSlot === 'specific' 
                        ? data.deploymentSchedule?.specificTime 
                        : data.deploymentSchedule?.preferredTimeSlot || '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">Thành phần tham gia</div>
                    <div className="text-slate-900 font-medium">{data.deploymentSchedule?.participants || '-'}</div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-t border-slate-200" />

            {/* G. Ghi chú nội bộ */}
            <section id="notes" className="scroll-mt-24">
              <InternalNotes submission={submission} />
            </section>

            <hr className="border-t border-slate-200" />

            {/* H. Lịch sử hoạt động */}
            <section id="activity" className="scroll-mt-24">
              <ActivityTimeline submission={submission} />
            </section>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="self-start lg:sticky lg:top-24 pb-24">
            <div className="space-y-6">
              <ProcessingSidebar submission={submission} />
              <ImplementationChecklist submission={submission} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

