import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // const accessToken = request.cookies.get("accessToken")?.value;
    // const refreshToken = request.cookies.get("refreshToken")?.value;
    // const { pathname } = request.nextUrl;

    // const isAuthRoute = pathname.startsWith('/login');
    // const isRootRoute = pathname === '/';

    // if(isRootRoute) {
    //     return NextResponse.redirect(new URL('/home', request.url));
    // }

    // if (!refreshToken && !isAuthRoute && !isRootRoute) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    // if (accessToken && (isAuthRoute || isRootRoute)) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    // matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/']
}