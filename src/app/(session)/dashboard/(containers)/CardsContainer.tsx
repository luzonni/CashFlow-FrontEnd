"use client";

import CardCash from "@components/CardCash";
import { Carousel } from "@components/Carousel";
import CashShower from "@components/CashShower";
import { Icon } from "@components/Icon";
import { Description, Skeleton } from "@heroui/react";
import Balances from "@models/Balance";

type CardsContainerProps = { 
    confirm: Balances | undefined; 
    pending: Balances | undefined;
}

export default function CardsContainer({ confirm, pending }: CardsContainerProps) {
    return (
        <>
            <div className="w-full lg:hidden">
                <Carousel withoutButtons>
                    <CardCash icon="Wallet" label="Balance" color="success">
                        {
                            confirm ? (
                                <div>
                                    <CashShower value={confirm.INCOME.amount - confirm.EXPENSE.amount} negative={(confirm.INCOME.amount - confirm.EXPENSE.amount) < 0} className="text-2xl text-foreground" />
                                    <Description>{confirm.INCOME.count + confirm.EXPENSE.count} transactions</Description>
                                </div>
                            ) : (
                                <Skeleton className="w-30 h-8" />
                            )
                        }
                    </CardCash>
                    <CardCash icon="TrendingUp" label="Revenues" color="success">
                        {
                            confirm ? (
                                <div>
                                    <CashShower value={confirm.INCOME.amount} negative={confirm.INCOME.amount < 0} className="text-2xl text-foreground" />
                                    <Description>{confirm.INCOME.count} transactions</Description>
                                </div>
                            ) : (
                                <Skeleton className="w-30 h-8" />
                            )
                        }
                    </CardCash>
                    <CardCash icon="TrendingDown" label="Expenses" color="danger">
                        {
                            confirm ? (
                                <div>
                                    <CashShower value={confirm.EXPENSE.amount} negative={confirm.EXPENSE.amount < 0} className="text-2xl text-foreground" />
                                    <Description>{confirm.EXPENSE.count} transactions</Description>
                                </div>
                            ) : (
                                <Skeleton className="w-30 h-8" />
                            )
                        }
                    </CardCash>
                    <CardCash icon="Clock" label="Pending" color="warning">
                        <div className="text-success">
                            {
                                (pending) ? (
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
                                (pending) ? (
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
                        confirm ? (
                            <div>
                                <CashShower value={confirm.INCOME.amount - confirm.EXPENSE.amount} negative={(confirm.INCOME.amount - confirm.EXPENSE.amount) < 0} className="text-2xl text-foreground" />
                                <Description>{confirm.INCOME.count + confirm.EXPENSE.count} transactions</Description>
                            </div>
                        ) : (
                            <Skeleton className="w-30 h-8" />
                        )
                    }
                </CardCash>
                <CardCash icon="TrendingUp" label="Revenues" color="success">
                    {
                        confirm ? (
                            <div>
                                <CashShower value={confirm.INCOME.amount} negative={confirm.INCOME.amount < 0} className="text-2xl text-foreground" />
                                <Description>{confirm.INCOME.count} transactions</Description>
                            </div>
                        ) : (
                            <Skeleton className="w-30 h-8" />
                        )
                    }
                </CardCash>
                <CardCash icon="TrendingDown" label="Expenses" color="danger">
                    {
                        confirm ? (
                            <div>
                                <CashShower value={confirm.EXPENSE.amount} negative={confirm.EXPENSE.amount < 0} className="text-2xl text-foreground" />
                                <Description>{confirm.EXPENSE.count} transactions</Description>
                            </div>
                        ) : (
                            <Skeleton className="w-30 h-8" />
                        )
                    }
                </CardCash>
                <CardCash icon="Clock" label="Pending" color="warning">
                    <div className="text-success">
                        {
                            (pending) ? (
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
                            (pending) ? (
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

