import Category from "./Category";
import PaymentMethod from "./PaymentMethod";
import { DateValue } from "@internationalized/date";

type Transaction = {
    id: string;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    type: TransactionType;
    state: TransactionState;
    category: Category;
    date: string;
    currency: string;
    createdAt: string;
}

export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionState = "PENDING" | "CONFIRM" | "CANCELLED";

export default Transaction;