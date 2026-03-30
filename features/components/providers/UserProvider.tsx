"use client";

import authFetch from "@/features/lib/AuthFetch";
import UserContext from "@/features/context/UserContext";
import User from "@/features/models/User";
import { ReactNode, useEffect, useState } from "react";



export function UserProdiver({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function loadUser() {
        try {
            const res = await authFetch('/api/auth/me')

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


    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if (storeUser) {
            setUser(JSON.parse(storeUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, loading, refresh: loadUser }}>
            {children}
        </UserContext.Provider>
    )
}