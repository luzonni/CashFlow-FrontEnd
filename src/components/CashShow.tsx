import { TransactionType } from "@models/Transaction"
import { currencyFormat } from "@utils/Currency";
import { useUser } from "./hooks/useUser";

type CashShowProps = {
    value: number;
    currency?: string;
    type?: TransactionType;
    className?: string;
}

export default function CashShow({ value, type = "INCOME", currency, className }: CashShowProps) {
    const { user } = useUser();
    if(!currency) {
        currency = user.settings.currency;
    }
    return (
        <h1 className={`${className ? className : type === "EXPENSE" ? "text-danger" : "text-success"}`}>
            {currencyFormat(
                currency,
                value,
                user.settings.locale,
                type === "EXPENSE"
            )}
        </h1>
    )
}