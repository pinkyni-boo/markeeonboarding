import { NextRequest, NextResponse } from 'next/server';
import { getMemberById, updateMember, deleteMember } from '@/lib/admin/members-repository';
import { getSubmissions } from '@/lib/onboarding/repository';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const member = await getMemberById(id);
    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateMember(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // Check if member is assigned to any submission
    const submissions = await getSubmissions();
    const isAssigned = submissions.some(s => s.admin_meta?.assignee === id);
    
    if (isAssigned) {
      return NextResponse.json({ error: 'Cannot delete member because they are assigned to one or more onboarding requests.' }, { status: 400 });
    }

    const deleted = await deleteMember(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
