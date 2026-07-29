import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === 'admin' && password === 'admin123') {
      const response = NextResponse.json({ success: true });
      
      // Set HTTP-only cookie
      response.cookies.set({
        name: 'admin_token',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Sai tài khoản hoặc mật khẩu' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Đã xảy ra lỗi' }, { status: 500 });
  }
}
