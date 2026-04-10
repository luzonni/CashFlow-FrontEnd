"use client";

import { Avatar, Button, Dropdown, Label, Skeleton, toast } from "@heroui/react"
import { useUser } from "./hooks/useUser"
import { Facehash } from "facehash";
import LogoutModal from "./modals/LogoutModal";
import { Icon } from "./Icon";
import { useRouter } from "next/navigation";

export default function UserCard() {
    const router = useRouter();
    const { user, hasRole, logout } = useUser();

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-36 rounded-lg" />
                    <Skeleton className="h-3 w-24 rounded-lg" />
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-row items-center gap-3 p-2 hover:shadow-2xl transition duration-300 rounded-4xl border-2">
                <Avatar className="size-12">
                    <Avatar.Fallback className="border-none bg-amber-500 text-white">
                        <Facehash name={user.username} enableBlink />
                    </Avatar.Fallback>
                </Avatar>
                <h1>{user?.username}</h1>
                {
                    hasRole("ADMIN") &&
                    <div>
                        <Button
                            onClick={() => { router.push("/adm") }}
                        ><Icon name="Settings" /></Button>
                    </div>
                }
                <LogoutModal logout={logout} />
            </div>
        </>
    )
}