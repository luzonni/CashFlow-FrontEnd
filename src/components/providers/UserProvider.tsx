"use client";

import UserContext from "@context/UserContext";
import User from "@models/User";
import { ReactNode, useEffect, useState } from "react";
import { CODE } from "@models/Config";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import LoadingScreen from "@components/LoadingScreen";
import apiAction from "@services/ApiAction";
import UserService from "@services/UserService";

export function UserProdiver({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { setTheme } = useTheme();
    const router = useRouter();


    async function fetchUser() {
        await apiAction(async () => {
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

    useEffect(() => {
        if (!loading && !user) {
            //router.replace("/login");
        }
    }, [loading, user, router]);

    if (loading || !user) return <LoadingScreen />;

    return (
        <UserContext.Provider value={{ user, setSettings, setUser, refresh, hasRole, logout }}>
            {children}
        </UserContext.Provider>
    )
}