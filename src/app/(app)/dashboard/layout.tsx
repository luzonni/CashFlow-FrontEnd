"use client";

import { useUser } from "@hooks/useUser";
import { Skeleton } from "@heroui/react";
import Section from "@components/Section";
import UserCard from "@components/UserCard";

export default function layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
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
            <Section vertical layout="between">
                <div>
                    <img src="/LogoCashFlow.png" alt="Logo" width={100} height={100} />
                </div>
                <UserCard/>
            </Section>
            <Section>
                {children}
            </Section>
        </div>
    )
}