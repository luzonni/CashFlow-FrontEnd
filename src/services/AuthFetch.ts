import { API } from "@services/API";

export default async function authFetch(url: string, options?: RequestInit) {
    let res = await fetch(url, {
        ...options,
        credentials: 'include'
    });
    if (res.status === 401) {
        const refreshRes = await fetch(API.AUTH.refresh(), {
            method: 'POST',
            credentials: 'include'
        });
        if (!refreshRes.ok) {
            const logoutRes = await fetch(API.AUTH.logout(), {
                method: 'POST',
                credentials: 'include'
            });
            return logoutRes;
        }
        res = await fetch(url, {
            ...options,
            credentials: 'include'
        });
    }
    return res;
}