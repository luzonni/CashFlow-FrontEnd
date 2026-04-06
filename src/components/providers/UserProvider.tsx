"use client";

import authFetch from "@lib/AuthFetch";
import UserContext from "@context/UserContext";
import User from "@models/User";
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
            const user: User = await res.json()
            setUser(user)
        } finally {
            setLoading(false)
        }
    }

    async function login(email: string, password: string): Promise<User> {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!res.ok || !data.user) {
            throw new Error(data.message || 'Erro no login');
        }
        setUser(data.user);
        return data.user;
    }

    async function logout() {
        const res = await authFetch("/api/auth/logout", {
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
        <UserContext.Provider value={{ user, loading, refresh: loadUser, logout, login }}>
            {children}
        </UserContext.Provider>
    )
}