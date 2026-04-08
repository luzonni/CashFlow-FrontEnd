import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { username, email, birthday, password } = await req.json()
    const res = await fetch(`${process.env.API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username,
            email,
            birthday, 
            password 
        })
    })
    return res;
}