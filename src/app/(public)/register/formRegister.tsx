"use client";

import Input from "@components/Input";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { Button, FieldError, Form, Label, TextField, toast } from "@heroui/react";
import apiAction from "@services/ApiAction";
import AuthService from "@services/AuthService";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function FormRegister() {
    const router = useRouter();
    //TODO criar form builder!
    async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        if (data.password !== data.password_confirm) {
            toast.info("Password don't match");
            return;
        }
        apiAction(async () => {
            await AuthService.register(
                data.username.toString(),
                data.email.toString(),
                data.birthday.toString(),
                data.password.toString()
            );
            router.push('/dashboard');
        }, "Somethig was wrong.")
    }

    return (
        <div className="flex flex-col bg-surface p-8 gap-6 rounded-2xl w-120">
            <Form className="flex flex-col gap-2" onSubmit={handlerSubmit}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl">Register</h1>
                    <p className="text-sm text-gray-400 px-2">Crie sua conta gratuitamente e use!</p>
                </div>
                <div className="flex flex-col gap-3">
                    <InputField
                        name="username"
                        label="Username"
                        placeholder="louisa_"
                        type="text"
                        validate={(value) => {
                            if (!value) return null;
                            const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]+$/;
                            if (!usernameRegex.test(value)) {
                                return "Username can only contain letters, numbers, '.' and '_', without spaces or invalid patterns";
                            }
                            if (value.startsWith('.') || value.endsWith('.')) {
                                return "Username cannot start or end with a dot";
                            }
                            return null;
                        }}
                    />
                    <InputField
                        name="birthday"
                        label="Birthday"
                        type="date"
                    />
                    <InputField
                        name="email"
                        label="Email"
                        placeholder="louisa@gmail.com"
                        type="email"
                        validate={(value) => {
                            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                            if (value && !regex.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    />

                    <InputField
                        name="password"
                        label="Password"
                        type="password"
                        validate={(value) => {
                            if (!value) return null;
                            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                            if (!passwordRegex.test(value)) {
                                return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
                            }
                            return null;
                        }}
                    />

                    <InputField
                        name="password_confirm"
                        label="Confirm Password"
                        type="password"
                    />

                    <div className="flex gap-2 justify-end">
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                        <Button
                            type="submit"
                        >
                            <CheckBadgeIcon />
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

type InputFieldProps = {
    name: string;
    label: string;
    placeholder?: string;
    type: string;
    validate?: (value: string) => string | null;
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