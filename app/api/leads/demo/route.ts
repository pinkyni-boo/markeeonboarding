import { NextResponse } from 'next/server';
import { OnboardingRepository } from '@/lib/onboarding/repository';
import { OnboardingData } from '@/types/onboarding';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, name } = body;

    if (!email && !phone) {
      return NextResponse.json({ success: false, error: 'Thiếu email hoặc số điện thoại' }, { status: 400 });
    }

    // Mock an OnboardingData payload for the demo request
    const mockData: OnboardingData = {
      company: {
        name: name || 'Khách hàng Demo',
        contactName: name || 'Khách hàng Demo',
        email: email || '',
        phone: phone || '',
      },
      selectedProducts: ['markeeChat'],
      additionalNotes: 'Yêu cầu cấp tài khoản Demo từ Chatbot',
    };

    // Save to DB to track the lead
    const submissionId = await OnboardingRepository.createSubmission(mockData);

    // Generate a mock password
    const demoPassword = Math.random().toString(36).slice(-8);

    // Return the demo credentials to the Chatbot webhook
    return NextResponse.json({
      success: true,
      data: {
        submissionId,
        demoAccount: {
          username: email || phone,
          password: demoPassword,
          loginUrl: 'https://app.markeeai.com/login',
        },
        message: 'Tài khoản demo đã được tạo thành công'
      }
    });
  } catch (error: any) {
    console.error('Demo webhook error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
