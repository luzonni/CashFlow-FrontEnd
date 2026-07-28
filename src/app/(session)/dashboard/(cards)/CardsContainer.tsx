"use client";

import CardCash from "@components/CardCash";
import CashShower from "@components/CashShower";
import { Icon } from "@components/Icon";
import { Skeleton } from "@heroui/react";
import Balance from "@models/Balance";
import DateRange from "@models/DateRange";
import apiAction from "@services/ApiAction";
import CashierService, { PendingBalances } from "@services/CashierService";
import { useEffect, useState } from "react";

export default function CardsContainer({ date }: { date: DateRange }) {
    const [balance, setBalance] = useState<Balance>();
    const [revenues, setRevenues] = useState<Balance>();
    const [expenses, setExpenses] = useState<Balance>();
    const [pending, setPending] = useState<PendingBalances>();

    useEffect(() => {
        apiAction(async () => {
            setBalance(await CashierService.balance(date));
            setRevenues(await CashierService.revenues(date));
            setExpenses(await CashierService.expenses(date));
            setPending(await CashierService.pending(date));
        }, "Error While get balances...");
    }, [date]);

    return (
        <div className="w-full flex flex-row gap-2">
            <CardCash icon="Wallet" label="Balance" color="success">
                {
                    balance ? (
                        <CashShower value={balance.amount} negative={balance.amount < 0} className="text-2xl text-foreground" />
                    ) : (
                        <Skeleton className="w-30 h-8" />
                    )
                }
                <div className="flex flex-row gap-2 text-muted">
                    <h1>
                        Projetado:
                    </h1>
                    <CashShower value={3432} className="text-md" />
                </div>
            </CardCash>
            <CardCash icon="TrendingUp" label="Revenues" color="success">
                {
                    revenues ? (
                        <CashShower value={revenues.amount} negative={revenues.amount < 0} className="text-2xl text-foreground" />
                    ) : (
                        <Skeleton className="w-30 h-8" />
                    )
                }
            </CardCash>
            <CardCash icon="TrendingDown" label="Expenses" color="danger">
                {
                    expenses ? (
                        <CashShower value={expenses.amount} negative={expenses.amount < 0} className="text-2xl text-foreground" />
                    ) : (
                        <Skeleton className="w-30 h-8" />
                    )
                }
            </CardCash>
            <CardCash icon="Clock" label="Pending" color="warning">
                <div className="flex flex-row gap-2 text-success">
                    <Icon name="TrendingUp"/>
                    {
                        (pending && pending.INCOME) ? (
                            <CashShower value={pending.INCOME.amount} negative={pending.INCOME.amount < 0} className="text-2xl" />
                        ) : (
                            <Skeleton className="w-30 h-8" />
                        )
                    }
                </div>
                <div className="flex flex-row gap-2 text-danger">
                    <Icon name="TrendingDown"/>
                    {
                        (pending && pending.EXPENSE) ? (
                            <CashShower value={pending.EXPENSE.amount} negative={pending.EXPENSE.amount < 0} className="text-2xl" />
                        ) : (
                            <Skeleton className="w-30 h-8" />
                        )
                    }
                </div>
            </CardCash>
        </div>
    )
}

