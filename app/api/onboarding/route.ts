import { NextResponse } from 'next/server';
import { onboardingFormSchema } from '@/lib/onboarding/schema';
import { saveSubmission } from '@/lib/onboarding/repository';
import { OnboardingSubmission, OnboardingData } from '@/types/onboarding';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validatedData = onboardingFormSchema.parse(body);
    
    // Create submission record
    const submission: OnboardingSubmission = {
      id: `sub_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
      data: validatedData as unknown as OnboardingData,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Save to repository
    await saveSubmission(submission);
    
    return NextResponse.json({ success: true, submissionId: submission.id }, { status: 201 });
  } catch (error: unknown) {
    console.error('Submission error:', error);
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, error: 'Dữ liệu không hợp lệ', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Đã xảy ra lỗi hệ thống' }, { status: 500 });
  }
}
