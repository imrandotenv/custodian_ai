import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = request.cookies.get('user_role')?.value;

  // Protect the /dashboard route: If role is tourist (or not set), redirect to /explore
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    if (!userRole || userRole === 'tourist') {
      const url = request.nextUrl.clone();
      url.pathname = '/explore';
      return NextResponse.redirect(url);
    }
  }

  // Protect the /admin route: If role is NOT admin, redirect them to /
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (userRole !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dashboard',
    '/admin/:path*',
    '/admin',
  ],
};
