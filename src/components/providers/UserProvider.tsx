"use client";

import authFetch from "@/src/lib/AuthFetch";
import UserContext from "@/src/context/UserContext";
import User from "@/src/models/User";
import { ReactNode, useEffect, useState } from "react";

export function UserProdiver({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function loadUser() {
        try {
            const res = await authFetch('/api/auth/me', {
                method: "GET"
            })

            if (!res.ok) {
                setUser(null)
                return
            }

            const data = await res.json()
            setUser(data.user)

        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        const res = await fetch("/api/auth/logout", {
            method: "POST"
        });
        if (!res.ok) {
            throw new Error("Logout error.")
        }
        setUser(null);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, refresh: loadUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}