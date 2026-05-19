"use service";

import RuleType from "@models/RuleType";
import authFetch from "./AuthFetch";
import { API } from "./API";
import ErrorHandler from "./ErrorHandler";
import PaymentRule from "@models/PaymentRule";

async function fetchRules(): Promise<PaymentRule[]> {
    const res = await authFetch(API.PAYMENT_RULE.main(), {
        method: "GET"
    });
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: PaymentRule[] = await res.json();
    return data;
}


async function createByCategory(idParent: number, type: RuleType, config: string): Promise<PaymentRule> {
    const res = await authFetch(API.PAYMENT_RULE.main(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "categoryId": idParent,
            "type": type,
            "config": config
        })
    })
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: PaymentRule = await res.json();
    return data;
}

async function createByPaymentMethod(idParent: number, type: RuleType, config: string): Promise<PaymentRule> {
    const res = await authFetch(API.PAYMENT_RULE.main(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "paymentMethodId": idParent,
            "type": type,
            "config": config
        })
    })
    if(!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: PaymentRule = await res.json();
    return data;
}

export default {
    list: fetchRules,
    create: {
        byCategory: createByCategory,
        byPaymentMethid: createByPaymentMethod
    }
}