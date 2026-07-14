"use client";

import CashShow from "@components/CashShow";
import { useCashflow } from "@components/hooks/useCashflow";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Chip, ColorSwatch, Description, Separator, Typography } from "@heroui/react";
import { currencyFormat } from "@utils/Currency";
import { formatDate } from "@utils/DateUtils";
import { useEffect, useState } from "react";

const months: string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const getMonth = (month: number) => months[month];

export default function ResumeSection() {
    const { transactions, dateRange } = useCashflow();
    const { user } = useUser();
    const [value, setValue] = useState<number>(3131.43);

    useEffect(() => {
        let amount = 0;
        transactions.forEach((t) => {
            if (t.state === "CONFIRM") {
                let current = t.amount;
                if (t.type === "EXPENSE") {
                    current *= -1;
                }
                amount += current;
            }
        })
        setValue(amount);
    }, [transactions])

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-row bg-foreground p-4 rounded-2xl justify-between items-center">
                <h1 className="text-default font-bold text-md lg:text-xl">
                    Extract · {getMonth(dateRange.start.month - 1)} / {dateRange.start.year}
                </h1>
                <CashShow value={value} className="text-default font-bold text-md lg:text-xl" />
            </div>
            <div className="w-full flex flex-col gap-2 px-4 max-h-200 overflow-y-scroll">
                {
                    transactions.map((t, index) => (
                        <div key={t.id} className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-2">
                                    <ColorSwatch color={t.category.color} shape="square" className="w-2" />
                                    <Typography className="text-sm lg:text-md">
                                        {t.category.name}
                                    </Typography>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    {
                                        t.state === "PENDING" && (
                                            <div className="flex flex-row gap-1 items-center">
                                                <Icon name="Clock" className="text-warning" />
                                                <Description>
                                                    {formatDate(
                                                        t.date,
                                                        user.settings.locale
                                                    )}
                                                </Description>
                                            </div>
                                        )
                                    }
                                    {
                                        t.state === "CANCELLED" && (
                                            <Icon name="Ban" className="text-muted" />
                                        )
                                    }
                                </div>
                                <CashShow type={t.type} value={t.amount} className={(t.state === "CANCELLED" || t.state === "PENDING") ? "text-muted" : ""} />
                            </div>
                            {
                                index < transactions.length - 1 && (
                                    <Separator variant="secondary" />
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}