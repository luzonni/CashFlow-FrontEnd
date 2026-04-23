"use client";

import CategoryContext from "@context/CategoryContext";
import { useContext } from "react";

export function useCategory() {
    const context = useContext(CategoryContext);
    if(!context) {
        throw new Error("useCategory must be used within a CategoriesProvider.");
    }
    return context;
}