import { currencyFormat } from "@utils/Currency";
import { useUser } from "./hooks/useUser";

type CashShowerProps = {
    value: number;
    negative?: boolean;
    currency?: string;
    className?: string;
}

export default function CashShower({ value, negative = false, currency, className }: CashShowerProps) {
    const { user } = useUser();
    if(!currency) {
        currency = user.settings.currency
    }
    return (
        <h1 className={`${className ? className : negative ? "text-danger" : "text-success"}`}>
            {currencyFormat(
                currency,
                value,
                user.settings.locale,
                negative
            )}
        </h1>
    )
}