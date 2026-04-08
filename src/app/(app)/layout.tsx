"use client";

import { useUser } from "@hooks/useUser";
import { Button, Skeleton, Tooltip } from "@heroui/react";
import Section from "@components/Section";
import UserCard from "@components/UserCard";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { loading } = useUser();

    if (loading) {
        return (
            <div className="shadow-panel space-y-5 rounded-lg bg-transparent p-4">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5 bg-gray-200 p-2 h-screen">
            <div className="flex flex-row justify-between bg-white items-center rounded-2xl px-2">
                <div className="flex flex-row items-center gap-3">
                    <img src="/LogoCashFlow.png" alt="Logo" width={100} height={100} />
                    <Tooltip delay={0}>
                        <Button size="lg" variant="secondary" onClick={() => { router.push("/dashboard") }}>
                            <AiFillHome />
                        </Button>
                        <Tooltip.Content>
                            <p>Home</p>
                        </Tooltip.Content>
                    </Tooltip>
                </div>
                <div>
                    <UserCard />
                </div>
            </div>
            <Section>
                {children}
            </Section>
        </div>
    )
}