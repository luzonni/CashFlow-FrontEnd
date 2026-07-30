"use client";

import { I18nProvider } from "@heroui/react";
import { ReactNode, useState } from "react";
import { useUser } from "@components/hooks/useUser";
import {
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import { CashflowProvider } from "@components/providers/CashflowProvider";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";
import MonthPeriod from "@models/MonthPeriod";

export default function LocalizedLayout({ children }: { children: ReactNode }) {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const currentDate = today(getLocalTimeZone());
    const [period, setPeriod] = useState<MonthPeriod>({
        month: currentDate.month,
        year: currentDate.year
    });

    return (
        <I18nProvider locale={user.settings.locale}>
            <div className="flex bg-background h-screen overflow-hidden">
                <SideBar {...{ open, setOpen }} />
                <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden">
                    <HeaderBar {...{ open, setOpen, period, setPeriod }} />
                    <div className="flex-1 overflow-auto rounded-2xl">
                        <CashflowProvider period={period}>
                            {children}
                        </CashflowProvider>
                    </div>
                </div>
            </div>
        </I18nProvider>
    )
}