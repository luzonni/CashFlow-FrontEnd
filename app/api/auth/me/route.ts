import { cookies } from "next/headers"
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const cookie = await cookies();
    const token = cookie.get('accessToken')?.value

    if (!token) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const response = await fetch('http://localhost:8080/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return NextResponse.json({ error: 'invalid token' }, { status: 401 })
    }

    const user = await response.json()

    return NextResponse.json({ user })
}