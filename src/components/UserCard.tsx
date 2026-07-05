"use client";

import { Avatar } from "@heroui/react"
import { useUser } from "./hooks/useUser"
import { Facehash } from "facehash";
import LogoutModal from "./modals/LogoutModal";

export default function UserCard() {
    const { user, logout } = useUser();

    return (
        <>
            <div className="w-full flex flex-row items-center justify-around gap-3 p-2">
                <Avatar className="size-12">
                    <Avatar.Fallback className="border-none bg-amber-500 text-white">
                        <Facehash name={user.username} enableBlink />
                    </Avatar.Fallback>
                </Avatar>
                <h1>{user.username}</h1>
                <LogoutModal logout={logout} />
            </div>
        </>
    )
}