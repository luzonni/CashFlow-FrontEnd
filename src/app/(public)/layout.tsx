"use client";

import { useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const { setTheme } = useTheme();
    useEffect(() => {
        setTheme("ligth")
    }, []);
    return (
        <div>
            {children}
        </div>
    )
}