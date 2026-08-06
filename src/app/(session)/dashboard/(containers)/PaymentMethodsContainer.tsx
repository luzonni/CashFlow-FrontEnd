"use client";

import CashShower from "@components/CashShower";
import { useCashflow } from "@components/hooks/useCashflow";
import { Icon } from "@components/Icon";
import TrComponent from "@components/TrComponent";
import { Description, Label } from "@heroui/react";
import PaymentMethod from "@models/PaymentMethod";
import Transaction from "@models/Transaction";
import { useEffect, useState } from "react";

type MethodShower = {
    income: number;
    expense: number;
    count: number;
}

function mapper(methods: PaymentMethod[], transactions: Transaction[]): Map<number, MethodShower> {
    const map: Map<number, MethodShower> = new Map<number, MethodShower>();
    for (const method of methods) {
        map.set(method.id, {
            income: 0,
            expense: 0,
            count: 0
        });
    }
    for (const tr of transactions) {
        const current = map.get(tr.paymentMethod.id);
        if (current) {
            if (tr.type === "INCOME") {
                current.income += tr.amount;
            } else {
                current.expense += tr.amount;
            }
            current.count += 1;
        }
    }
    return map;
}

export default function PaymentMethodsContainer() {
    const { paymentMethod, transaction } = useCashflow();
    const [map, setMap] = useState<Map<number, MethodShower>>();

    useEffect(() => {
        setMap(mapper(paymentMethod.values, transaction.values))
    }, [paymentMethod.values, transaction.values])

    if (!map) {
        return;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2">
                    <Icon name="Wallet" />
                    <Label>Payment Method</Label>
                </div>
                <Description>{map.size} Ativos</Description>
            </div>
            <div className="flex flex-col gap-2">
                {
                    paymentMethod.values.map((pm) => (
                        <div className="flex flex-row gap-2 justify-between items-center bg-surface-secondary px-4 py-2 rounded-2xl">
                            <div className="flex flex-row gap-2 items-center">
                                <TrComponent.PM pm={pm} />
                                <Description>{map.get(pm.id)?.count || 0} transactions</Description>
                            </div>
                            <div>
                                {
                                    map.get(pm.id) ?
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex flex-row gap-2 items-center">
                                                <Icon name="TrendingUp" />
                                                <CashShower value={map.get(pm.id)?.income || 0} className="text-foreground" />
                                            </div>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Icon name="TrendingDown" />
                                                <CashShower value={map.get(pm.id)?.expense || 0} className="text-foreground" />
                                            </div>
                                        </div>
                                        :
                                        <div>ola</div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}