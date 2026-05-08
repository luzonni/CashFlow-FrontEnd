import Category from "./Category";
import PaymentMethod from "./PaymentMethod";
import { DateValue } from "@internationalized/date";

type Transaction = {
    id: number;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    type: TransactionType;
    state: TransactionState;
    category: Category;
    date: DateValue;
    createAt: string;
}

export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionState = "PENDING" | "CONFIRM" | "CANCELLED";

export default Transaction;