"use client";

import { Button, Checkbox, Input, Label } from "@heroui/react";


export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="drop-shadow-2xl p-4 rounded-2xl bg-gray-200 h-auto">
                <div className="flex gap-3 flex-col">
                    <div className="flex justify-around align-middle items-center">
                        <h1 className="text-3xl">Cash<span className="text-orange-500">Flow</span></h1>
                        <h3>Login</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-type-email">Email</Label>
                        <Input id="input-type-email" placeholder="louisa@example.com" type="email" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-type-password">Password</Label>
                        <Input id="input-type-password" type="password" />
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
                        <Button id="input-type-done">Done</Button>
                    </div>
                </div>
                <div className="py-3">
                    <p>Have an account? <a href="/login" className="text-blue-600">Login!</a></p>
                </div>
            </div>
        </div>
    )
}