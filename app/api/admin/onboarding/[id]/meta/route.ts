import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, updateSubmission } from '@/lib/onboarding/repository';
import { AdminMeta } from '@/types/onboarding';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const body = await req.json();
    const { status, admin_meta } = body;

    // Fetch existing
    const allSubmissions = await getSubmissions();
    const existing = allSubmissions.find(s => s.id === id);

    if (!existing) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const newMeta: AdminMeta = {
      ...(existing.admin_meta || {}),
      ...admin_meta,
    };

    // Update via repository
    await updateSubmission(id, {
      status: status || existing.status,
      admin_meta: newMeta
    });

    const { revalidatePath } = await import('next/cache');
    revalidatePath(`/admin/onboarding/${id}`);
    revalidatePath('/admin');
    revalidatePath('/admin/onboarding/all');

    return NextResponse.json({ success: true, admin_meta: newMeta, status: status || existing.status });
  } catch (error) {
    console.error('Update meta error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
