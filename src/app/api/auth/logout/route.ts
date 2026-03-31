import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (token) {
        try {
            await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refreshToken: token })
            });
        } catch (error) {
            console.error("Erro ao invalidar token no backend:", error);
        }
    }
    const response = NextResponse.json({ success: true });
    response.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 0
    });
    response.cookies.set("accessToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 0
    });
    return response;
}