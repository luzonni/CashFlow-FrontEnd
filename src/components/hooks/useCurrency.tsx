"use client";

import apiAction from "@services/ApiAction";
import ExchangeService from "@services/ExchangeService";
import { useEffect, useState } from "react";


export function useCurrency() {
    const [listOfCurrency, setListOfCurrenct] = useState<string[]>([]);
    useEffect(() => {
        apiAction(async () => {
            const listCurrency: string[] = await ExchangeService.currency();
            setListOfCurrenct(listCurrency);
        }, "Error while getting currency");
    }, []);
    return listOfCurrency;
}