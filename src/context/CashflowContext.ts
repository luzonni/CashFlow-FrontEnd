import Category from "@models/Category";
import GroupCategory from "@models/GroupCategory";
import Installment from "@models/Installment";
import MonthPeriod from "@models/MonthPeriod";
import PaymentMethod from "@models/PaymentMethod";
import Recurrence from "@models/Recurrence";
import Transaction from "@models/Transaction";
import { createContext } from "react";

type CashflowContextProps = {
    period: MonthPeriod;
    groupsCategory: GroupCategory[];
    categories: Category[];
    paymentMethods: PaymentMethod[];
    recurrences: Recurrence[];
    transactions: Transaction[];
    installments: Installment[];
    setGroupsCategory: React.Dispatch<React.SetStateAction<GroupCategory[]>>;
    setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
    setRecurrences: React.Dispatch<React.SetStateAction<Recurrence[]>>;
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    setInstallments: React.Dispatch<React.SetStateAction<Installment[]>>;
}

const CashflowContext = createContext<CashflowContextProps | null>(null);

export default CashflowContext;