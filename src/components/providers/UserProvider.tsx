"use client";

import authFetch from "@services/AuthFetch";
import UserContext from "@context/UserContext";
import User from "@models/User";
import { ReactNode, useEffect, useState } from "react";
import { API } from "@services/API";
import { CODE } from "@models/Config";
import { toast } from "@heroui/react";
import { useTheme } from "next-themes";

export function UserProdiver({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { setTheme } = useTheme();


    async function fetchUser() {
        const res = await authFetch(API.AUTH.me(), {
            method: "GET"
        })
        if (!res.ok) {
            setUser(null);
            return
        }
        const data: User = await res.json()
        setUser(data)
        setTheme(data.settings.theme);
    }

    async function refresh() {
        try {
            await fetchUser();
        } finally {
            setLoading(false)
        }
    }

    async function setSettings(code: CODE, value: string) {
        if(!user) {
            return;
        }
        const res = await authFetch(API.USER.SETTINGS.main(), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({[code]: value})
        })
        if(!res.ok) {
            toast.danger("Something was wrong while change this config")
            return;
        }
        setUser({
            ...user,
            settings: {
                ...user.settings,
                [code]: value
            }
        })
        if(code === "theme") {
            setTheme(value);
        }
    }

    function hasRole(role: string): boolean {
        if (!user) {
            return false;
        }
        if (user.roles.includes(role)) {
            return true;
        }
        return false;
    }

    async function logout() {
        const res = await authFetch(API.AUTH.logout(), {
            method: "POST"
        });
        if (!res.ok) {
            throw new Error("Logout error.")
        }
        setUser(null);
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <UserContext.Provider value={{ user, setSettings, setUser, loading, refresh, hasRole, logout }}>
            {children}
        </UserContext.Provider>
    )
}