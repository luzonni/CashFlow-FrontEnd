"use client";

import UserCard from "@components/UserCard";
import MenuTab from "@components/MenuTab";
import { pages } from "../../configs/pages";
import { UserProdiver } from "@components/providers/UserProvider";
import { Button, I18nProvider, Label, Separator } from "@heroui/react";
import { Icon } from "@components/Icon";
import { ReactNode, useState } from "react";
import { useUser } from "@components/hooks/useUser";
import MonthPicker from "@components/MonthPicker";
import DateRange from "@models/DateRange";
import {
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import { CashflowProvider } from "@components/providers/CashflowProvider";

function LocalizedLayout({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange>({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone())
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

type HeaderBarProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    dateRange: DateRange;
    setDateRange: (value: DateRange) => void;
}

function HeaderBar({ open, setOpen, dateRange, setDateRange }: HeaderBarProps) {
    return (
        <div className="flex flex-row  items-center justify-between bg-surface rounded-xl p-2 px-4">
            {/* Left */}
            <div className="flex flex-row gap-2 items-center">
                <Button
                    onClick={() => setOpen(!open)}
                    variant="tertiary"
                    isIconOnly
                >
                    <Icon name="Menu" />
                </Button>
                <div className="flex flex-row items-center gap-1 bg-surface-secondary rounded-full pr-4">
                    <Button isIconOnly aria-label="Search" variant="secondary">
                        {/* Abrir modal de pesquisa */}
                        <Icon name="Search" />
                    </Button>
                    <Label>Search</Label>
                </div>
            </div>
            {/* Middle */}
            <div className="flex flex-row gap-4 items-center">

            </div>
            {/* Rigth */}
            <div className="flex flex-row gap-4 items-center">
                <MonthPicker value={dateRange} setValue={setDateRange} />
            </div>
        </div>
    )
}

type SideProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

function SideBar({ open, setOpen }: SideProps) {
    return (
        <aside className={`bg-background h-full border-r overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${open ? "w-full lg:w-72" : "w-0"}`}>
            <div className={`w-full lg:w-72 h-full flex flex-col items-center p-2 gap-4 justify-between transition-all duration-300 ease-in-out ${open ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
                {/* Top */}
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex flex-row gap-2 items-center justify-between">
                        <UserCard className="lg:w-full w-fit" />
                        <Button
                            className="flex lg:hidden"
                            onClick={() => setOpen(!open)}
                            variant="tertiary"
                            isIconOnly
                        >
                            <Icon name="Menu" />
                        </Button>
                    </div>
                    <Separator variant="secondary" />
                    <MenuTab list={[pages.dashboard, pages.cashflow, pages.profile, pages.report]} />
                </div>
                {/* Bottom */}
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-accent">Cashflow</h1>
                    <h1 className="text-sm">2026 by @lucaszonzini_</h1>
                </div>
            </div>
        </aside>
    )
}

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserProdiver>
            <LocalizedLayout>
                {children}
            </LocalizedLayout>
        </UserProdiver>
    );
}