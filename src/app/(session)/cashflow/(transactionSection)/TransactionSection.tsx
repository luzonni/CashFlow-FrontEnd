"use client";

import { Icon } from "@components/Icon";
import { Button, Input, Skeleton } from "@heroui/react";
import CalendarModal from "./CalendarModal";
import { useEffect, useState } from "react";
import DateRange from "@models/DateRange";
import {
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import Transaction from "@models/Transaction";
import TransactionModal from "./TransactionModal";
import GroupCategory from "@models/GroupCategory";
import PaymentMethod from "@models/PaymentMethod";
import { useUser } from "@components/hooks/useUser";
import TransactionTable from "./TransactionTable";
import LocalDate from "@models/LocalDate";
import TransactionService, { TransactionRequest } from "@services/TransactionService";
import apiAction from "@services/ApiAction";

type TransactionSectionProps = {
    groupsCategory: GroupCategory[];
    paymentMethods: PaymentMethod[];
}

function isBetween(date: LocalDate, range: DateRange | undefined): boolean {
    if (!range) return true;
    const target = new Date(date).getTime();
    const start = new Date(range.start.toString()).getTime();
    const end = new Date(range.end.toString()).getTime();
    return target >= start && target <= end;
}

export default function TransactionSection({ groupsCategory, paymentMethods }: TransactionSectionProps) {
    const { user, loading } = useUser();
    const [search, setSearch] = useState<string>("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    function fetchTransactions(date: DateRange) {
        apiAction(async () => {
            const list: Transaction[] = await TransactionService.listBetween(date);
            setTransactions(list);
        }, "Something was wrong while fetch transactions...");
    }

    function searchById(id: string) {
        apiAction(async () => {
            const transaction: Transaction = await TransactionService.byId(id);
            setTransactions([transaction]);
        }, "No transactions with this ID");
    }

    function create(request: TransactionRequest) {
        apiAction(async () => {
            const newTransaction = await TransactionService.create(request);
            if (isBetween(newTransaction.date, dateRange))
                setTransactions((prev) =>
                    [newTransaction, ...prev]
                        .sort((a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime()
                        )
                );
        }, "Can't be created");
    }

    function update(
        id: string,
        request: TransactionRequest
    ) {
        apiAction(async () => {
            const updatedTransaction = await TransactionService.update(id, request);
            setTransactions(transactions.map((t) =>
                t.id === id ?
                    updatedTransaction
                    :
                    t
            ));
        }, "Somethig deprecated");
    }

    useEffect(() => {
        const currentDate = today(getLocalTimeZone());
        setDateRange({
            start: currentDate,
            end: currentDate
        });
    }, []);

    useEffect(() => {
        if (dateRange)
            fetchTransactions(dateRange);
    }, [dateRange]);


    if (loading || !user) {
        return (
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center">

                    <Skeleton className="w-26 h-10" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-20 h-3" />
                        <Skeleton className="w-50 h-8" />
                    </div>
                    <Skeleton className="w-26 h-10" />
                </div>
                <Skeleton className="w-full h-10" />
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-row items-center gap-3 justify-between">
                <CalendarModal value={dateRange} setValue={setDateRange} />
                <div className="flex flex-row gap-2">
                    <Input
                        aria-label="Name"
                        placeholder="Search"
                        value={search}
                        onChange={(value) => setSearch(value.target.value)}
                    />
                    <Button isIconOnly variant="secondary" onClick={() => searchById(search)}>
                        <Icon name="Search" />
                    </Button>
                </div>
                <div>
                    <TransactionModal
                        groupsCategory={groupsCategory}
                        paymentMethods={paymentMethods}
                        newTransaction={create}
                    >
                        <Button variant="secondary">
                            <Icon name="Plus" />
                            New
                        </Button>
                    </TransactionModal>
                </div>
            </div>
            <TransactionTable
                transactions={transactions}
                groupsCategory={groupsCategory}
                paymentMethods={paymentMethods}
                updateTransaction={update}
                user={user}
            />
        </div>
    )
}