import Category from "@models/Category";
import DateRange from "@models/DateRange";
import GroupCategory from "@models/GroupCategory";
import PaymentMethod from "@models/PaymentMethod";
import Recurrence from "@models/Recurrence";
import Transaction from "@models/Transaction";
import { createContext } from "react";

type CashflowContextProps = {
    dateRange: DateRange;
    groupsCategory: GroupCategory[];
    categories: Category[];
    paymentMethods: PaymentMethod[];
    recurrences: Recurrence[];
    transactions: Transaction[];
    setGroupsCategory: React.Dispatch<React.SetStateAction<GroupCategory[]>>;
    setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
    setRecurrences: React.Dispatch<React.SetStateAction<Recurrence[]>>;
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const CashflowContext = createContext<CashflowContextProps | null>(null);

export default CashflowContext;