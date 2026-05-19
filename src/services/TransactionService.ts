import { DateRange } from "@heroui/react";
import Transaction from "@models/Transaction";
import authFetch from "./AuthFetch";
import { API } from "./API";
import LocalDate from "@models/LocalDate";
import ErrorHandler from "./ErrorHandler";

export type TransactionRequest = {
    description?: string;
    amount?: number;
    paymentMethodId?: number;
    type?: string;
    state?: string;
    categoryId?: number;
    date?: LocalDate;
    currency?: string;
}

export async function getTransactionsBetween(date: DateRange): Promise<Transaction[]> {
    const res = await authFetch(API.TRANSACTION.between(date.start.toString(), date.end.toString()), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Transaction[] = await res.json();
    return data;
}

export async function getById(id: string): Promise<Transaction> {
    const res = await authFetch(API.TRANSACTION.fing(id), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Transaction = await res.json();
    return data;
}

export async function createTransaction(request: TransactionRequest): Promise<Transaction> {
    const res = await authFetch(API.TRANSACTION.main(), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Transaction = await res.json();
    return data;
}

export async function updateTransaction(id: string, request: TransactionRequest): Promise<Transaction> {
    const res = await authFetch(API.TRANSACTION.byId(id), {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Transaction = await res.json();
    return data;
}