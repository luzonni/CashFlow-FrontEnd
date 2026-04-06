import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!accessToken || !refreshToken) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
    const res = await fetch(`${process.env.API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refreshToken })
    });
    if (!res.ok) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    return res;
}
