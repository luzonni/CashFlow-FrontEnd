import Category from "@models/Category";
import GroupCategory from "@models/GroupCategory";
import Installment from "@models/Installment";
import LocalDate from "@models/LocalDate";
import MonthPeriod from "@models/MonthPeriod";
import PaymentMethod from "@models/PaymentMethod";
import Recurrence, { RecurrenceStatus } from "@models/Recurrence";
import Transaction from "@models/Transaction";
import { Dispatch, SetStateAction } from "react";

// Transactions ===================================================

export function handlerPutTransactions(
    period: MonthPeriod,
    setTransactions: Dispatch<SetStateAction<Transaction[]>>,
    value: Transaction
) {
    function isBetween(date: LocalDate, period: MonthPeriod): boolean {
        if (!period)
            return true;
        const targetMonth = date.split("-")[1];
        const targetYear = date.split("-")[0];
        return Number(targetMonth) === period.month && Number(targetYear) === period.year;
    }
    if (!isBetween(value.date, period)) {
        return;
    }
    setTransactions((prev) => [
        ...prev,
        value
    ].sort((a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    ));
}

export function handlerPutAllTransactions(
    period: MonthPeriod,
    setTransactions: Dispatch<SetStateAction<Transaction[]>>,
    values: Transaction[]
) {
    function isBetween(date: LocalDate, period: MonthPeriod): boolean {
        if (!period)
            return true;
        const targetMonth = date.split("-")[1];
        const targetYear = date.split("-")[0];
        return Number(targetMonth) === period.month && Number(targetYear) === period.year;
    }
    const listOfPeriod = values.filter((tr) => isBetween(tr.date, period));
    setTransactions((prev) => [
        ...prev,
        ...listOfPeriod
    ].sort((a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    ));
}

export function handlerUpdateTransaction(
    dispatch: Dispatch<SetStateAction<Transaction[]>>,
    value: Transaction
) {
    dispatch((prev) => prev.map((t) =>
        t.id === value.id ?
            value
            :
            t
    ));
}

export function handlerDeleteTransaction(
    dispatch: Dispatch<SetStateAction<Transaction[]>>,
    id: string
) {
    dispatch((prev) => (
        prev.filter((t) => t.id !== id)
    ));
}

// Categories ===================================================

export function handlerPutCategory(
    dispatch: Dispatch<SetStateAction<GroupCategory[]>>,
    value: Category
) {
    dispatch((prev) => prev.map((g: GroupCategory) =>
        g.id === value.groupId
            ? {
                ...g,
                categories: [
                    ...g.categories,
                    value
                ]
            }
            : g
    ));
}

export function handlerUpdateCategory(
    dispatch: Dispatch<SetStateAction<GroupCategory[]>>,
    value: Category
) {
    dispatch((prev) => prev.map((g: GroupCategory) =>
        g.id === value.groupId
            ? {
                ...g,
                categories: g.categories.map((c: Category) =>
                    c.id === value.id
                        ? value :
                        c
                )
            }
            : g
    ));
}

export function handlerDeleteCategory(
    dispatch: Dispatch<SetStateAction<GroupCategory[]>>,
    value: Category
) {
    dispatch((prev) => prev.map((g: GroupCategory) =>
        g.id === value.groupId ?
            {
                ...g,
                categories: g.categories.filter(c => c.id !== value.id)
            }
            : g
    ));
}

// Groups of Categories =================================================


export function handlerPutGroupCategory(
    dispatch: Dispatch<SetStateAction<GroupCategory[]>>,
    value: GroupCategory
) {
    dispatch((prev) => [...prev, value]);
}

export function handlerUpdateGroupCategory(
    dispatch: Dispatch<SetStateAction<GroupCategory[]>>,
    value: GroupCategory
) {
    dispatch((prev) => prev.map((g: GroupCategory) =>
        g.id === value.id ?
            value
            : g
    ));
}

export function handlerDeleteGroupCategory(
    dispatch: Dispatch<SetStateAction<GroupCategory[]>>,
    value: GroupCategory
) {
    dispatch((prev) => prev.filter(g => g.id !== value.id));
}

// Payment Method ======================================================

export function handlerPutPaymentMethod(
    dispatch: Dispatch<SetStateAction<PaymentMethod[]>>,
    value: PaymentMethod
) {
    dispatch((prev) => [...prev, value]);
}

export function handlerUpdatePaymentMethod(
    dispatch: Dispatch<SetStateAction<PaymentMethod[]>>,
    value: PaymentMethod
) {
    dispatch((prev) => prev.map(pm =>
        pm.id === value.id ?
            value :
            pm
    ));
}

export function handlerDeletePaymentMethod(
    dispatch: Dispatch<SetStateAction<PaymentMethod[]>>,
    value: PaymentMethod
) {
    dispatch((prev) => prev.filter(pm => pm.id !== value.id));
}

// Recurrence ======================================================

export function handlerPutRecurrence(
    dispatch: Dispatch<SetStateAction<Recurrence[]>>,
    value: Recurrence
) {
    dispatch((prev) => [...prev, value]);
}

export function handlerUpdateRecurrence(
    dispatch: Dispatch<SetStateAction<Recurrence[]>>,
    id: string,
    amount: number,
    status: RecurrenceStatus
) {
    dispatch((prev) => prev.map((recurrence) => (
        id === recurrence.id ?
            {
                ...recurrence,
                amount,
                status,
                records: recurrence.records.map((record) => (
                    record.status === "PENDING" ?
                        {
                            ...record,
                            amount
                        }
                        :
                        record
                ))
            }
            :
            recurrence
    )))
}

export function handlerDeleteRecurrence(
    dispatch: Dispatch<SetStateAction<Recurrence[]>>,
    value: Recurrence
) {
    //TODO
}

// Recurrence ======================================================

export function handlerPutInstallment(
    dispatch: Dispatch<SetStateAction<Installment[]>>,
    value: Installment
) {
    dispatch((prev) => [...prev, value]);
}

export function handlerUpdateInstallment(
    dispatch: Dispatch<SetStateAction<Installment[]>>,
    value: Installment
) {

}

export function handlerDeleteInstallment(
    dispatch: Dispatch<SetStateAction<Installment[]>>,
    value: Installment
) {

}