import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')?.value;

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!adminToken || adminToken !== 'authenticated') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If going to /login but already authenticated, redirect to /admin
  if (request.nextUrl.pathname === '/login') {
    if (adminToken === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
