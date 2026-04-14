"use client";

import authFetch from "@services/AuthFetch";
import UserContext from "@context/UserContext";
import User from "@models/User";
import { ReactNode, useEffect, useState } from "react";
import { API } from "@services/API";

export function UserProdiver({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function refresh() {
        try {
            const res = await authFetch(API.AUTH.me(), {
                method: "GET"
            })
            if (!res.ok) {
                setUser(null);
                return
            }
            const user: User = await res.json()
            setUser(user)
        } finally {
            setLoading(false)
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
        <UserContext.Provider value={{ user, setUser, loading, refresh, hasRole, logout }}>
            {children}
        </UserContext.Provider>
    )
}