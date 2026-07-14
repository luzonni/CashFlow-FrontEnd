"use client";

import { Icon } from "@components/Icon";
import { Button } from "@heroui/react";
import DateRange from "@models/DateRange";
import TransactionModal from "./TransactionModal";
import TransactionTable from "./TransactionTable";
import LocalDate from "@models/LocalDate";
import TransactionService, { TransactionRequest } from "@services/TransactionService";
import apiAction from "@services/ApiAction";
import { useCashflow } from "@components/hooks/useCashflow";

function isBetween(date: LocalDate, range: DateRange | undefined): boolean {
    if (!range) return true;
    const target = new Date(date).getTime();
    const start = new Date(range.start.toString()).getTime();
    const end = new Date(range.end.toString()).getTime();
    return target >= start && target <= end;
}

export default function TransactionSection() {
    const { dateRange, transactions, setTransactions } = useCashflow();

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

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            {/* Desktop */}
            <div className="w-full hidden lg:flex flex-col gap-4">
                <div className="w-full flex flex-row items-center gap-3 justify-end">
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
                <TransactionTable
                    transactions={transactions}
                    updateTransaction={update}
                />
            </div>
            <div className="flex lg:hidden bg-default-soft p-2 w-full items-center justify-center rounded-2xl">
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