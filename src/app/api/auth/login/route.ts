
export async function POST(req: Request) {
    const { email, password } = await req.json()

    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    return response;
}