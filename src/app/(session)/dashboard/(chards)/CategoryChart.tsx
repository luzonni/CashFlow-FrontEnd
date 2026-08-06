"use client";

import apiAction from "@services/ApiAction";
import CashierService from "@services/CashierService";
import { useEffect, useState } from "react";
import Balances from "@models/Balance";
import { Label, Skeleton, Select, ListBox, Chip, Description, Separator } from "@heroui/react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { TransactionType } from "@models/Transaction";
import Category from "@models/Category";
import { useCashflow } from "@components/hooks/useCashflow";
import TrComponent from "@components/TrComponent";
import CashShower from "@components/CashShower";
import { Icon } from "@components/Icon";

type ChartType = {
    id: number;
    name: string;
    value: number;
    cat: Category;
}

export default function CategoryChart() {
    const { period, tagger } = useCashflow();
    const [catBalances, setCatBalances] = useState<Record<number, Balances>>();
    const [type, setType] = useState<TransactionType>("EXPENSE");
    const [groupFilter, setGroupFilter] = useState<number | undefined>(tagger.group.values[0] ? tagger.group.values[0].id : undefined)
    const [cateValues, setCatValues] = useState<ChartType[]>([]);
    const [total, setTotal] = useState<number>(0);

    function buildData(data: Record<number, Balances>) {
        const cats: Category[] = tagger.group.values.filter((gc) => gc.id === groupFilter)[0].categories;
        setCatValues(cats.map((c) => ({
            id: c.id,
            name: c.name,
            value: data[c.id] ? data[c.id][type].amount : 0,
            cat: c
        })));
        setTotal(cats.reduce((sum, c) => sum + (data[c.id] ? data[c.id][type].amount : 0), 0))
    }

    useEffect(() => {
        apiAction(async () => {
            const data = await CashierService.filterByCategory(period);
            setCatBalances(data);
            buildData(data);
        }, "Error while get balance of categories");
    }, [period, groupFilter, type]);

    if (!catBalances) {
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

    if (!groupFilter) {
        return (
            <div className="flex flex-col justify-center gap-2 items-center p-10">
                <Description>
                    <Icon name="Paperclip" size={50}/>
                </Description>
                <Description>
                    Create a group and categories for this function to be performed.
                </Description>
            </div>
        )
    }

    return (
        <div className="flex flex-row gap-8 p-4 ">
            <div className="flex w-1/2 bg-surface-secondary rounded-full">
                <PieChart
                    style={{ width: '100%', height: '100%', aspectRatio: 1 }}
                    responsive
                >
                    <Pie
                        data={cateValues}
                        stroke="0"
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        isAnimationActive={true}
                    >
                        {cateValues.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.cat.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div className="w-full flex flex-col items-center justify-between">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row gap-4">
                        <Select
                            className="w-1/2"
                            value={groupFilter}
                            onChange={(value) => setGroupFilter(Number(value))}
                        >
                            <Label>Groups</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    {tagger.group.values.map((state) => (
                                        <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                                            {state.name}
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                        <Select
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
                    </div>
                    <div className="flex flex-col gap-4">
                        {
                            cateValues.map((c, index) => (
                                <>
                                    <div key={c.id} className="w-full flex flex-row gap-2 items-center justify-between">
                                        <TrComponent.Category category={c.cat} />
                                        <div className="flex flex-row items-center gap-4">
                                            <Description>
                                                {Number((c.value / total) * 100).toPrecision(3)}%
                                            </Description>
                                            <CashShower value={c.value} negative={type === "EXPENSE"} className="text-foreground" />
                                        </div>
                                    </div>
                                    {
                                        index < cateValues.length - 1 && (
                                            <Separator variant="secondary" />
                                        )
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}