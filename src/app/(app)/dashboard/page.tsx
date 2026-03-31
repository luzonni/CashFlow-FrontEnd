"use client";

import { useUser } from "@/src/components/hooks/useUser"
import { Button, Skeleton, toast } from "@heroui/react";

export default function Page() {
    const { user, loading, logout } = useUser();

    if (loading) {
        return (
            <div className="shadow-panel w-[250px] space-y-5 rounded-lg bg-transparent p-4">
                <Skeleton className="h-32 rounded-lg" />
                <div className="space-y-3">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-2/5 rounded-lg" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1>This is DashBoard!</h1>
            <h1>Welcome {user?.username}!</h1>
            <Button
                variant="tertiary"
                onClick={() => {
                    toast.promise(logout(), {
                        loading: "Logouting...",
                        error: (err) => err.message,
                        success: () => `Logout!`
                    });
                }}
            >
                Logout
            </Button>
        </div >
    )
}