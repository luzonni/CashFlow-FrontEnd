import Category from "@models/Category";
import GroupCategory from "@models/GroupCategory";
import PaymentMethod from "@models/PaymentMethod";
import { createContext } from "react";

type CashflowContextProps = {
    groupsCategory: GroupCategory[];
    categories: Category[];
    setGroupsCategory: (list: GroupCategory[]) => void;
    paymentMethods: PaymentMethod[];
    setPaymentMethods: (list: PaymentMethod[]) => void;
}

const CashflowContext = createContext<CashflowContextProps | null>(null);

export default CashflowContext;