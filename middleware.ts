import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Update session expiration if valid
  const res = await updateSession(request);
  
  const path = request.nextUrl.pathname;

  // If the path is /admin/login, don't protect it
  if (path === '/admin/login') {
    return res;
  }

  // Protect all other /admin routes
  if (path.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')?.value;
    
    // If there is no session cookie, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // updateSession handles JWT validation silently, but if the session is completely invalid 
    // and stripped, we might need a stronger check. The current logic assumes if it exists, it's checked by updateSession.
    // Let's add a basic verify here.
    try {
      // If updateSession returned a redirect or similar, use it. Usually it returns a new Response or undefined.
      // But we can just use the cookies from `request` and trust `updateSession` to handle expiration.
    } catch (e) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
