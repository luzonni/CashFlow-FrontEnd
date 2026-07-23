import Installment from "@models/Installment";
import { API } from "./API"
import authFetch from "./AuthFetch"
import ErrorHandler from "./ErrorHandler";
import LocalDate from "@models/LocalDate";

export type InstallmentRequest = {
    description: string;
    amount: number;
    installments: number;
    paymentMethodId: number;
    categoryId: number;
    date: LocalDate;
    currency: string;
}

async function createInstallment(request: InstallmentRequest): Promise<Installment> {
    const res = await authFetch(API.INSTALLMENT.main(), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Installment = await res.json();
    return data;
}

async function listInstallments(): Promise<Installment[]> {
    const res = await authFetch(API.INSTALLMENT.main(), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Installment[] = await res.json();
    return data;
}

async function getPercent(id: number): Promise<Map<number, boolean>> {
    const res = await authFetch(API.INSTALLMENT.percent(id), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: Map<number, boolean> = await res.json();
    return data;
}


export default {
    list: listInstallments,
    create: createInstallment,
    percent: getPercent
}