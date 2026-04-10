"use client";

import UserCard from "@components/UserCard";
import MenuTab from "@components/MenuTab";
import { pages } from "../../configs/pages";
import { UserProdiver } from "@components/providers/UserProvider";

export default function layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserProdiver>
            <div className="flex flex-col gap-1.5 bg-gray-200 p-2 h-screen">
                <div className="flex flex-row justify-between bg-white items-center rounded-2xl px-2">
                    <div className="flex flex-row items-center gap-3">
                        <img src="/LogoCashFlow.png" alt="Logo" width={100} height={100} />
                    </div>
                    <div>
                        <MenuTab list={[pages.dashboard, pages.profile, pages.report]} />
                    </div>
                    <div>
                        <UserCard />
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </UserProdiver>
    )
}

