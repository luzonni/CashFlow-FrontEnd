"use client";

import { useUser } from "@components/hooks/useUser";
import CashflowContext from "@context/CashflowContext";
import { Skeleton } from "@heroui/react";
import GroupCategory from "@models/GroupCategory";
import Installment from "@models/Installment";
import LocalDate, { toLocalDate } from "@models/LocalDate";
import MonthPeriod, { toRange } from "@models/MonthPeriod";
import PaymentMethod from "@models/PaymentMethod";
import Recurrence from "@models/Recurrence";
import Transaction from "@models/Transaction";
import apiAction from "@services/ApiAction";
import CategoryService from "@services/CategoryService";
import InstallmentService from "@services/InstallmentService";
import PaymentMethodService from "@services/PaymentMethodService";
import RecurrenceService from "@services/RecurrenceService";
import TransactionService from "@services/TransactionService";
import {
    ReactNode,
    useEffect,
    useState
} from "react";

type CashflowProviderProps = {
    period: MonthPeriod;
    children: ReactNode;
}

export function CashflowProvider({
    period,
    children
}: CashflowProviderProps) {
    const { user } = useUser();
    const [loading, setLoading] = useState<boolean>(true);
    const [groupsCategory, setGroupsCategory] = useState<GroupCategory[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [recurrences, setRecurrences] = useState<Recurrence[]>([]);
    const [installments, setInstallments] = useState<Installment[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const categories = groupsCategory.flatMap(group => group.categories);

    useEffect(() => {
        async function load() {
            apiAction(async () => {
                const groupsCategoryList: GroupCategory[] = await CategoryService.list.group();
                const pmList: PaymentMethod[] = await PaymentMethodService.list();
                const recList: Recurrence[] = await RecurrenceService.list();
                const instList: Installment[] = await InstallmentService.list();
                setGroupsCategory(groupsCategoryList);
                setPaymentMethods(pmList);
                setRecurrences(recList);
                setInstallments(instList);
                setLoading(false);
            }, "Something was wrong while fetch data");
        }
        load();
    }, []);

    useEffect(() => {
        if (period) {
            apiAction(async () => {
                const list: Transaction[] = await TransactionService.listBetween(toRange(period));
                setTransactions(list);
            }, "Something was wrong while fetch transactions...");
        }
    }, [period, user.settings.currency]);

    function putTransactions(transactions: Transaction[]) {
        function isBetween(date: LocalDate, period: MonthPeriod): boolean {
            if (!period)
                return true;
            const targetMonth = date.split("-")[1];
            const targetYear = date.split("-")[0]; 
            return Number(targetMonth) === period.month && Number(targetYear) === period.year;
        }
        const listOfPeriod = transactions.filter((tr) => isBetween(tr.date, period));
        setTransactions((prev) => [
            ...prev,
            ...listOfPeriod
        ].sort((a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        ));
    }

    function updateTransaction(transaction: Transaction) {
        setTransactions(transactions.map((t) =>
            t.id === transaction.id ?
                transaction
                :
                t
        ));
    }

    function deleteTransaction(id: string) {
        setTransactions(transactions.filter((t) =>
            t.id !== id)
        );
    }

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
            period,
            categories,
            groupsCategory,
            setGroupsCategory,
            paymentMethods,
            setPaymentMethods,
            recurrences,
            setRecurrences,
            transactions,
            putTransactions,
            updateTransaction,
            deleteTransaction,
            installments,
            setInstallments
        }}>
            {children}
        </CashflowContext.Provider>
    );
}