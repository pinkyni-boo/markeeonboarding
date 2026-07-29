import { NextRequest, NextResponse } from 'next/server';
import { getMembers } from '@/lib/admin/members-repository';

export async function GET(req: NextRequest) {
  try {
    const allMembers = await getMembers();
    
    // Only return active members who can receive onboarding tasks
    const assignable = allMembers
      .filter(m => m.status === 'active' && m.canReceiveOnboarding)
      .map(m => ({
        id: m.id,
        fullName: m.fullName,
        email: m.email,
        role: m.role,
        avatarUrl: m.avatarUrl
      }));

    return NextResponse.json(assignable);
  } catch (error) {
    console.error('Assignable API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
