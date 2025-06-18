// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define route types
const publicRoutes = ['/admin-login'];
const protectedRoutes = ['/admin'];
// Routes not listed in either array are considered global and accessible to all

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get session token
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!session;

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Check if the path is a public route (auth, register, etc.)
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Redirect logic based on authentication status and route type
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to auth if trying to access protected route without authentication
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    // Redirect to profile if trying to access public route while authenticated
    return NextResponse.redirect(new URL('/admin/spin-control', request.url));
  }

  // Continue for global routes or properly authenticated routes
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Apply to all routes except API routes, static files, etc.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
