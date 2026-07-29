import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/onboarding/repository';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30'; // 7, 30, 90, 365
    
    const submissions = await getSubmissions();

    // In a real scenario, we would filter by date range. Here we mock stats based on all data.
    const total = submissions.length;
    const completed = submissions.filter(s => s.status === 'completed').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const summary = {
      total,
      completionRate,
      avgProcessTime: '48 giờ', // Mocked
      waitingLong: submissions.filter(s => s.status === 'waiting_customer').length
    };

    // Chart data
    const trend = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });
      
      const count = submissions.filter(s => {
        const sDate = new Date(s.createdAt);
        return sDate.getDate() === d.getDate() && sDate.getMonth() === d.getMonth() && sDate.getFullYear() === d.getFullYear();
      }).length;

      return {
        name: dateStr,
        count: count,
      };
    });

    const productsStats = [
      { name: 'Markee Chat', value: submissions.filter(s => s.data.selectedProducts?.includes('markeeChat')).length },
      { name: 'Markee Seeding', value: submissions.filter(s => s.data.selectedProducts?.includes('markeeSeeding')).length },
      { name: 'Markee App', value: submissions.filter(s => s.data.selectedProducts?.includes('markeeApp')).length },
    ].filter(s => s.value > 0);

    const statuses = [
      { name: 'Mới', value: submissions.filter(s => s.status === 'new').length },
      { name: 'Đang xử lý', value: submissions.filter(s => s.status === 'reviewing' || s.status === 'in_progress').length },
      { name: 'Hoàn thành', value: completed },
    ].filter(s => s.value > 0);

    return NextResponse.json({
      summary,
      charts: {
        trend,
        products: productsStats.length > 0 ? productsStats : [{name: 'Trống', value: 1}],
        statuses: statuses.length > 0 ? statuses : [{name: 'Trống', value: 1}]
      }
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Không thể lấy dữ liệu báo cáo.' },
      { status: 500 }
    );
  }
}
