
export async function POST() {
    const res = await fetch(`${process.env.API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    return res;
}
