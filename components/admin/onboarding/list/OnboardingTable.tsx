import React from 'react';
import { OnboardingSubmission } from '@/types/onboarding';
import { format } from 'date-fns';
import { StatusBadge } from '@/components/admin/onboarding/detail/StatusBadge';
import { ProductBadge } from './ProductBadge';
import { ChannelBadges } from './ChannelBadges';
import { AssigneeSelect } from './AssigneeSelect';
import { OnboardingRowActions } from './OnboardingRowActions';
import { AdminEmptyState } from './AdminEmptyState';

interface TableProps {
  items: OnboardingSubmission[];
  isLoading: boolean;
  isFetching?: boolean;
  onRefresh: () => void;
}

export const OnboardingTable = React.memo(({ items, isLoading, isFetching, onRefresh }: TableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative min-h-[220px]">
      {/* Fetching loading bar */}
      {!isLoading && isFetching && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden z-10">
          <div className="h-full bg-primary/40 animate-[progress_1.5s_ease-in-out_infinite] w-1/3"></div>
        </div>
      )}

      <div className={`transition-opacity duration-200 ${!isLoading && isFetching ? 'opacity-50' : 'opacity-100'}`}>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm table-fixed min-w-[1100px]">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-4 font-semibold w-[100px]">Mã ID</th>
                <th className="px-4 py-4 font-semibold w-[240px]">Doanh nghiệp</th>
                <th className="px-4 py-4 font-semibold w-[160px] hidden md:table-cell">Sản phẩm</th>
                <th className="px-4 py-4 font-semibold w-[140px] hidden xl:table-cell">Kênh tích hợp</th>
                <th className="px-4 py-4 font-semibold w-[120px] hidden lg:table-cell">Quy mô</th>
                <th className="px-4 py-4 font-semibold w-[160px]">Trạng thái</th>
                <th className="px-4 py-4 font-semibold w-[180px] hidden sm:table-cell">Phụ trách</th>
                <th className="px-4 py-4 font-semibold w-[150px] hidden lg:table-cell">Ngày gửi</th>
                <th className="px-4 py-4 font-semibold w-[100px] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-slate-500 font-medium">Đang tải dữ liệu...</p>
                    </div>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <AdminEmptyState />
              ) : (
                items.map((sub: OnboardingSubmission) => {
                  const companyName = sub.data.company?.name || 'Khách hàng chưa đặt tên';
                  const isSuspicious = companyName.length <= 2 && companyName.toLowerCase() === 'f';
                  
                  // Collect channels
                  const chatChannels = sub.data.productData?.markeeChat?.channels?.chat || [];
                  const salesChannels = sub.data.productData?.markeeChat?.channels?.sales || [];
                  const adsChannels = sub.data.productData?.markeeChat?.channels?.ads || [];
                  const allChannels = [...chatChannels, ...salesChannels, ...adsChannels];

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-4 py-4">
                        <span className="font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100 truncate inline-block max-w-[80px]">
                          #{sub.id.substring(0, 8)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900 flex items-center gap-2">
                          {isSuspicious ? (
                            <span className="text-slate-500 italic truncate w-full">Dữ liệu chưa đầy đủ</span>
                          ) : (
                            <>
                              <div className="w-6 h-6 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                                {companyName.charAt(0).toUpperCase()}
                              </div>
                              <span className="truncate flex-1">{companyName}</span>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-col gap-0.5">
                          <span className="truncate w-full">{sub.data.company?.email || sub.data.company?.contactName || '-'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {sub.data.selectedProducts?.map(p => (
                            <ProductBadge key={p} product={p} />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden xl:table-cell">
                        <ChannelBadges channels={allChannels} />
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell text-slate-700 truncate">
                        {sub.data.staff?.length ? `${sub.data.staff.length} người dùng` : <span className="text-slate-400 italic">Chưa có</span>}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={sub.status} />
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <AssigneeSelect 
                          id={sub.id} 
                          initialAssignee={sub.admin_meta?.assignee} 
                        />
                      </td>
                      <td className="px-4 py-4 text-slate-600 hidden lg:table-cell truncate">
                        {format(new Date(sub.createdAt), 'dd/MM/yyyy')}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <OnboardingRowActions submission={sub} onRefresh={onRefresh} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden divide-y divide-slate-100">
          {isLoading ? (
            <div className="px-6 py-24 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Đang tải dữ liệu...</p>
              </div>
            </div>
          ) : items.length === 0 ? (
            <AdminEmptyState />
          ) : (
            items.map((sub: OnboardingSubmission) => {
              const companyName = sub.data.company?.name || 'Khách hàng chưa đặt tên';
              const isSuspicious = companyName.length <= 2 && companyName.toLowerCase() === 'f';
              
              return (
                <div key={sub.id} className="p-4 flex flex-col gap-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-xs truncate max-w-[80px]">
                          #{sub.id.substring(0, 8)}
                        </span>
                        <StatusBadge status={sub.status} />
                      </div>
                      <div className="font-medium text-slate-900 line-clamp-2">
                        {isSuspicious ? <span className="text-slate-500 italic">Dữ liệu chưa đầy đủ</span> : companyName}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 truncate">
                        {sub.data.company?.email || sub.data.company?.contactName || '-'}
                      </div>
                    </div>
                    <div className="shrink-0 -mt-1 -mr-1">
                      <OnboardingRowActions submission={sub} onRefresh={onRefresh} />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {sub.data.selectedProducts?.map(p => (
                      <ProductBadge key={p} product={p} />
                    ))}
                  </div>
                  <div className="mt-1 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="text-slate-400">Phụ trách:</span>
                      <span className="font-medium text-slate-700">{sub.admin_meta?.assigneeName || 'Chưa có'}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {format(new Date(sub.createdAt), 'dd/MM/yyyy')}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
});

