
type Balances = {
    INCOME: BalanceItem;
    EXPENSE: BalanceItem;
};

export type BalanceItem = {
    amount: number;
    count: number;
}

export default Balances;