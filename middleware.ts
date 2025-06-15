import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'admin';
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isMembersRoute = req.nextUrl.pathname.startsWith('/members');

    // Redirect to signin if trying to access protected routes without authentication
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    // Redirect non-admin users trying to access admin routes
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/members', req.url));
    }

    // Allow access to members routes for authenticated users
    if (isMembersRoute) {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/members/:path*',
    '/profile/:path*'
  ],
}; 