"use client";

import MonthBalance from "@models/MonthBalance";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, Tooltip, XAxis, YAxis } from "recharts";

type BalanceChartProps = {
    monthBalances: MonthBalance[];
}

type ChartBalance = {
    month: string;
    income: number;
    expense: number;
    balance: number;
}

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export default function BalanceChart({
    monthBalances
}: BalanceChartProps) {
    const [balances, setBalances] = useState<ChartBalance[]>();

    useEffect(() => {
        setBalances(monthBalances.map((mb) => ({
            month: months[mb.period.month],
            income: mb.revenues.amount,
            expense: mb.expenses.amount,
            balance: mb.balance.amount
        })));
    }, [monthBalances]);

    if(!balances) {
        return (
            <div>Ola!</div>
        )
    }
    return (
        <div className="w-full">
            <BarChart
                style={{ width: '100%', height: '100%', maxHeight: "20rem", aspectRatio: 1.618 }}
                responsive
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
                data={balances}
                barSize={20}
            >
                <CartesianGrid
                    strokeDasharray="5 5"
                    strokeOpacity="20%"
                    horizontal
                    vertical={false}
                />
                <XAxis name="Months" dataKey="month" />
                <YAxis tickFormatter={(value) => `${value / 1000}k`} width="auto" />
                <Tooltip
                    cursor={{
                        fill: "var(--color-accent-soft)",

                    }}
                    contentStyle={{
                        strokeWidth: "0",
                        backgroundColor: 'var(--color-surface-secondary)',
                        borderWidth: 0,
                        borderRadius: 10
                    }}
                />
                <Bar
                    name="Income"
                    dataKey="income"
                    fill="var(--color-success)"
                    radius={[5, 5, 0, 0]}
                />
                <Bar
                    name="Expense"
                    dataKey="expense"
                    fill="var(--color-danger)"
                    radius={[5, 5, 0, 0]}
                />
                <Line
                    type="monotone"
                    name="Balance"
                    dataKey="balance"
                    stroke="var(--color-accent)"
                    strokeWidth={5}
                    dot={{
                        width: 15,
                        fill: 'var(--color-accent)',
                    }}
                    activeDot={{ r: 8, stroke: 'var(--color-accent)' }}
                />
            </BarChart>
        </div>
    )
}