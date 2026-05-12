"use client";

import { Icon } from "@components/Icon";
import { Button, Chip, ColorSwatch, Skeleton, Table } from "@heroui/react";
import Transaction, { TransactionState, TransactionType } from "@models/Transaction";
import User from "@models/User";
import { copyToClipboard } from "@utils/Copy";
import { formatDate } from "@utils/DateUtils";
import { useEffect, useState } from "react";
import TransactionDisplayModal from "./TransactionDisplayModal";
import { currencyExchange, currencyFormat } from "@utils/Currency";
import TransactionModal from "./TransactionModal";
import PaymentMethod from "@models/PaymentMethod";
import GroupCategory from "@models/GroupCategory";

type TransactionTableProps = {
    user: User;
    transactions: Transaction[];
    groupsCategory: GroupCategory[];
    paymentMethods: PaymentMethod[];
    updateTransaction: (
        id: string,
        description: string,
        amount: number,
        type: TransactionType,
        state: TransactionState,
        currency: string,
        paymentMethodId: number,
        categoryId: number,
        date: string
    ) => Promise<void>;
}

export default function TransactionTable({ transactions, user, groupsCategory, paymentMethods, updateTransaction }: TransactionTableProps) {
    const [convertedValues, setConvertedValues] = useState<Record<string, number>>({});

    useEffect(() => {
        async function loadConversions() {

            if (!user) return;

            const values: Record<string, number> = {};

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

    return (
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
                                    <Table.Cell>{formatDate(t.date, user.settings.locale)}</Table.Cell>
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
                                                ? currencyFormat(
                                                    user.settings.currency,
                                                    convertedValues[t.id],
                                                    user.settings.locale
                                                )
                                                : <Skeleton className="w-full h-full" />
                                        }
                                    </Table.Cell>
                                    <Table.Cell className="flex flex-row gap-2">
                                        <TransactionDisplayModal
                                            transaction={t}
                                            updateTransaction={updateTransaction}
                                        />
                                        <TransactionModal
                                            transaction={t}
                                            groupsCategory={groupsCategory}
                                            paymentMethods={paymentMethods}
                                            updateTransaction={updateTransaction}
                                        >
                                            <Button
                                                isIconOnly
                                                variant="secondary"
                                            >
                                                <Icon name="Pen" />
                                            </Button>
                                        </TransactionModal>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    )
}