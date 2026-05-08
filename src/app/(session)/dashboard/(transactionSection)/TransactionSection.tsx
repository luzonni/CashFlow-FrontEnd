"use client";

import { Icon } from "@components/Icon";
import { Button, Chip, Table, toast } from "@heroui/react";
import CalendarModal from "./CalendarModal";
import { useEffect, useState } from "react";
import DateRange from "@models/DateRange";
import {
    DateValue,
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import TransactionDisplayModal from "./TransactionDisplayModal";
import Transaction, { TransactionState, TransactionType } from "@models/Transaction";
import authFetch from "@services/AuthFetch";
import { API } from "@services/API";
import TransactionModal from "./TransactionModal";
import GroupCategory from "@models/GroupCategory";
import PaymentMethod from "@models/PaymentMethod";

type TransactionSectionProps = {
    groupsCategory: GroupCategory[];
    paymentMethods: PaymentMethod[];
}

function formatDate(date: DateValue): string {
    return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

export default function TransactionSection({ groupsCategory, paymentMethods }: TransactionSectionProps) {
    const [data, setData] = useState<DateRange | undefined>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetch() {
        const res = await authFetch(API.TRANSACTION.main(), {
            method: "GET"
        });
        if (!res.ok) {
            toast.danger("Something was wrong while fetch transactions...")
            return;
        }
        const data: Transaction[] = await res.json();
        setTransactions(data);
    }

    async function create(
        description: string,
        amount: number,
        type: TransactionType,
        state: TransactionState,
        paymentMethodId: number,
        categoryId: number,
        date: DateValue
    ) {
        const res = await authFetch(API.TRANSACTION.main(), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "description": description,
                "amount": amount,
                "type": type,
                "state": state,
                "paymentMethodId": paymentMethodId,
                "categoryId": categoryId,
                "date": formatDate(date)
            })
        })
        if (!res.ok) {
            toast.danger("Something was wrong while create transaction");
            return;
        }
        const data: Transaction = await res.json();
        setTransactions([...transactions, data]);
    }

    useEffect(() => {
        const currentDate = today(getLocalTimeZone());
        setData({
            start: currentDate,
            end: currentDate
        });
        fetch();
    }, []);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-row items-center gap-3 justify-between">
                <CalendarModal value={data} setValue={setData} />
                <div>
                    <TransactionModal
                        groupsCategory={groupsCategory}
                        paymentMethods={paymentMethods}
                        newTransaction={create}
                    >
                        <Button variant="secondary">
                            <Icon name="Plus" />
                            New
                        </Button>
                    </TransactionModal>
                </div>
            </div>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members">
                        <Table.Header>
                            <Table.Column isRowHeader>ID</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Payment Method</Table.Column>
                            <Table.Column>Date</Table.Column>
                            <Table.Column>Type</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Value</Table.Column>
                            <Table.Column>Display</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                transactions.map((t) => (
                                    <Table.Row>
                                        <Table.Cell>
                                            <Button isIconOnly variant="tertiary">
                                                <Icon name="IdCard" />
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>{t.category.name}</Table.Cell>
                                        <Table.Cell>{t.paymentMethod.name}</Table.Cell>
                                        <Table.Cell>{t.date.toString()}</Table.Cell>
                                        <Table.Cell>{t.type}</Table.Cell>
                                        <Table.Cell>{t.state}</Table.Cell>
                                        <Table.Cell>{t.amount}</Table.Cell>
                                        <Table.Cell><TransactionDisplayModal transaction={t} /></Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    )
}