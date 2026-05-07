"use client";

import UserCard from "@components/UserCard";
import MenuTab from "@components/MenuTab";
import { pages } from "../../configs/pages";
import { UserProdiver } from "@components/providers/UserProvider";
import { Button, Separator } from "@heroui/react";
import { Icon } from "@components/Icon";
import { useState } from "react";

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [open, setOpen] = useState(true);
    return (
        <UserProdiver>
            <div className="flex bg-gray-200 h-screen overflow-hidden">
                <aside className={`bg-white h-full border-r overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${open ? "w-72" : "w-0"}`}>
                    <div className={`w-72 h-full flex flex-col items-center p-2 gap-4 transition-all duration-300 ease-in-out ${open ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
                        <UserCard />
                        <Separator />
                        <MenuTab list={[pages.dashboard, pages.cashflow, pages.profile, pages.report]} />
                    </div>
                </aside>
                <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden">
                    <div className="bg-white rounded-xl p-2">
                        <Button
                            onClick={() => setOpen(!open)}
                            variant="tertiary"
                            isIconOnly
                        >
                            <Icon name="Menu" />
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </UserProdiver>
    );
}