
type Balances = {
    INCOME: BalanceItem;
    EXPENSE: BalanceItem;
};

export type BalanceItem = {
    amount: number;
    currency: string;
    count: number;
}

export default Balances;