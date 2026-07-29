import Balance from "./Balance"
import LocalDate from "./LocalDate";

type MonthBalance = {
    month: LocalDate;
    balance: Balance;
    revenues: Balance;
    expenses: Balance;
}


export default MonthBalance;