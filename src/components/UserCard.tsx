"use client";

import { Avatar, Button, Dropdown, Label, toast } from "@heroui/react"
import { FaRegUser } from "react-icons/fa"
import { TiThMenu } from "react-icons/ti"
import { useUser } from "./hooks/useUser"
import { redirect, useRouter } from "next/navigation";

export default function UserCard() {
    const { user, logout } = useUser();
    const router = useRouter();

    async function onSubmit() {
        try {
            await logout();
            toast.success("GoodBye!")
            router.push("/login");
        } catch (err) {
            toast.danger("Error on logout!")
        }
    }

    return (
        <div className="flex flex-row items-center gap-3 p-2 hover:shadow-2xl transition duration-300 rounded-3xl">
            <Avatar className="size-12">
                <Avatar.Fallback className="border-none bg-linear-to-br from-pink-500 to-purple-500 text-white">
                    <FaRegUser size={20} />
                </Avatar.Fallback>
            </Avatar>
            <h1>{user?.username}</h1>
            <Dropdown>
                <Button aria-label="Menu" variant="tertiary" className="text-gray-400 hover:text-black transition duration-300">
                    <TiThMenu />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            id="profile"
                            textValue="Profile"
                            onClick={() => { redirect("/dashboard/profile") }}
                            className="flex justify-center items-center"
                        >
                            <Label>Profile</Label>
                        </Dropdown.Item>
                        <Dropdown.Item
                            id="logout"
                            textValue="Logout"
                            variant="danger"
                            onClick={() => { onSubmit() } }
                            className="flex justify-center items-center"
                        >
                            <Label>Logout</Label>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </div >
    )
}