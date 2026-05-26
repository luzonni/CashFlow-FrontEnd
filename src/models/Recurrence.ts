import Category from "./Category";
import LocalDate from "./LocalDate";
import PaymentMethod from "./PaymentMethod";
import Transaction, { TransactionType } from "./Transaction";


type Recurrence = {
    id: string;
    name: string;
    description: string;
    status: RecurrenceStatus;
    category: Category;
    paymentMethod: PaymentMethod;
    type: TransactionType;
    amount: number;
    currency: string;
    frequency: RecurrenceScheduling;
    releases: number;
    maxOccurrences: number;
    nextExecutionAt: number;
    records: RecurrenceRecord[];
    createdAt: LocalDate;
}

type RecurrenceRecord = {
    id: number;
    recurrence: Recurrence;
    transaction?: Transaction;
    amount: number;
    executedAt?: LocalDate;
    scheduledTo: LocalDate;
    occurenceNumber: number;
    status: RecordStatus;
    creaatedAt: LocalDate;
}

export type RecordStatus = "PENDING" | "EXECUTED" | "SKIPPED" | "FAILED";

export type RecurrenceStatus = "ACTIVE" | "PAUSED" | "CANCELED";

export type RecurrenceScheduling = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

export default Recurrence;