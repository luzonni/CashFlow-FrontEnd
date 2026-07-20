"use client";

import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";

import {
    Button,
    Chip,
    Description,
    Label,
    Modal,
    Spinner,
    Select,
    ListBox,
    Table,
    Checkbox
} from "@heroui/react";
import LocalDate from "@models/LocalDate";

import Transaction, {
    TransactionState,
    TransactionType,
} from "@models/Transaction";
import TransactionService, { TransactionRequest } from "@services/TransactionService";
import { copyToClipboard } from "@utils/Copy";
import { currencyExchange, currencyFormat } from "@utils/Currency";
import { formatDate } from "@utils/DateUtils";
import { useEffect, useState } from "react";
import TransactionModal from "./TransactionModal";
import TransactionShower from "@components/TransactionShower";
import apiAction from "@services/ApiAction";
import { useCashflow } from "@components/hooks/useCashflow";
import HoldButton from "@components/HoldButton";
import ConfirmAction from "@components/ConfirmAction";

type TransactionDisplayModalProps = {
    transaction: Transaction;
    updateTransaction: (
        id: string,
        request: TransactionRequest
    ) => void;
};

function getTypeColor(type: TransactionType) {
    switch (type) {
        case "INCOME":
            return "success";
        case "EXPENSE":
            return "danger";
        default:
            return "default";
    }
}

export default function TransactionDisplayModal({
    transaction,
    updateTransaction
}: TransactionDisplayModalProps) {
    const { user } = useUser();
    const { transactions, setTransactions } = useCashflow()
    const [state, setState] = useState<TransactionState>(transaction.state);

    function handlerUpdate(newState: TransactionState) {
        const request: TransactionRequest = {
            "description": transaction.description,
            "amount": transaction.amount,
            "type": transaction.type,
            "state": newState,
            "paymentMethodId": transaction.paymentMethod.id,
            "categoryId": transaction.category.id,
            "date": transaction.date
        }
        updateTransaction(
            transaction.id,
            request
        )
        setState(newState);
    }

    function handlerDelete(id: string) {
        apiAction(async () => {
            await TransactionService.delete(id);
            setTransactions(transactions.filter((t) =>
                t.id !== id)
            );
        })
    }

    return (
        <Modal>
            <Button variant="secondary" className="hidden lg:flex">
                <Icon name="Eye" />
                Show
            </Button>
            <Button variant="secondary" isIconOnly className="lg:hidden">
                <Icon name="Eye" />
            </Button>

            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon>
                                <Button
                                    variant="secondary"
                                    onClick={() => copyToClipboard(transaction.id.toString())}
                                >
                                    <Icon name="IdCard" />
                                    ID
                                </Button>
                            </Modal.Icon>
                            <Modal.Heading>
                                <div className="w-full justify-between flex flex-row items-end gap-2">
                                    <div className="flex gap-2 justify-between">
                                        <Select
                                            value={state}
                                            onChange={(value) => handlerUpdate(value as TransactionState)}
                                        >
                                            <Label>State</Label>
                                            <Select.Trigger>
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover>
                                                <ListBox>
                                                    <ListBox.Item id="CONFIRM" textValue="Confirm">
                                                        <Chip variant="secondary" color="success">Confirm</Chip>
                                                    </ListBox.Item>
                                                    <ListBox.Item id="PENDING" textValue="Pending">
                                                        <Chip variant="secondary" color="warning">Pending</Chip>
                                                    </ListBox.Item>
                                                    <ListBox.Item id="CANCELLED" textValue="Cancelled">
                                                        <Chip variant="secondary" color="danger">Cancelled</Chip>
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                    <HoldButton onConfirm={() => handlerDelete(transaction.id)} holdDuration={2000}>
                                        <Icon name="Trash" /> Delete
                                    </HoldButton>
                                </div>
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-6 p-2">
                            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label>Payment Date</Label>
                                    <div className="bg-background-tertiary rounded-2xl p-4">
                                        <Description>
                                            {
                                                formatDate(
                                                    transaction.date,
                                                    user.settings.locale
                                                )
                                            }
                                        </Description>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Created At</Label>
                                    <div className="bg-background-tertiary rounded-2xl p-4">
                                        <Description>
                                            {
                                                formatDate(
                                                    transaction.createdAt,
                                                    user.settings.locale
                                                )
                                            }
                                        </Description>
                                    </div>
                                </div>
                            </section>
                            <section className="flex flex-col gap-2">
                                <Label>Description</Label>
                                <div className="bg-background-tertiary rounded-2xl p-4">
                                    <Description>
                                        {
                                            transaction.description ||
                                            "No description"
                                        }
                                    </Description>
                                </div>
                            </section>
                            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label>Category</Label>

                                    <div className="bg-background-tertiary rounded-2xl p-4 flex items-center gap-2">
                                        <Icon name="Tag" size={18} />
                                        <Description>
                                            {transaction.category.name}
                                        </Description>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Payment Method</Label>
                                    <div className="bg-background-tertiary rounded-2xl p-4 flex items-center gap-2">
                                        <Icon name="Wallet" size={18} />
                                        <Description>
                                            {transaction.paymentMethod.name}
                                        </Description>
                                    </div>
                                </div>
                            </section>
                            <section className="flex flex-row gap-2">
                                <div className="w-full flex flex-col gap-2">
                                    <Label>
                                        Amount ({user.settings.currency})
                                    </Label>
                                    <div className="bg-background-tertiary rounded-2xl p-4 flex items-center justify-between">
                                        <TransactionShower transaction={transaction} currency={user.settings.currency} className="text-default-foreground" />
                                        <div className="flex flex-row gap-2 items-center">
                                            <Chip
                                                size="sm"
                                                color={getTypeColor(transaction.type)}
                                            >
                                                {transaction.type}
                                            </Chip>
                                        </div>
                                    </div>
                                </div>
                                {
                                    transaction.currency !== user.settings.currency && (
                                        <div className="w-full flex flex-col gap-2">
                                            <Label>
                                                Amount default ({transaction.currency})
                                            </Label>
                                            <div className="bg-background-tertiary rounded-2xl p-4 flex items-center justify-between">
                                                <TransactionShower transaction={transaction} className="text-default-foreground" />
                                                <div className="flex flex-row gap-2 items-center">
                                                    <Chip
                                                        size="sm"
                                                        color={getTypeColor(transaction.type)}
                                                    >
                                                        {transaction.type}
                                                    </Chip>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </section>
                        </Modal.Body>
                        <Modal.Footer>
                            <TransactionModal
                                transaction={transaction}
                                updateTransaction={updateTransaction}
                            >
                                <Button
                                    className="w-full"
                                    variant="secondary"
                                >
                                    <Icon name="Pen" />
                                    Edit
                                </Button>
                            </TransactionModal>
                            <Button
                                className="w-full"
                                slot="close"
                            >
                                Done
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}