
const URL = `${process.env.API_URL}/category`;

export async function GET() {
    const response = await fetch(URL, {
        method: "GET"
    })
    return response;
}

export async function POST(req: Request) {
    const data = await req.json();
    const parsedData = {
        ...data,
        "parentId": data.parentId ? Number(data.parentId) : null
    };
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
    });
    return response;
}