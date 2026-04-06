import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return NextResponse.json({ error: 'Login falhou' }, { status: 401 })
    }
    
    return response;
}