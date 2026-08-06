"use client";

import { Icon } from "@components/Icon";
import { Description, Label } from "@heroui/react";
import CardsContainer from "./(containers)/CardsContainer";
import { useCashflow } from "@components/hooks/useCashflow";
import { useEffect, useState } from "react";
import apiAction from "@services/ApiAction";
import Balances from "@models/Balance";
import CashierService from "@services/CashierService";
import CategoryChart from "./(chards)/CategoryChart";
import BalanceChart from "./(chards)/BalanceChart";
import PaymentMethodsContainer from "./(containers)/PaymentMethodsContainer";

const MONTHS_BEHIND: number = 6;

export default function Page() {
    const { period } = useCashflow();
    const [balances, setBalances] = useState<Record<string, Balances>>();


    const [confirm, setConfirm] = useState<Balances>();
    const [pending, setPending] = useState<Balances>();

    useEffect(() => {
        apiAction(async () => {
            setConfirm(await CashierService.period.balances(period.month, period.year, "CONFIRM"));
            setPending(await CashierService.period.balances(period.month, period.year, "PENDING"));
        }, "Error While get balances...");
    }, [period]);

    //TODO coletar todos os dos ultimos 6 meses aqui.
    useEffect(() => {
        async function getter() {
            setBalances(await CashierService.behind(period.month, period.year, MONTHS_BEHIND));
        }
        getter();
    }, [period]);

    if (!balances) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <CardsContainer {...{ confirm, pending }} />
            <div className="flex flex-col lg:flex-row gap-2">
                {/* Esquerda */}
                <div className="lg:w-2/3 flex flex-col gap-2">
                    {/* Card II */}
                    <div className="w-full flex flex-col bg-surface rounded-2xl p-4 gap-4">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row gap-2">
                                <Icon name="ChartColumn" />
                                <Label>Income x Expense</Label>
                            </div>
                            <Description>Ultimos 6 meses</Description>
                        </div>
                        <BalanceChart monthBalances={balances} />
                    </div>
                    {/* Card II */}
                    <div className="w-full flex flex-col bg-surface rounded-2xl p-4 gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row gap-2">
                                <Icon name="ChartPie" />
                                <Label>Gastos por categoria</Label>
                            </div>
                            <Description>Ultimos 6 meses</Description>
                        </div>
                        <CategoryChart />
                    </div>
                </div>
                {/* Direita */}
                <div className="lg:w-1/3 flex flex-col gap-2">
                    {/* Card III */}
                    <div className="w-full flex flex-col bg-surface rounded-2xl p-4">
                        <PaymentMethodsContainer />
                    </div>
                    {/* Card IV */}
                    <div className="w-full flex flex-col bg-surface rounded-2xl p-4">
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-2">
                                <Icon name="Clock" />
                                <Label>Upcoming releases</Label>
                            </div>
                            <Description>Installments and Recurrences</Description>
                        </div>
                        <div className="p-4">
                            Content
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-surface rounded-2xl p-4">
                <h1>
                    Content
                </h1>
            </div>
        </div>
    )
}

