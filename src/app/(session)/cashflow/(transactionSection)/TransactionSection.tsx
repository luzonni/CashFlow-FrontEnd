"use client";

import { Icon } from "@components/Icon";
import { Button, Input } from "@heroui/react";
import CalendarModal from "./CalendarModal";
import { useEffect, useState } from "react";
import DateRange from "@models/DateRange";
import {
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import Transaction from "@models/Transaction";
import TransactionModal from "./TransactionModal";
import TransactionTable from "./TransactionTable";
import LocalDate from "@models/LocalDate";
import TransactionService, { TransactionRequest } from "@services/TransactionService";
import apiAction from "@services/ApiAction";
import MonthPicker from "@components/MonthPicker";

function isBetween(date: LocalDate, range: DateRange | undefined): boolean {
    if (!range) return true;
    const target = new Date(date).getTime();
    const start = new Date(range.start.toString()).getTime();
    const end = new Date(range.end.toString()).getTime();
    return target >= start && target <= end;
}

export default function TransactionSection() {
    const [search, setSearch] = useState<string>("");
    const [dateRange, setDateRange] = useState<DateRange>({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone())
    });
    const [transactions, setTransactions] = useState<Transaction[]>([]);

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
        if (search) {
            apiAction(async () => {
                const transaction: Transaction = await TransactionService.byId(search);
                setTransactions([transaction]);
            }, "Something was wrong while search: " + search)
        } else if (dateRange) {
            apiAction(async () => {
                const list: Transaction[] = await TransactionService.listBetween(dateRange);
                setTransactions(list);
            }, "Something was wrong while fetch transactions...");
        }
    }, [dateRange, search]);

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            {/* Desktop */}
            <div className="w-full hidden lg:flex flex-col gap-4">
                <div className="w-full flex flex-row items-center gap-3 justify-between">
                    <MonthPicker
                        value={dateRange}
                        setValue={setDateRange}
                    />
                    <div className="flex flex-row gap-2">
                        <Input
                            aria-label="Name"
                            placeholder="Search"
                            value={search}
                            onChange={(value) => setSearch(value.target.value)}
                        />
                    </div>
                    <div>
                        <TransactionModal
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
                    updateTransaction={update}
                />
            </div>
            {/* Mobile */}
            <div className="w-full flex lg:hidden flex-col items-center gap-4">
                <MonthPicker
                    value={dateRange}
                    setValue={setDateRange}
                />
                <TransactionTable
                    transactions={transactions}
                    updateTransaction={update}
                />
            </div>
            <div className="lg:hidden">
                <TransactionModal
                    newTransaction={create}
                >
                    <Button isIconOnly size="lg">
                        <Icon name="Plus" />
                    </Button>
                </TransactionModal>
            </div>
        </div>
    )
}