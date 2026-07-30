import Balance from "@models/Balance";
import { API } from "./API";
import authFetch from "./AuthFetch";
import ErrorHandler from "./ErrorHandler";
import DateRange from "@models/DateRange";

async function getBalance(range: DateRange): Promise<Balance> {
    const date: string = range.start.toString();
    const res = await authFetch(API.CASHIER.balance(date), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Balance = await res.json();
    return data;
}

async function getRevenues(range: DateRange): Promise<Balance> {
     const date: string = range.start.toString();
    const res = await authFetch(API.CASHIER.revenues(date), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Balance = await res.json();
    return data;
}

async function getExpenses(range: DateRange): Promise<Balance> {
     const date: string = range.start.toString();
    const res = await authFetch(API.CASHIER.expenses(date), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Balance = await res.json();
    return data;
}

export type PendingBalances = {
    INCOME?: Balance;
    EXPENSE?: Balance;
};

async function getPending(range: DateRange): Promise<PendingBalances> {
     const date: string = range.start.toString();
    const res = await authFetch(API.CASHIER.pending(date), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: PendingBalances = await res.json();
    return data;
}

export default {
    balance: getBalance,
    revenues: getRevenues,
    expenses: getExpenses,
    pending: getPending
}