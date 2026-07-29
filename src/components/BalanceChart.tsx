"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, Tooltip, XAxis, YAxis } from "recharts";

type BalanceChartProps = {

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

}: BalanceChartProps) {
    const [balances, setBalances] = useState<ChartBalance[]>();
    const data: ChartBalance[] = [
        { month: "Feb", income: 4100, expense: 2500, balance: 1600 },
        { month: "Mar", income: 3800, expense: 3100, balance: 700 },
        { month: "Apr", income: 4700, expense: 2900, balance: 1800 },
        { month: "May", income: 4300, expense: 2700, balance: 1600 },
        { month: "Jun", income: 5100, expense: 3200, balance: 1900 },
        { month: "Jul", income: 4800, expense: 3400, balance: 1400 },
    ];
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
                data={data}
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
                    radius={[10, 10, 0, 0]}
                />
                <Bar
                    name="Expense"
                    dataKey="expense"
                    fill="var(--color-danger)"
                    radius={[10, 10, 0, 0]}
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