"use client";

import { I18nProvider } from "@heroui/react";
import { ReactNode, useState } from "react";
import { useUser } from "@components/hooks/useUser";
import DateRange from "@models/DateRange";
import {
    CalendarDate,
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import { CashflowProvider } from "@components/providers/CashflowProvider";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";

export default function LocalizedLayout({ children }: { children: ReactNode }) {
    const currentDate = today(getLocalTimeZone());
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange>({
        start: new CalendarDate(
            currentDate.year,
            currentDate.month,
            1
        ),
        end: new CalendarDate(
            currentDate.year,
            currentDate.month,
            currentDate.calendar.getDaysInMonth(currentDate)
        )
    });
    const { user } = useUser();

    return (
        <I18nProvider locale={user.settings.locale}>
            <div className="flex bg-background h-screen overflow-hidden">
                <SideBar {...{ open, setOpen }} />
                <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden">
                    <HeaderBar {...{ open, setOpen, dateRange, setDateRange }} />
                    <div className="flex-1 overflow-auto rounded-2xl">
                        <CashflowProvider dateRange={dateRange}>
                            {children}
                        </CashflowProvider>
                    </div>
                </div>
            </div>
        </I18nProvider>
    )
}