import Category from "@models/Category";
import GroupCategory from "@models/GroupCategory";
import Installment from "@models/Installment";
import MonthPeriod from "@models/MonthPeriod";
import PaymentMethod from "@models/PaymentMethod";
import Recurrence, { RecurrenceStatus } from "@models/Recurrence";
import Transaction from "@models/Transaction";
import { createContext } from "react";

type CashflowContextProps = {
    period: MonthPeriod;
    transaction: TransactionContext;
    tagger: CategoryContext;
    paymentMethod: PaymentMethodContext;
    recurrence: RecurrenceContext;
    installment: InstallmentContext;
}

type TransactionContext = {
    values: Transaction[];
    put: (value: Transaction) => void;
    putAll: (values: Transaction[]) => void;
    update: (value: Transaction) => void;
    delete: (id: string) => void;
}

type CategoryContext = {
    group: {
        values: GroupCategory[];
        put: (value: GroupCategory) => void;
        update: (value: GroupCategory) => void;
        delete: (value: GroupCategory) => void;
    },
    category: {
        values: Category[];
        put: (value: Category) => void;
        update: (value: Category) => void;
        delete: (value: Category) => void;
    }
}

type RecurrenceContext = {
    values: Recurrence[];
    put: (value: Recurrence) => void;
    update: (id: string, amount: number, status: RecurrenceStatus) => void;
    delete: (value: Recurrence) => void;
}

type InstallmentContext = {
    values: Installment[];
    put: (value: Installment) => void;
    update: (value: Installment) => void;
    delete: (value: Installment) => void;
}

type PaymentMethodContext = {
    values: PaymentMethod[];
    put: (value: PaymentMethod) => void;
    update: (value: PaymentMethod) => void;
    delete: (value: PaymentMethod) => void;
}

const CashflowContext = createContext<CashflowContextProps | null>(null);

export default CashflowContext;