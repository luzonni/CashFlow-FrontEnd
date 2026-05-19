import User from "@models/User";
import { API } from "@services/API";
import ErrorHandler from "./ErrorHandler";


async function login(email: string, password: string): Promise<User> {
    const res = await fetch(API.AUTH.login(), {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const user: User = await res.json()
    return user;
}

async function register(username: string, email: string, birthday: string, password: string) {
    const res = await fetch(API.AUTH.register(), {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, birthday, password })
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const user = await res.json();
    return user;
}

export default {
    login,
    register
}