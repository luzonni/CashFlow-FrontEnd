"use client";

import { Icon } from "@components/Icon";
import { Button, Description, FieldError, Label, SearchField, toast } from "@heroui/react";
import CalendarModal from "./CalendarModal";
import { useEffect, useState } from "react";
import DateRange from "@models/DateRange";
import {
    DateValue,
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import Transaction, { TransactionState, TransactionType } from "@models/Transaction";
import authFetch from "@services/AuthFetch";
import { API } from "@services/API";
import TransactionModal from "./TransactionModal";
import GroupCategory from "@models/GroupCategory";
import PaymentMethod from "@models/PaymentMethod";
import { useUser } from "@components/hooks/useUser";
import TransactionTable from "./TransactionTable";
import LocalDate from "@models/LocalDate";
import { createTransaction, getById, getTransactionsBetween, TransactionRequest, updateTransaction } from "@services/TransactionService";

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

    async function fetchTransactions(date: DateRange) {
        try {
            const list: Transaction[] = await getTransactionsBetween(date);
            setTransactions(list);
        } catch (err) {
            toast.danger("Something was wrong while fetch transactions...")
        }
    }

    async function searchById(id: string) {
        try {
            const transaction: Transaction = await getById(id);
            setTransactions([transaction]);
        } catch (err) {
            toast.danger("Transaction not found")
        }
    }

    async function create(request: TransactionRequest) {
        try {
            const newTransaction = await createTransaction(request);
            if(isBetween(newTransaction.date, dateRange))
                setTransactions([...transactions, newTransaction]);
        } catch (err) {
            toast.danger("Something was wrong while create transaction");
        }
    }

    async function update(
        id: string,
        request: TransactionRequest
    ) {
        try {
            const updatedTransaction = await updateTransaction(id, request);
            setTransactions(transactions.map((t) =>
                t.id === id ?
                    updatedTransaction
                    :
                    t
            ));
        } catch (err) {
            toast.danger("Something was wrong while create transaction");
        }
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
    }, [dateRange])

    useEffect(() => {
        if (search)
            searchById(search);
        else if (dateRange)
            fetchTransactions(dateRange);
    }, [search])


    if (loading || !user) {
        return (
            <div>
                loaidn
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-row items-center gap-3 justify-between">
                <CalendarModal value={dateRange} setValue={setDateRange} />
                <SearchField value={search} onChange={setSearch}>
                    <Label>
                        Search by ID
                    </Label>
                    <SearchField.Group>
                        <SearchField.SearchIcon />
                        <SearchField.Input />
                        <SearchField.ClearButton />
                    </SearchField.Group>
                    <Description />
                    <FieldError />
                </SearchField>
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