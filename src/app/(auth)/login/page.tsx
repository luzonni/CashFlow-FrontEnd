"use client";

import { useUser } from "@components/hooks/useUser";
import { Button, Checkbox, Input, Label, toast } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Section from "@components/Section";


export default function Page() {
    const { refresh, user } = useUser();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (user) {//TODO isso não é correto!
            redirect('/dashboard')
        }
    }, [user])

    async function handleLogin() {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!res.ok || !data.success) {
            throw new Error(data.message || 'Erro no login')
        }
        await refresh()
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-300">
            <Section>
                <Section shadow>
                    <div className="flex gap-3 flex-col">
                        <h3>Login</h3>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="input-type-email">Email</Label>
                            <Input
                                id="input-type-email"
                                placeholder="louisa@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="input-type-password">Password</Label>
                            <Input
                                id="input-type-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Checkbox id="save-login">
                            <Checkbox.Control>
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Content>
                                <Label htmlFor="save-login">Save Login</Label>
                            </Checkbox.Content>
                        </Checkbox>
                        <div className="flex gap-1 justify-end">
                            <Button
                                id="input-type-done"
                                onPress={() => {
                                    setEmail("");
                                    setPassword("");
                                }}
                                variant="secondary"
                            >
                                Reset
                            </Button>
                            <Button
                                id="input-type-done"
                                onPress={() => {
                                    toast.promise(handleLogin(), {
                                        loading: "Loading user...",
                                        error: (err) => err.message,
                                        success: () => `Welcome back, ${user?.username}!`
                                    });
                                }}
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-row gap-1.5 py-3">
                        <p>Don't have an account?</p>
                        <Link href="/register" className="text-blue-500">
                            Register
                        </Link>
                    </div>
                </Section>
            </Section>
        </div>
    )
}