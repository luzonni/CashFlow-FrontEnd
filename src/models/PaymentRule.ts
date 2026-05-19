import Category from "./Category";
import PaymentMethod from "./PaymentMethod";

type PaymentRule = {
    id: number;
    category?: Category;
    paymentMethod?: PaymentMethod;
    
}

export default PaymentRule;