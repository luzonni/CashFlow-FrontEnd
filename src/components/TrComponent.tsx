"use client";

import { Chip, ColorSwatch } from "@heroui/react"
import Category from "@models/Category"
import { useUser } from "./hooks/useUser";
import { currencyFormat } from "@utils/Currency";
import Transaction, { TransactionType } from "@models/Transaction";
import { formatDate } from "@utils/DateUtils";



function CategoryShower({ category }: { category: Category }) {
    return (
        <div className="flex items-center gap-2">
            <ColorSwatch
                className="w-2"
                shape="square"
                color={category.color}
            />
            {category.name}
        </div>
    )
}

type TransactionCashProps = {
    transaction: Transaction;
    currency?: string;
    type?: TransactionType;
    className?: string;
}

function TransactionCash({ transaction, currency, className }: TransactionCashProps) {
    const { user } = useUser();
    if (!currency) {
        currency = transaction.currency;
    }
    const value = currency === transaction.currency ? transaction.defaultAmount : transaction.amount;
    return (
        <h1 className={`${className ? className : transaction.type === "EXPENSE" ? "text-danger" : "text-success"}`}>
            {currencyFormat(
                currency,
                value,
                user.settings.locale,
                transaction.type === "EXPENSE"
            )}
        </h1>
    )
}

function TransactionState({ transaction }: { transaction: Transaction }) {
    return transaction.state === "CONFIRM" ? (
        <Chip color="success" variant="soft">
            Confirm
        </Chip>
    ) : transaction.state === "CANCELLED" ? (
        <Chip color="danger" variant="soft">
            Cancelled
        </Chip>
    ) : (
        <Chip color="warning" variant="soft">
            Pending
        </Chip>
    )

}

function TransactionDate({ transaction }: { transaction: Transaction }) {
    const { user } = useUser();
    return (
        <h1>
            {formatDate(
                transaction.date,
                user.settings.locale
            )}
        </h1>
    )
}

export default {
    Category: CategoryShower,
    Cash: TransactionCash,
    State: TransactionState,
    Date: TransactionDate
}