"use client";

import { useUser } from "@components/hooks/useUser";
import CashflowContext from "@context/CashflowContext";
import { Skeleton } from "@heroui/react";
import DateRange from "@models/DateRange";
import GroupCategory from "@models/GroupCategory";
import PaymentMethod from "@models/PaymentMethod";
import Recurrence from "@models/Recurrence";
import Transaction from "@models/Transaction";
import apiAction from "@services/ApiAction";
import CategoryService from "@services/CategoryService";
import PaymentMethodService from "@services/PaymentMethodService";
import RecurrenceService from "@services/RecurrenceService";
import TransactionService from "@services/TransactionService";
import {
    ReactNode,
    useEffect,
    useState
} from "react";

type CashflowProviderProps = {
    dateRange: DateRange;
    children: ReactNode;
}

export function CashflowProvider({
    dateRange,
    children
}: CashflowProviderProps) {
    const { user } = useUser();
    const [loading, setLoading] = useState<boolean>(true);
    const [groupsCategory, setGroupsCategory] = useState<GroupCategory[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [recurrences, setRecurrences] = useState<Recurrence[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const categories = groupsCategory.flatMap(group => group.categories);

    useEffect(() => {
        async function load() {
            apiAction(async () => {
                const groupsCategoryList: GroupCategory[] = await CategoryService.list.group();
                const pmList: PaymentMethod[] = await PaymentMethodService.list();
                const recList: Recurrence[] = await RecurrenceService.list();
                setGroupsCategory(groupsCategoryList);
                setPaymentMethods(pmList);
                setRecurrences(recList);
                setLoading(false);
            }, "Something was wrong while fetch data");
        }
        load();
    }, []);

    useEffect(() => {
        if (dateRange) {
            apiAction(async () => {
                const list: Transaction[] = await TransactionService.listBetween(dateRange);
                setTransactions(list);
            }, "Something was wrong while fetch transactions...");
        }
    }, [dateRange, user.settings.currency]);

    if (loading) {
        return (
            <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div ><Skeleton className="w-full h-50" /></div>
                <div className="col-start-1 row-start-2"><Skeleton className="w-full h-50" /></div>
                <div className="col-span-2 row-span-2 col-start-2 row-start-1"><Skeleton className="w-full h-102" /></div>
            </div>
        )
    }

    return (
        <CashflowContext.Provider value={{
            dateRange,
            categories,
            groupsCategory,
            setGroupsCategory,
            paymentMethods,
            setPaymentMethods,
            recurrences,
            setRecurrences,
            transactions,
            setTransactions
        }}>
            {children}
        </CashflowContext.Provider>
    );
}