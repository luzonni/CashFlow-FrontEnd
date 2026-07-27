"use client";

import { Button, Chip, ColorSwatch, Dropdown } from "@heroui/react"
import Category from "@models/Category"
import { useUser } from "./hooks/useUser";
import { currencyFormat } from "@utils/Currency";
import Transaction, { TransactionType } from "@models/Transaction";
import { formatDate } from "@utils/DateUtils";
import { Icon } from "./Icon";
import { copyToClipboard } from "@utils/Copy";
import PaymentMethod from "@models/PaymentMethod";



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

function PaymentMethodShower({ pm }: { pm: PaymentMethod }) {
    return (
        <div className="flex items-center gap-2">
            <ColorSwatch
                className="w-2"
                shape="square"
                color={pm.color}
            />
            {pm.name}
        </div>
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

function ButtonID({ transaction }: { transaction: Transaction }) {
    return (
        <Dropdown>
            <Button aria-label="Menu" variant="secondary" isIconOnly>
                <Icon name="IdCard" />
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => {
                    switch (key) {
                        case "copy": {
                            copyToClipboard(transaction.id.toString())
                        }
                    }
                }}>
                    <Dropdown.Item id="copy" textValue="Copy ID">
                        Copy ID <Icon name="Copy" />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default {
    Category: CategoryShower,
    PM: PaymentMethodShower,
    Cash: TransactionCash,
    State: TransactionState,
    Date: TransactionDate,
    ButtonID
}