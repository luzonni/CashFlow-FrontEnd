"use client";

import CashflowContext from "@context/CashflowContext";
import { useContext } from "react";

export function useCashflow() {
    const context = useContext(CashflowContext);
    if(!context) {
        throw new Error("useCashflow must be used within a CashflowProvider.");
    }
    return context;
}