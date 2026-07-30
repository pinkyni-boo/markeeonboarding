import { getSubmissions } from '@/lib/onboarding/repository';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function AdminDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const submissions = await getSubmissions();
  const submission = submissions.find(s => s.id === params.id);

  if (!submission) {
    notFound();
  }

  const { data, status, createdAt } = submission;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/onboarding/admin" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Link>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Chi tiết triển khai: {data.company.name}</h1>
            <p className="text-slate-500 text-sm mt-1">ID: {submission.id} • Ngày gửi: {new Date(createdAt).toLocaleString('vi-VN')}</p>
          </div>
          <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
            Trạng thái: {status}
          </span>
        </div>

        <div className="space-y-6">
          {/* Thông tin doanh nghiệp */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Thông tin doanh nghiệp</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500 block mb-1">Tên doanh nghiệp</span>
                <span className="font-medium text-slate-900">{data.company.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Người liên hệ</span>
                <span className="font-medium text-slate-900">{data.company.contactName}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Số điện thoại</span>
                <span className="font-medium text-slate-900">{data.company.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Email</span>
                <span className="font-medium text-slate-900">{data.company.email}</span>
              </div>
              {data.company.website && (
                <div className="md:col-span-2">
                  <span className="text-slate-500 block mb-1">Website</span>
                  <a href={data.company.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">{data.company.website}</a>
                </div>
              )}
            </div>
          </section>

          {/* Dịch vụ đăng ký */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Dịch vụ đăng ký</h2>
            <div className="flex flex-wrap gap-2">
              {data.selectedProducts?.map(p => (
                <span key={p} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                  {p}
                </span>
              ))}
            </div>
          </section>
          
          {/* Dữ liệu thô (Tạm thời) */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Dữ liệu chi tiết (Raw JSON)</h2>
            <pre className="bg-slate-50 p-4 rounded-lg overflow-x-auto text-xs text-slate-700 border border-slate-200">
              {JSON.stringify(data, null, 2)}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}
