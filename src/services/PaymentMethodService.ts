import PaymentMethod from "@models/PaymentMethod";
import { API } from "./API";
import authFetch from "./AuthFetch";
import ErrorHandler from "./ErrorHandler";


async function listPM(): Promise<PaymentMethod[]> {
    const res = await authFetch(API.PAYMENT_METHOD.main(), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: PaymentMethod[] = await res.json();
    return data;
}

async function createPM(color: string, name: string): Promise<PaymentMethod> {
    const res = await authFetch(API.PAYMENT_METHOD.main(), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ color, name })
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: PaymentMethod = await res.json();
    return data;
}

async function updatePM(id: number, color: string, name: string): Promise<PaymentMethod> {
    const res = await authFetch(API.PAYMENT_METHOD.byId(id), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ color, name })
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: PaymentMethod = await res.json();
    return data;
}

async function deletePM(id: number) {
    const res = await authFetch(API.PAYMENT_METHOD.byId(id), {
        method: "DELETE"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
}


export default {
    list: listPM,
    create: createPM,
    update: updatePM,
    delete: deletePM
};