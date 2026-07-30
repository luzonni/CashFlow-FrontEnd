import BalanceItem from "@models/Balance";
import { API } from "./API";
import authFetch from "./AuthFetch";
import ErrorHandler from "./ErrorHandler";
import DateRange from "@models/DateRange";
import { TransactionState } from "@models/Transaction";
import { CalendarDate } from "@internationalized/date";
import Balances from "@models/Balance";



async function getBalancesConfirm(range: DateRange): Promise<Record<string, Balances>> {
    const res = await authFetch(API.CASHIER.confirm(range.start.toString(), range.end.toString()), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Record<string, Balances> = await res.json();
    return data;
}

async function getBalancesPending(range: DateRange): Promise<Record<string, Balances>> {
    const res = await authFetch(API.CASHIER.pending(range.start.toString(), range.end.toString()), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Record<string, Balances> = await res.json();
    return data;
}

async function getBalances(month: number, year: number, state: TransactionState): Promise<Balances> {
    const yearMonth = `${year}-${String(month).padStart(2, "0")}`;
    const firstDay = new CalendarDate(year, month, 1);
    const lastDay = firstDay.add({ months: 1 }).subtract({ days: 1 });
    const range: DateRange = {
        start: firstDay,
        end: lastDay
    }
    switch (state) {
        case "PENDING": return (await getBalancesPending(range))[yearMonth];
        case "CONFIRM": return (await getBalancesConfirm(range))[yearMonth];
        default: throw new Error("Error");
    }
}

export default {
    balances: getBalances,
    confirm: getBalancesConfirm,
    pending: getBalancesPending
}