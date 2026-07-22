import Category from "./Category";
import LocalDate from "./LocalDate";
import PaymentMethod from "./PaymentMethod";

type Installment = {
    id: number;
    amount: number;
    currency: string;
    installments: number;
    category: Category;
    paymentMethod: PaymentMethod;
    description: string;
    date: LocalDate;
    createdAt: LocalDate;
}

export default Installment;