import Category from "./Category";
import LocalDate from "./LocalDate";
import PaymentMethod from "./PaymentMethod";

type Transaction = {
    id: string;
    description: string;
    amount: number;
    defaultAmount: number;
    paymentMethod: PaymentMethod;
    type: TransactionType;
    state: TransactionState;
    category: Category;
    date: LocalDate;
    currency: string;
    createdAt: LocalDate;
}

export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionState = "PENDING" | "CONFIRM" | "CANCELLED";

export default Transaction;