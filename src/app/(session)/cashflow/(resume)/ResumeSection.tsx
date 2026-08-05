"use client";

import { useCashflow } from "@components/hooks/useCashflow";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { ColorSwatch, Description, Separator, Typography } from "@heroui/react";
import { formatDate } from "@utils/DateUtils";
import months from "@utils/Month";
import { useEffect, useState } from "react";
import CashShower from "@components/CashShower";
import TrComponent from "@components/TrComponent";

const getMonth = (month: number) => months[month].label;

export default function ResumeSection() {
    const { transaction, period } = useCashflow();
    const { user } = useUser();
    const [value, setValue] = useState<number>(3131.43);

    useEffect(() => {
        let amount = 0;
        transaction.values.forEach((t) => {
            if (t.state === "CONFIRM") {
                let current = t.amount;
                if (t.type === "EXPENSE") {
                    current *= -1;
                }
                amount += current;
            }
        })
        setValue(amount);
    }, [transaction.values])

    return (
        <div className="w-full flex flex-col h-full gap-4">
            <div className="w-full flex flex-row bg-muted p-4 rounded-2xl justify-between items-center">
                <h1 className="text-default font-bold text-md lg:text-xl">
                    Extract · {getMonth(period.month - 1)} / {period.year}
                </h1>
                <CashShower value={value} negative={value < 0} className="text-default font-bold text-md lg:text-xl"/>
            </div>
            <div className="w-full flex flex-col gap-2 px-4 overflow-y-scroll">
                {
                    transaction.values.map((t, index) => (
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
                                <TrComponent.Cash transaction={t} currency={user.settings.currency} className={(t.state === "CANCELLED" || t.state === "PENDING") ? "text-muted" : ""} />
                            </div>
                            {
                                index < transaction.values.length - 1 && (
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