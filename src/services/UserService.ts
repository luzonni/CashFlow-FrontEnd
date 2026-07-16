import User from "@models/User";
import ErrorHandler from "./ErrorHandler";
import { API } from "./API";
import authFetch from "./AuthFetch";
import { CODE } from "@models/Config";
import Amount from "@models/Amount";


async function fetchUser(): Promise<User> {
    const res = await authFetch(API.AUTH.me(), {
        method: "GET"
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: User = await res.json()
    return data;
}

async function getAmount(): Promise<Amount> {
    const res = await authFetch(API.USER.amount(), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Amount = await res.json();
    return data;
}

async function setSettings(code: CODE, value: string) {
    const res = await authFetch(API.USER.SETTINGS.main(), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ [code]: value })
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
}

async function logout() {
    const res = await authFetch(API.AUTH.logout(), {
        method: "POST"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
}

export default {
    fetch: fetchUser,
    logout,
    setSettings,
    getAmount
}