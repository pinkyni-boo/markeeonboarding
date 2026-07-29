import { NextRequest, NextResponse } from 'next/server';
import { getMembers, createMember } from '@/lib/admin/members-repository';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const role = searchParams.get('role') || '';
    const department = searchParams.get('department') || '';
    const status = searchParams.get('status') || '';
    const canReceiveOnboarding = searchParams.get('canReceiveOnboarding');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    const allMembers = await getMembers();

    let filtered = allMembers.filter(m => {
      if (search && !m.fullName.toLowerCase().includes(search) && !m.email.toLowerCase().includes(search)) return false;
      if (role && m.role !== role) return false;
      if (department && m.department !== department) return false;
      if (status && m.status !== status) return false;
      if (canReceiveOnboarding !== null && m.canReceiveOnboarding.toString() !== canReceiveOnboarding) return false;
      return true;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);
    
    // Sort logic placeholder (default by createdAt desc)
    paginatedItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const summary = {
      total: allMembers.length,
      active: allMembers.filter(m => m.status === 'active').length,
      assignable: allMembers.filter(m => m.canReceiveOnboarding).length,
      locked: allMembers.filter(m => m.status === 'locked').length,
    };

    return NextResponse.json({
      items: paginatedItems,
      total,
      page,
      pageSize,
      totalPages,
      summary
    });
  } catch (error) {
    console.error('Members GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newMember = await createMember(body);
    return NextResponse.json(newMember);
  } catch (error) {
    console.error('Members POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
