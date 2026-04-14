import User from "@models/User";
import { NextResponse } from 'next/server'

export async function GET() {
    const response = await fetch(`${process.env.API_URL}/auth/me`, {
        method: "GET",
        credentials: "include"
    })
    if (!response.ok) {
        return NextResponse.json({ error: 'invalid token' }, { status: 401 })
    }
    const user: User = await response.json()
    return NextResponse.json(user)
}