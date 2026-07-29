import { NextResponse } from 'next/server';
import { updateFormSettings } from '@/lib/admin/settingsRepository';

export async function PATCH(request: Request, props: { params: Promise<{ product: string }> }) {
  try {
    const params = await props.params;
    const { product } = params;
    const body = await request.json();
    
    const nextSettings = updateFormSettings(product, body);
    
    return NextResponse.json({ success: true, settings: nextSettings });
  } catch (error) {
    console.error(`Error updating form settings:`, error);
    return NextResponse.json({ error: 'Failed to update form settings' }, { status: 500 });
  }
}
