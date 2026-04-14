"use client";

import ConfirmActionContext from "@context/ConfirmActionContext";
import { useContext } from "react";

export function useAction() {
    const context = useContext(ConfirmActionContext);
    if(!context) {
        throw new Error("useUser must be used within a UserProvider.");
    }
    return context;
}