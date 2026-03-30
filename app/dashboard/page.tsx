"use client";

import { useUser } from "@/features/components/hooks/useUser"
import { redirect } from "next/navigation";

export default function Page() {
    const {user} = useUser();

    if(!user) {
        redirect("/login");
    }

    return (
        <div>
            <h1>This is DashBoard!</h1>
            <h1>Welcome {user?.username}!</h1>
        </div>
    )
}