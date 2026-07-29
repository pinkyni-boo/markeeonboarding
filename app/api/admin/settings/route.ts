import { NextResponse } from 'next/server';
import { getSystemSettings, updateSystemSettings } from '@/lib/admin/settingsRepository';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = getSystemSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const nextSettings = updateSystemSettings(body);
    return NextResponse.json({ success: true, settings: nextSettings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
