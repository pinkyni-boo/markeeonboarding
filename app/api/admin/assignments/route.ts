import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/onboarding/repository';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const submissions = await getSubmissions();
    const { getMembers } = await import('@/lib/admin/members-repository');
    const TEAM_MEMBERS = await getMembers();
    
    // Unassigned submissions
    const unassigned = submissions.filter(s => !s.admin_meta?.assignee && s.status !== 'completed');
    
    // Assigned submissions
    const assigned = submissions.filter(s => s.admin_meta?.assignee);

    // Calculate workload per member
    const workload = TEAM_MEMBERS.map(member => {
      const activeTasks = assigned.filter(s => s.admin_meta?.assignee === member.id && s.status !== 'completed');
      return {
        id: member.id,
        name: member.fullName,
        email: member.email,
        role: member.role,
        capacity: 10, // Default capacity for now
        activeCount: activeTasks.length,
        isOverloaded: activeTasks.length >= 10
      };
    });

    return NextResponse.json({
      unassigned,
      workload
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Không thể lấy dữ liệu phân công.' },
      { status: 500 }
    );
  }
}
