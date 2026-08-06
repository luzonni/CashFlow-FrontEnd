"use client";

import { Icon } from "@components/Icon";
import { Button } from "@heroui/react";
import TransactionModal from "./TransactionModal";
import TransactionTable from "./TransactionTable";
import LocalDate from "@models/LocalDate";
import TransactionService, { TransactionRequest } from "@services/TransactionService";
import apiAction from "@services/ApiAction";
import { useCashflow } from "@components/hooks/useCashflow";



export default function TransactionSection() {
    const { transaction } = useCashflow();

    function handlerCreate(request: TransactionRequest) {
        apiAction(async () => {
            
            const newTransaction = await TransactionService.create(request);
            transaction.put(newTransaction);
            
        }, "Can't be created");
    }

    function handlerUpdate(
        id: string,
        request: TransactionRequest
    ) {
        apiAction(async () => {
            const updatedTransaction = await TransactionService.update(id, request);
            transaction.update(updatedTransaction);
        }, "Somethig deprecated");
    }

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            {/* Desktop */}
            <div className="w-full hidden lg:flex flex-col gap-4">
                <div className="w-full flex flex-row items-center gap-3 justify-between">
                    <div className="pl-2">
                        <img src="/logo.svg" alt="Logo" />
                    </div>
                    <div>
                        <TransactionModal
                            newTransaction={handlerCreate}
                        >
                            <Button variant="secondary">
                                <Icon name="Plus" />
                                New
                            </Button>
                        </TransactionModal>
                    </div>
                </div>
                <TransactionTable
                    transactions={transaction.values}
                    updateTransaction={handlerUpdate}
                />
            </div>
            {/* Mobile */}
            <div className="w-full flex lg:hidden flex-col items-center gap-4">
                <TransactionTable
                    transactions={transaction.values}
                    updateTransaction={handlerUpdate}
                />
            </div>
            <div className="flex lg:hidden bg-default-soft p-2 w-full items-center justify-between rounded-2xl">
                <TransactionModal
                    newTransaction={handlerCreate}
                >
                    <Button isIconOnly size="lg">
                        <Icon name="Plus" />
                    </Button>
                </TransactionModal>
            </div>
        </div>
    )
}