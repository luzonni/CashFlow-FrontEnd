"use client";

import { Icon } from "@components/Icon";
import { Description, Label, Separator } from "@heroui/react";
import CardsContainer from "./(cards)/CardsContainer";
import { useCashflow } from "@components/hooks/useCashflow";
import BalanceChart from "@components/BalanceChart";
import { useEffect, useState } from "react";
import apiAction from "@services/ApiAction";
import Balances from "@models/Balance";
import CashierService from "@services/CashierService";
import MonthPeriod from "@models/MonthPeriod";

const MONTHS_BEHIND = 6;

type MonthBalances = {
    month: MonthPeriod;
    balances: Balances;
}

export default function Page() {
    const { period } = useCashflow();
    const [balances, setBalances] = useState<MonthBalances[]>([]);


    const [confirm, setConfirm] = useState<Balances>();
    const [pending, setPending] = useState<Balances>();

    useEffect(() => {
        apiAction(async () => {
            setConfirm(await CashierService.balances(period.month, period.year, "CONFIRM"));
            setPending(await CashierService.balances(period.month, period.year, "PENDING"));
        }, "Error While get balances...");
    }, [period]);

    //TODO coletar todos os dos ultimos 6 meses aqui.

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col bg-surface rounded-2xl gap-2 p-4">
                <div>
                    <h1>Content</h1>
                </div>
                <Separator variant="secondary" />
            </div>
            <CardsContainer {...{confirm, pending}} />
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
                        <div className="flex p-4">
                            Content
                        </div>
                    </div>
                </div>
                {/* Direita */}
                <div className="lg:w-1/3 flex flex-col gap-2">
                    {/* Card III */}
                    <div className="w-full flex flex-col bg-surface rounded-2xl p-4">
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-2">
                                <Icon name="Wallet" />
                                <Label>Payment Method</Label>
                            </div>
                            <Description>X Ativos</Description>
                        </div>
                        <div className="p-4">
                            Content
                        </div>
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

