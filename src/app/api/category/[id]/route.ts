import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    if (!id) {
        return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }
    const response = await fetch(`${process.env.API_URL}/category/${id}`, {
        method: "DELETE"
    })
    return response;
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const data = await request.json();
    if (!id) {
        return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }
    const response = await fetch(`${process.env.API_URL}/category/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response;
}