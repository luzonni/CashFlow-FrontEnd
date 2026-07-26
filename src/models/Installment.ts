import Category from "./Category";
import LocalDate from "./LocalDate";
import PaymentMethod from "./PaymentMethod";
import Transaction from "./Transaction";

type Installment = {
    id: number;
    amount: number;
    currency: string;
    installments: number;
    conclusions: number;
    category: Category;
    paymentMethod: PaymentMethod;
    description: string;
    date: LocalDate;
    transactions: Transaction[];
    createdAt: LocalDate;
}

export default Installment;