import React from 'react';
import { notFound } from 'next/navigation';
import { getSubmissions } from '@/lib/onboarding/repository';
import { AdminDetailLayout } from './AdminDetailLayout';

export default async function AdminOnboardingDetail({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Support both Next.js 14 (sync) and 15 (async) params
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  const submissions = await getSubmissions();
  const sub = submissions.find(s => s.id === id);
  
  if (!sub) return notFound();
  
  return <AdminDetailLayout submission={sub} />;
}

