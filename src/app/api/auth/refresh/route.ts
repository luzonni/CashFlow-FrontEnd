import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookie = await cookies();
    const token = cookie.get('refreshToken')?.value;

    if (!token) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token })
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'invalid token' }, { status: 401 });
    }

    return res;
}