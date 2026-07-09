"use client";

import UserCard from "@components/UserCard";
import MenuTab from "@components/MenuTab";
import { pages } from "../../configs/pages";
import { UserProdiver } from "@components/providers/UserProvider";
import { Button, I18nProvider, Separator } from "@heroui/react";
import { Icon } from "@components/Icon";
import { ReactNode, useState } from "react";
import { useUser } from "@components/hooks/useUser";

function LocalizedLayout({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    return (
        <I18nProvider locale={user.settings.locale}>
            <div className="flex bg-background h-screen overflow-hidden">
                <aside className={`bg-background h-full border-r overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${open ? "w-full lg:w-72" : "w-0"}`}>
                    <div className={`w-full lg:w-72 h-full flex flex-col items-center p-2 gap-4 transition-all duration-300 ease-in-out ${open ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
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
                        <MenuTab list={[pages.dashboard, pages.cashflow, pages.profile, pages.report]} />
                    </div>
                </aside>
                <div className="flex-1 flex flex-col gap-2 p-2 overflow-hidden">
                    <div className="bg-surface rounded-xl p-2">
                        <Button
                            onClick={() => setOpen(!open)}
                            variant="tertiary"
                            isIconOnly
                        >
                            <Icon name="Menu" />
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto rounded-2xl">
                        {children}
                    </div>
                </div>
            </div>
        </I18nProvider>
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