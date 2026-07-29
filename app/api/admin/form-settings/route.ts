import { NextResponse } from 'next/server';
import { getFormSettings } from '@/lib/admin/settingsRepository';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = getFormSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching form settings:', error);
    return NextResponse.json({ error: 'Failed to fetch form settings' }, { status: 500 });
  }
}
