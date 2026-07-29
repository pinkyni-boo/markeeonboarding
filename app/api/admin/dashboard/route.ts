import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/onboarding/repository';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const submissions = await getSubmissions();

    // Stats calculation
    const summary = {
      total: submissions.length,
      new: submissions.filter(s => s.status === 'new').length,
      inProgress: submissions.filter(s => s.status === 'reviewing' || s.status === 'in_progress').length,
      waitingCustomer: submissions.filter(s => s.status === 'waiting_customer').length,
      completed: submissions.filter(s => s.status === 'completed').length,
    };

    // Members calculation
    const { getMembers } = await import('@/lib/admin/members-repository');
    const membersList = await getMembers();

    const membersSummary = {
      total: membersList.length,
      assignable: membersList.length, // simplify
      unassignedTasks: submissions.filter(s => !s.admin_meta?.assignee).length
    };

    // Submissions over time
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
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

    // Product distribution
    const productStats = [
      { name: 'Markee Chat', value: submissions.filter(s => s.data.selectedProducts?.includes('markeeChat')).length },
      { name: 'Markee Seeding', value: submissions.filter(s => s.data.selectedProducts?.includes('markeeSeeding')).length },
      { name: 'Markee App', value: submissions.filter(s => s.data.selectedProducts?.includes('markeeApp')).length },
    ].filter(s => s.value > 0);
    
    // Status distribution
    const statusStats = [
      { name: 'Mới', value: summary.new },
      { name: 'Đang xử lý', value: summary.inProgress },
      { name: 'Chờ khách', value: summary.waitingCustomer },
      { name: 'Hoàn thành', value: summary.completed },
    ];

    // Recent submissions
    const recentSubmissions = submissions.slice(0, 5).map(item => {
      if (item.admin_meta?.assignee) {
        const m = membersList.find(m => m.id === item.admin_meta?.assignee);
        if (m) {
          return {
            ...item,
            admin_meta: {
              ...item.admin_meta,
              assigneeName: m.fullName
            }
          };
        }
      }
      return item;
    });

    return NextResponse.json({
      summary,
      membersSummary,
      charts: {
        trend: last7Days,
        products: productStats.length > 0 ? productStats : [{name: 'Trống', value: 1}],
        statuses: statusStats.some(s => s.value > 0) ? statusStats : [{name: 'Trống', value: 1}]
      },
      recentSubmissions
    });
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Không thể lấy dữ liệu dashboard.' },
      { status: 500 }
    );
  }
}
