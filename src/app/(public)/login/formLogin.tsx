"use client";

import { Button, Checkbox, Input, Label, Link, Separator } from "@heroui/react";
import { useRouter } from 'next/navigation'
import AuthService from "@services/AuthService";
import apiAction from "@services/ApiAction";
import { useState } from "react";
import { toast } from "@heroui/react";

export default function FormLogin() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    async function onSubmit() {
        apiAction(async () => {
            const user = await AuthService.login(email, password);
            if (!user) {
                toast.danger("Email ou Senha incorreto");
            }
            toast.success(`Welcome back! ${user.username}`);
            router.push('/dashboard');
        }, "Email or Password wrong!");
    }
    return (
        <div className="flex flex-col gap-4 bg-surface p-8 rounded-2xl">
            <div className="flex gap-3 flex-col">
                <h1 className="text-2xl">Login</h1>
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
                        onPress={() => { onSubmit() }}
                    >
                        Login
                    </Button>
                </div>
            </div>
            <Separator variant="secondary"/>
            <div className="flex flex-row gap-1.5">
                <p className="text-sm">Don't have an account?</p>
                <Link href="/register" className="text-sm text-blue-500">
                    Register
                    <Link.Icon/>
                </Link>
            </div>
        </div>
    )
}