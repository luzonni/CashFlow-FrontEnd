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

type TransactionSectionProps = {
    groupsCategory: GroupCategory[];
    paymentMethods: PaymentMethod[];
}

export default function TransactionSection({ groupsCategory, paymentMethods }: TransactionSectionProps) {
    const { user, loading } = useUser();
    const [search, setSearch] = useState<string>("");
    const [date, setDate] = useState<DateRange | undefined>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(date: DateRange) {
        const res = await authFetch(API.TRANSACTION.between(date.start.toString(), date.end.toString()), {
            method: "GET"
        });
        if (!res.ok) {
            toast.danger("Something was wrong while fetch transactions...")
            return;
        }
        const data: Transaction[] = await res.json();
        setTransactions(data);
    }

    async function searchById(id: string) {
        const res = await authFetch(API.TRANSACTION.fing(id), {
            method: "GET"
        });
        if (!res.ok) {
            toast.danger("Transaction not found")
            return;
        }
        const data: Transaction = await res.json();
        setTransactions([data]);
    }

    async function create(
        description: string,
        amount: number,
        type: TransactionType,
        state: TransactionState,
        currency: string,
        paymentMethodId: number,
        categoryId: number,
        date: string
    ) {
        const res = await authFetch(API.TRANSACTION.main(), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "description": description,
                "amount": amount,
                "type": type,
                "state": state,
                "currency": currency,
                "paymentMethodId": paymentMethodId,
                "categoryId": categoryId,
                "date": date
            })
        })
        if (!res.ok) {
            toast.danger("Something was wrong while create transaction");
            return;
        }
        const data: Transaction = await res.json();
        setTransactions([...transactions, data]);
    }

    async function update(
        id: string,
        description: string,
        amount: number,
        type: TransactionType,
        state: TransactionState,
        currency: string,
        paymentMethodId: number,
        categoryId: number,
        date: string
    ) {
        const res = await authFetch(API.TRANSACTION.byId(id), {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "description": description,
                "amount": amount,
                "type": type,
                "state": state,
                "currency": currency,
                "paymentMethodId": paymentMethodId,
                "categoryId": categoryId,
                "date": date
            })
        })
        if (!res.ok) {
            toast.danger("Something was wrong while create transaction");
            return;
        }
        const data: Transaction = await res.json();
        setTransactions(transactions.map((t) =>
            t.id === id ?
                data
                :
                t
        ));
    }

    useEffect(() => {
        const currentDate = today(getLocalTimeZone());
        setDate({
            start: currentDate,
            end: currentDate
        });
    }, []);

    useEffect(() => {
        if (date)
            fetchTransactions(date);
    }, [date])

    useEffect(() => {
        if (search)
            searchById(search);
        else if (date)
            fetchTransactions(date);
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
                <CalendarModal value={date} setValue={setDate} />
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