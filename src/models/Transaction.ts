import Category from "./Category";
import PaymentMethod from "./PaymentMethod";
import TypeTransaction from "./TypeCategory";

type Transaction = {
    id: number;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    type: TypeTransaction;
    category: Category;
    date: string;
    createAt: string;
}

export default Transaction;