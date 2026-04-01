"use client";

import authFetch from "@lib/AuthFetch";
import UserContext from "@context/UserContext";
import User from "@models/User";
import { ReactNode, useEffect, useState } from "react";
import { redirect } from "next/navigation";

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
        redirect("/")
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