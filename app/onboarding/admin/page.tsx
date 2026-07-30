import { getSubmissions } from '@/lib/onboarding/repository';
import { OnboardingSubmission } from '@/types/onboarding';
import Link from 'next/link';

export default async function AdminPage() {
  const submissions = await getSubmissions();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Mới</span>;
      case 'reviewing': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Đang xử lý</span>;
      case 'in_progress': return <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">Đang triển khai</span>;
      case 'completed': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Hoàn thành</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Quản trị viên - Danh sách triển khai</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
                  <th className="p-4 whitespace-nowrap">ID</th>
                  <th className="p-4 whitespace-nowrap">Doanh nghiệp</th>
                  <th className="p-4 whitespace-nowrap">Sản phẩm</th>
                  <th className="p-4 whitespace-nowrap">Trạng thái</th>
                  <th className="p-4 whitespace-nowrap">Ngày gửi</th>
                  <th className="p-4 whitespace-nowrap">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Chưa có dữ liệu triển khai nào.
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub: OnboardingSubmission) => (
                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-slate-500 font-mono text-xs">{sub.id}</td>
                      <td className="p-4">
                        <div className="font-medium text-slate-900">{sub.data.company.name}</div>
                        <div className="text-slate-500 text-xs mt-1">{sub.data.company.contactName} - {sub.data.company.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {sub.data.selectedProducts?.map(p => (
                            <span key={p} className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600">
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(sub.status)}
                      </td>
                      <td className="p-4 text-slate-500">
                        {new Date(sub.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-4">
                        <Link 
                          href={`/onboarding/admin/${sub.id}`}
                          className="text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                          Chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
