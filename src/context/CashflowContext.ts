import Category from "@models/Category";
import GroupCategory from "@models/GroupCategory";
import PaymentMethod from "@models/PaymentMethod";
import Recurrence from "@models/Recurrence";
import { createContext } from "react";

type CashflowContextProps = {
    groupsCategory: GroupCategory[];
    categories: Category[];
    paymentMethods: PaymentMethod[];
    recurrences: Recurrence[];
    setGroupsCategory: React.Dispatch<React.SetStateAction<GroupCategory[]>>;
    setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
    setRecurrences: React.Dispatch<React.SetStateAction<Recurrence[]>>;
}

const CashflowContext = createContext<CashflowContextProps | null>(null);

export default CashflowContext;