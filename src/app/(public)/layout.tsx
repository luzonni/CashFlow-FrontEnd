import { ReactNode } from "react";
import { ThemeSwitch } from "@components/providers/ThemeSwitch";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <ThemeSwitch />
            {children}
        </div>
    )
}