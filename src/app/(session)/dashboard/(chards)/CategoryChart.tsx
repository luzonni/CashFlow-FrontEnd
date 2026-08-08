"use client";

import apiAction from "@services/ApiAction";
import CashierService from "@services/CashierService";
import { useEffect, useState } from "react";
import Balances from "@models/Balance";
import { Label, Skeleton, Select, ListBox, Chip, Description, Tabs } from "@heroui/react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import Transaction, { TransactionType } from "@models/Transaction";
import Category from "@models/Category";
import { useCashflow } from "@components/hooks/useCashflow";
import TrComponent from "@components/TrComponent";
import CashShower from "@components/CashShower";
import { Icon } from "@components/Icon";
import { tr } from "framer-motion/client";

type ChartType = Category & {
    INCOME: number;
    EXPENSE: number;
    count: number;
}

export default function CategoryChart() {
    const { period, tagger, transaction } = useCashflow();
    const [type, setType] = useState<TransactionType>("EXPENSE");
    const [cateValues, setCatValues] = useState<Map<number, ChartType[]>>();
    const [total, setTotal] = useState<number>(0);

    function plusTotal(value: number) {
        setTotal((prev) => prev + value);
    }

    function buildData() {
        const map: Map<number, ChartType[]> = new Map<number, ChartType[]>();
        for (const group of tagger.group.values) {
            map.set(group.id,
                group.categories.map((cat) => ({
                    ...cat,
                    INCOME: transaction.values
                        .filter((tr) => tr.category.id === cat.id)
                        .filter((tr) => tr.type === "INCOME")
                        .reduce((value, t) => t.amount + value, 0),
                    EXPENSE: transaction.values
                        .filter((tr) => tr.category.id === cat.id)
                        .filter((tr) => tr.type === "EXPENSE")
                        .reduce((value, t) => t.amount + value, 0),
                    count: transaction.values
                        .filter((tr) => tr.category.id === cat.id)
                        .length
                }))
            );
        }
        setCatValues(map);
    }

    useEffect(() => {
        buildData();
    }, [period, type]);

    if (!cateValues) {
        return (
            <div className="flex flex-row gap-4">
                <Skeleton className="w-100 h-100" />
                <div className="flex flex-col gap-10">
                    <Skeleton className="w-100 h-5" />
                    <Skeleton className="w-100 h-5" />
                    <Skeleton className="w-100 h-5" />
                    <Skeleton className="w-100 h-5" />
                    <Skeleton className="w-100 h-5" />
                    <Skeleton className="w-100 h-5" />
                    <Skeleton className="w-100 h-5" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-row gap-8 p-4 ">

            <Tabs className="w-full">
                <Tabs.ListContainer>
                    <Tabs.List aria-label="Options">
                        {
                            tagger.group.values.map((g) => (
                                <Tabs.Tab key={g.id} id={g.id}>
                                    {g.name}
                                    <Tabs.Indicator />
                                </Tabs.Tab>
                            ))
                        }
                    </Tabs.List>
                </Tabs.ListContainer>
                {
                    tagger.group.values.map((g) => (
                        <Tabs.Panel key={g.id} className="pt-4" id={g.id}>
                            <div className="w-full flex flex-row gap-4">
                                {/* Container */}
                                <div className="flex w-1/3 bg-surface-secondary rounded-full">
                                    <PieChart
                                        style={{ width: '100%', height: '100%', aspectRatio: 1 }}
                                        responsive
                                    >
                                        <Pie
                                            data={cateValues.get(g.id)}
                                            stroke="0"
                                            dataKey={type.toString().toUpperCase()}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="60%"
                                            outerRadius="80%"
                                            isAnimationActive={true}
                                        >
                                            {cateValues.get(g.id)?.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <Select
                                        className="w-fit"
                                        value={type}
                                        onChange={(value) => setType(value as TransactionType)}
                                    >
                                        <Label>Type</Label>
                                        <Select.Trigger>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="INCOME" textValue="Income">
                                                    <Chip variant="soft" color="success">Income</Chip>
                                                </ListBox.Item>
                                                <ListBox.Item id="EXPENSE" textValue="Expense">
                                                    <Chip variant="soft" color="danger">Expense</Chip>
                                                </ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                    <div className="w-full flex flex-col gap-4 p-4">
                                        {
                                            cateValues.get(g.id)?.map((g) => (
                                                <div key={g.id} className="w-full flex flex-row justify-between items-center">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <TrComponent.Category category={g} />
                                                        <Description>{g.count} transactions</Description>
                                                    </div>
                                                    <CashShower value={g[type]} negative={type === "EXPENSE"} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </Tabs.Panel>
                    ))
                }
            </Tabs>
        </div>
    )
}