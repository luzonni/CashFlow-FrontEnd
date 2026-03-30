import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return NextResponse.json({ error: 'Login falhou' }, { status: 401 })
    }

    const data = await response.json()

    const res = NextResponse.json({ success: true })

    res.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15 // 15 min
    })

    res.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 dias
    })

    return res
}