import PaymentMethod from "@models/PaymentMethod";
import { API } from "./API";
import authFetch from "./AuthFetch";
import ErrorHandler from "./ErrorHandler";


export async function list(): Promise<PaymentMethod[]> {
    const res = await authFetch(API.PAYMENT_METHOD.main(), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: PaymentMethod[] = await res.json();
    return data;
}


export default {
    list
};