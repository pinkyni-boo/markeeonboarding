import { NextResponse } from 'next/server';
import { updateSubmission } from '@/lib/onboarding/repository';

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;
    const body = await request.json();

    if (!body.assignedTo) {
      return NextResponse.json({ error: 'Thiếu thông tin người phụ trách' }, { status: 400 });
    }

    const { getSubmissions } = await import('@/lib/onboarding/repository');
    const allSubmissions = await getSubmissions();
    const existing = allSubmissions.find(s => s.id === id);

    const newActivity = {
      id: Date.now().toString(),
      type: 'assigned' as const,
      author: 'Hệ thống / Admin',
      content: `Đã phân công yêu cầu cho: ${body.assignedTo}`,
      createdAt: new Date().toISOString()
    };

    const currentActivities = existing?.admin_meta?.activities || [];

    await updateSubmission(id, {
      admin_meta: {
        assignee: body.assignedTo,
        activities: [newActivity, ...currentActivities]
      },
      status: 'reviewing' // Typically moves to reviewing when assigned
    });

    return NextResponse.json({ success: true, message: 'Phân công thành công' });
  } catch (error) {
    console.error('Error assigning task:', error);
    return NextResponse.json(
      { error: 'Không thể phân công công việc.' },
      { status: 500 }
    );
  }
}
