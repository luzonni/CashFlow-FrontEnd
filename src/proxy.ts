import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = [
    "/profile",
    "/dashboard",
    "/cashflow",
];
const AUTH_ROUTES = [
    "/login",
    "/register"
]

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    const isAuthRoute = AUTH_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute && !accessToken && !refreshToken) {
        const loginURL = new URL("/login", request.url);
        return NextResponse.redirect(loginURL);
    }

    if (isAuthRoute && accessToken && refreshToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/cashflow/:path*',
        '/login',
        '/register',
        '/'
    ]
}