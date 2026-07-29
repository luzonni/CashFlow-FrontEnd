"use client";

import CardCash from "@components/CardCash";
import { Carousel } from "@components/Carousel";
import CashShower from "@components/CashShower";
import { Icon } from "@components/Icon";
import { Description, Skeleton } from "@heroui/react";
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
        <>
            <div className="w-full lg:hidden">
                <Carousel withoutButtons>
                    <CardCash icon="Wallet" label="Balance" color="success">
                        {
                            balance ? (
                                <div>
                                    <CashShower value={balance.amount} negative={balance.amount < 0} className="text-2xl text-foreground" />
                                    <Description>{balance.count} transactions</Description>
                                </div>
                            ) : (
                                <Skeleton className="w-30 h-8" />
                            )
                        }
                    </CardCash>
                    <CardCash icon="TrendingUp" label="Revenues" color="success">
                        {
                            revenues ? (
                                <div>
                                    <CashShower value={revenues.amount} negative={revenues.amount < 0} className="text-2xl text-foreground" />
                                    <Description>{revenues.count} transactions</Description>
                                </div>
                            ) : (
                                <Skeleton className="w-30 h-8" />
                            )
                        }
                    </CardCash>
                    <CardCash icon="TrendingDown" label="Expenses" color="danger">
                        {
                            expenses ? (
                                <div>
                                    <CashShower value={expenses.amount} negative={expenses.amount < 0} className="text-2xl text-foreground" />
                                    <Description>{expenses.count} transactions</Description>
                                </div>
                            ) : (
                                <Skeleton className="w-30 h-8" />
                            )
                        }
                    </CardCash>
                    <CardCash icon="Clock" label="Pending" color="warning">
                        <div className="text-success">
                            {
                                (pending && pending.INCOME) ? (
                                    <div>
                                        <div className="flex flex-row items-center gap-2">
                                            <Icon name="TrendingUp" />
                                            <CashShower value={pending.INCOME.amount} negative={pending.INCOME.amount < 0} className="text-2xl" />
                                        </div>
                                        <Description>{pending.INCOME.count} transactions</Description>
                                    </div>
                                ) : (
                                    <Skeleton className="w-30 h-8" />
                                )
                            }
                        </div>
                    </CardCash>
                    <CardCash icon="Clock" label="Pending" color="warning">
                        <div className="text-danger">
                            {
                                (pending && pending.EXPENSE) ? (
                                    <div>
                                        <div className="flex flex-row items-center gap-2">
                                            <Icon name="TrendingDown" />
                                            <CashShower value={pending.EXPENSE.amount} negative={pending.EXPENSE.amount < 0} className="text-2xl" />
                                        </div>
                                        <Description>{pending.EXPENSE.count} transactions</Description>
                                    </div>
                                ) : (
                                    <Skeleton className="w-30 h-8" />
                                )
                            }
                        </div>
                    </CardCash>
                </Carousel>
            </div>
            {/* Desktop */}
            <div className="hidden w-full lg:flex flex-row gap-2 items-start">
                <CardCash icon="Wallet" label="Balance" color="success">
                    {
                        balance ? (
                            <div>
                                <CashShower value={balance.amount} negative={balance.amount < 0} className="text-2xl text-foreground" />
                                <Description>{balance.count} transactions</Description>
                            </div>
                        ) : (
                            <Skeleton className="w-30 h-8" />
                        )
                    }
                </CardCash>
                <CardCash icon="TrendingUp" label="Revenues" color="success">
                    {
                        revenues ? (
                            <div>
                                <CashShower value={revenues.amount} negative={revenues.amount < 0} className="text-2xl text-foreground" />
                                <Description>{revenues.count} transactions</Description>
                            </div>
                        ) : (
                            <Skeleton className="w-30 h-8" />
                        )
                    }
                </CardCash>
                <CardCash icon="TrendingDown" label="Expenses" color="danger">
                    {
                        expenses ? (
                            <div>
                                <CashShower value={expenses.amount} negative={expenses.amount < 0} className="text-2xl text-foreground" />
                                <Description>{expenses.count} transactions</Description>
                            </div>
                        ) : (
                            <Skeleton className="w-30 h-8" />
                        )
                    }
                </CardCash>
                <CardCash icon="Clock" label="Pending" color="warning">
                    <div className="text-success">
                        {
                            (pending && pending.INCOME) ? (
                                <div>
                                    <div className="flex flex-row items-center gap-2">
                                        <Icon name="TrendingUp" />
                                        <CashShower value={pending.INCOME.amount} negative={pending.INCOME.amount < 0} className="text-2xl" />
                                    </div>
                                    <Description>{pending.INCOME.count} transactions</Description>
                                </div>
                            ) : (
                                <Skeleton className="w-30 h-8" />
                            )
                        }
                    </div>
                </CardCash>
                <CardCash icon="Clock" label="Pending" color="warning">
                    <div className="text-danger">
                        {
                            (pending && pending.EXPENSE) ? (
                                <div>
                                    <div className="flex flex-row items-center gap-2">
                                        <Icon name="TrendingDown" />
                                        <CashShower value={pending.EXPENSE.amount} negative={pending.EXPENSE.amount < 0} className="text-2xl" />
                                    </div>
                                    <Description>{pending.EXPENSE.count} transactions</Description>
                                </div>
                            ) : (
                                <Skeleton className="w-30 h-8" />
                            )
                        }
                    </div>
                </CardCash>
            </div>
        </>
    )
}

