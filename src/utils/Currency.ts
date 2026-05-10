


const convert = (
    currency: string,
    value: number,
    locale: string
): string => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(value);
};

export async function currencyExchange(from: string, to: string, amount: number): Promise<number> {
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

const Currency = {
    convert
}


export default Currency;
