import { cookies } from "next/headers";

export async function POST() {
    const cookie = await cookies();
    const token = cookie.get('refreshToken')?.value;
    const res = await fetch(`${process.env.API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            Cookie: `refreshToken=${token}`
        }
    });
    return res;
}
