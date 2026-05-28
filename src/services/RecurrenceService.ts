import Recurrence, { RecurrenceScheduling, RecurrenceStatus } from "@models/Recurrence";
import { TransactionType } from "@models/Transaction";
import authFetch from "./AuthFetch";
import { API } from "./API";
import ErrorHandler from "./ErrorHandler";

async function listAll(): Promise<Recurrence[]> {
    const res = await authFetch(API.RECURRENCE.main(), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Recurrence[] = await res.json();
    return data;
}

async function create(
    recurrence: {
        name: string;
        description: string;
        categoryId: number;
        paymentMethodId: number;
        type: TransactionType;
        amount: number;
        frequency: RecurrenceScheduling;
        interval: number;
        currency: string;
        firstRecord: string;
        maxOccurrences: number;
        timeZone: string;
    }
): Promise<Recurrence> {
    const res = await authFetch(API.RECURRENCE.main(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recurrence)
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Recurrence = await res.json();
    return data;
}

async function update(id: string, amount: number, status: RecurrenceStatus) {
    const res = await authFetch(API.RECURRENCE.byId(id), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "amount": amount, 
            "status": status
        })
    })
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
}

export default {
    list: listAll,
    create,
    update
}