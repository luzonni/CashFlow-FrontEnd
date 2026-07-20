import Transaction, { TransactionType } from "@models/Transaction"
import { currencyFormat } from "@utils/Currency";
import { useUser } from "./hooks/useUser";

type TransactionShowerProps = {
    transaction: Transaction;
    currency?: string;
    type?: TransactionType;
    className?: string;
}

export default function TransactionShower({ transaction, currency, className }: TransactionShowerProps) {
    const { user } = useUser();
    if(!currency) {
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