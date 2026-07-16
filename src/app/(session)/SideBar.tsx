"use client";

import { Icon } from "@components/Icon";
import MenuTab from "@components/MenuTab";
import UserCard from "@components/UserCard";
import { pages } from "@configs/pages";
import { Button, Separator } from "@heroui/react";

type SideProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function SideBar({ open, setOpen }: SideProps) {
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