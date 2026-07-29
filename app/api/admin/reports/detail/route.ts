import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/onboarding/repository';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    
    let submissions = await getSubmissions();

    // In a real app we would filter here based on searchParams (status, product, etc)
    const total = submissions.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginated = submissions.slice((page - 1) * pageSize, page * pageSize);

    const { getMembers } = await import('@/lib/admin/members-repository');
    const members = await getMembers();

    // Map to detail report format
    const items = paginated.map(s => {
      let assigneeName = s.admin_meta?.assignee || 'Chưa phân công';
      if (s.admin_meta?.assignee) {
        const m = members.find(m => m.id === s.admin_meta?.assignee);
        if (m) assigneeName = m.fullName;
      }

      const startDate = s.admin_meta?.startDate || (s.status !== 'new' ? s.updatedAt : s.createdAt);
      const completedDate = s.admin_meta?.completedDate || (s.status === 'completed' ? s.updatedAt : null);
      let processTime = '-';
      
      if (startDate && completedDate) {
        const diffDays = Math.round((new Date(completedDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24));
        processTime = `${diffDays} ngày`;
      }

      return {
        id: s.id,
        company: s.data.company?.name || 'Unknown',
        product: s.data.selectedProducts?.join(', ') || 'N/A',
        channel: 'Markee Chat', // Simplified
        assignedTo: assigneeName,
        createdAt: s.createdAt,
        startDate: startDate,
        completedDate: completedDate,
        processTime: processTime,
        status: s.status,
        priority: s.admin_meta?.priority === 'high' ? 'Cao' : (s.admin_meta?.priority === 'low' ? 'Thấp' : 'Bình thường')
      };
    });

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages
    });
  } catch (error) {
    console.error('Error fetching detail report:', error);
    return NextResponse.json(
      { error: 'Không thể lấy dữ liệu báo cáo chi tiết.' },
      { status: 500 }
    );
  }
}
