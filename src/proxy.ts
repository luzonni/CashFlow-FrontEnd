import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";

export function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname.startsWith('/login');
    const onAdminPanel = pathname.startsWith('/adm');
    const isRootRoute = pathname === '/';

    console.log(accessToken);
    console.log(refreshToken);

    if(isRootRoute) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if (!refreshToken && !isAuthRoute && !isRootRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (accessToken && (isAuthRoute || isRootRoute)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (accessToken && refreshToken && onAdminPanel) {
        try {
            const decoded: any = jwtDecode(accessToken);
            const roles = decoded.groups || [];

            if (!roles.includes("ADMIN")) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }

        } catch (e) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/', "/adm/:path*"]
}