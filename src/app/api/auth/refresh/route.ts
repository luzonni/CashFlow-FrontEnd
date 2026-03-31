import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookie = await cookies();
    const token = cookie.get('refreshToken')?.value;

    if (!token) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const response = await fetch('http://localhost:8080/auth/refresh', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token })
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'invalid token' }, { status: 401 });
    }

    const data = await response.json();

    const res = NextResponse.json({ success: true });

    if (!data?.accessToken || !data?.refreshToken) {
        return NextResponse.json({ error: 'invalid backend response' }, { status: 500 });
    }

    res.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15
    });

    res.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
    });

    return res;
}