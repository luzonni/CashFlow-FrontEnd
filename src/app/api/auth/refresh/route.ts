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
        headers: {
            Cookie: `refreshToken=${token}`
        }
    });
    return res;
}