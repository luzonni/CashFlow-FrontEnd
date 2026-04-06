import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get("refreshToken")?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname.startsWith('/login');
    const isRootRoute = pathname === '/';

    if (!token && !isAuthRoute && !isRootRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && (isAuthRoute || isRootRoute)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/']
}