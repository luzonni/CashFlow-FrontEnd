export const currencyFormat = (
    currency: string,
    value: number,
    locale: string,
    negative?: boolean
): string => {
    const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(Math.abs(value));

    return negative
        ? formatted.replace(/\s?(\d)/, " -$1")
        : formatted;
};

export async function currencyExchange(from: string, to: string, amount: number): Promise<number> {
    if(from === to) {
        return amount;
    }
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${from}&to=${to}`, {
        method: "GET"
    }
    );
    if (!res.ok) {
        return 0;
    }
    const data = await res.json();
    return data.rates[to];
}