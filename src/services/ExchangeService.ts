import { API } from "./API"
import authFetch from "./AuthFetch"
import ErrorHandler from "./ErrorHandler";


async function currency(): Promise<string[]> {
    const res = await authFetch(API.EXCHANGE.currency(), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: string[] = await res.json();
    return data;
}

export default {
    currency
}