"use client";

import Input from "@components/Input";
import Section from "@components/Section";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { Button, Description, FieldError, Label, TextField } from "@heroui/react";
import { useState } from "react";


export default function Page() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    return (
        <div className="flex justify-center items-center bg-gray-300 p-3 h-screen">
            <Section>
                <Section shadow gap="lg">
                    <div>
                        <h1 className="text-4xl">Register</h1>
                        <h1>Bem vindo ao CashFlow!</h1>
                        <p className="text-sm text-gray-400">Crie sua conta gratuitamente e use!</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <InputField
                            name="email"
                            label="Email"
                            value={email}
                            setValue={setEmail}
                            placeholder="louisa@gmail.com"
                            type="email"
                            validate={(value) => {
                                if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        />
                        <InputField
                            name="email"
                            label="Email"
                            value={email}
                            setValue={setEmail}
                            placeholder="louisa@gmail.com"
                            type="email"
                            validate={(value) => {
                                if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        />
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label>Password</Label>
                            <Input placeholder="Enter your password" />
                            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                            <FieldError />
                        </TextField>
                        <div className="flex gap-2 justify-end">
                            <Button type="reset" variant="secondary">
                                Reset
                            </Button>
                            <Button type="submit">
                                <CheckBadgeIcon />
                                Submit
                            </Button>
                        </div>
                    </div>
                </Section>
            </Section>
        </div>
    )
}

type InputFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    value: string;
    setValue: (value: string) => void;
    validate: (value: string) => string | null;
}

function InputField(props: InputFieldProps) {
    return (
        <TextField
            isRequired
            name={props.name}
            type={props.type}
            validate={props.validate}
        >
            <Label>{props.label}</Label>
            <Input
                placeholder={props.placeholder}
            />
            <FieldError />
        </TextField>
    )
}