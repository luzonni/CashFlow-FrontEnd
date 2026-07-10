"use client";

import UserContext from "@context/UserContext";
import User from "@models/User";
import { ReactNode, useEffect, useState } from "react";
import { CODE } from "@models/Config";
import { useTheme } from "next-themes";
import LoadingScreen from "@components/LoadingScreen";
import apiAction from "@services/ApiAction";
import UserService from "@services/UserService";

export function UserProdiver({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { setTheme } = useTheme();


    async function fetchUser() {
        return apiAction(async () => {
            const data: User = await UserService.fetch();
            setUser(data)
            setTheme(data.settings.theme);
        }, "Erro while fetch user")
    }

    async function refresh() {
        try {
            await fetchUser();
        } finally {
            setLoading(false)
        }
    }

    function setSettings(code: CODE, value: string) {
        if (!user) {
            return;
        }
        apiAction(async () => {
            UserService.setSettings(code, value);
            setUser({
                ...user,
                settings: {
                    ...user.settings,
                    [code]: value
                }
            })
            if (code === "theme") {
                setTheme(value);
            }
        }, "Something was wrong while change this config");
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

    function logout() {
        apiAction(async () => {
            UserService.logout();
            setUser(null);
        })
    }

    useEffect(() => {
        refresh();
    }, []);

    if (loading) return <LoadingScreen />;

    if(!user) return <div>User not found</div>;

    return (
        <UserContext.Provider value={{ user, setSettings, setUser, refresh, hasRole, logout }}>
            {children}
        </UserContext.Provider>
    )
}