"use client";

import { Icon } from "@components/Icon";
import { Button, Chip, ColorSwatch, Skeleton, Spinner, Table, toast } from "@heroui/react";
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
import Currency, { currencyExchange } from "@utils/Currency";
import { formatDate } from "@utils/DateUtils";
import { copyToClipboard } from "@utils/Copy";
import { useUser } from "@components/hooks/useUser";

type TransactionSectionProps = {
    groupsCategory: GroupCategory[];
    paymentMethods: PaymentMethod[];
}

function formatDateValue(date: DateValue): string {
    return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

export default function TransactionSection({ groupsCategory, paymentMethods }: TransactionSectionProps) {
    const { user, loading } = useUser();
    const [date, setDate] = useState<DateRange | undefined>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [convertedValues, setConvertedValues] = useState<Record<number, number>>({});

    async function fetchTransactions(date: DateRange) {
        const res = await authFetch(API.TRANSACTION.between(date.start.toString(), date.end.toString()), {
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
        currency: string,
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
                "currency": currency,
                "paymentMethodId": paymentMethodId,
                "categoryId": categoryId,
                "date": formatDateValue(date)
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
        setDate({
            start: currentDate,
            end: currentDate
        });
    }, []);

    useEffect(() => {
        if(date)
            fetchTransactions(date);
    }, [date])

    useEffect(() => {
        async function loadConversions() {

            if (!user) return;

            const values: Record<number, number> = {};

            for (const t of transactions) {

                if (t.currency === user.settings.currency) {
                    values[t.id] = t.amount;
                    continue;
                }

                values[t.id] = await currencyExchange(
                    t.currency,
                    user.settings.currency,
                    t.amount
                );
            }

            setConvertedValues(values);
        }
        loadConversions();
    }, [transactions, user]);

    if (loading || !user) {
        return (
            <div>
                loaidn
            </div>
        )
    }


    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-row items-center gap-3 justify-between">
                <CalendarModal value={date} setValue={setDate} />
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
                                    <Table.Row key={t.id}>
                                        <Table.Cell>
                                            <Button
                                                isIconOnly
                                                variant="tertiary"
                                                onClick={() => copyToClipboard(t.id.toString())}
                                            >
                                                <Icon name="IdCard" />
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <ColorSwatch className="w-2" shape="square" color={t.category.color} />
                                                {t.category.name}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <ColorSwatch className="w-2" shape="square" color={t.paymentMethod.color} />
                                                {t.paymentMethod.name}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>{formatDate(t.date.toString(), user.settings.locale)}</Table.Cell>
                                        <Table.Cell>
                                            {
                                                t.type === "EXPENSE" ?
                                                    <Chip color="danger" variant="soft">Expense</Chip>
                                                    :
                                                    <Chip color="success" variant="soft">Income</Chip>
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                t.state === "CONFIRM" ?
                                                    <Chip color="success" variant="soft">Confirm</Chip>
                                                    :
                                                    t.state === "CANCELLED" ?
                                                        <Chip color="danger" variant="soft">Canceled</Chip>
                                                        :
                                                        <Chip color="warning" variant="soft">Pendding</Chip>

                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                convertedValues[t.id] !== undefined
                                                    ? Currency.convert(
                                                        user.settings.currency,
                                                        convertedValues[t.id],
                                                        user.settings.locale
                                                    )
                                                    : <Skeleton className="w-full h-full" />
                                            }
                                        </Table.Cell>
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