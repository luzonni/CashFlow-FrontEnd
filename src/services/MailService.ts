import { API } from "./API";
import authFetch from "./AuthFetch"
import ErrorHandler from "./ErrorHandler";


async function send() {
    const res = await authFetch(API.MAIL.main(), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    //TODO retorno!
    return res;
}

export default {
    send
}