import { NextRequest, NextResponse } from 'next/server';
import { deleteSubmission } from '@/lib/onboarding/repository';
import { revalidatePath } from 'next/cache';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await deleteSubmission(id);

    // Invalidate caches
    revalidatePath('/admin');
    revalidatePath('/admin/onboarding/all');
    revalidatePath('/admin/reports/detail');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete submission error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
