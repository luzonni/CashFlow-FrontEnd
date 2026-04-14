"use client";

import { Icon } from "@components/Icon";
import { UserProdiver } from "@components/providers/UserProvider";
import UserCard from "@components/UserCard";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    return (
        <UserProdiver>
            <div className="flex flex-col gap-2 bg-gray-200 p-2 h-screen">
                <div className="flex flex-row justify-between items-center px-4 bg-white rounded-2xl ">
                    <div className="flex flex-row items-center gap-3">
                        <img src="/LogoCashFlow.png" alt="Logo" width={100} height={100} />
                    </div>
                    <div>
                        <div className="flex flex-row p-2 rounded-4xl border-2 hover:shadow-2xl duration-200">
                            <Button onClick={() => router.push("/dashboard")} variant="secondary">
                                <Icon name="Database" />
                                Dashboard
                            </Button>
                        </div>
                    </div>
                    <div>
                        <UserCard />
                    </div>
                </div>
                <div className="overflow-y-auto">
                    {children}
                </div>
            </div>
        </UserProdiver>
    );
}