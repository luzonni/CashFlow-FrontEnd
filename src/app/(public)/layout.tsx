"use client";

import { ReactNode } from "react";
import { ThemeSwitch } from "@components/providers/ThemeSwitch";
import Sectioner from "@components/Sectioner";
import LinkButton from "@components/LinkButton";
import { Button, Dropdown, Label, Link } from "@heroui/react";
import { Icon } from "@components/Icon";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Sectioner flex="col" gap="md">
            {/* Header */}
            <Sectioner isLanding justify="between" spacing="sm" middle landingClassName="px-4 xl:p-0 w-full fixed top-0 backdrop-blur-xs bg-background/80 border-b-2">
                <div className="flex flex-row gap-2 items-center">
                    <img src="/logo.svg" className="h-8" />
                    <h1 className="font-fraunces text-xl font-bold">CashFlow</h1>
                </div>
                <Links justify="center" />
                <div className="md:flex flex-row gap-2 hidden">
                    <LinkButton className="w-full" href="/login" variant="primary">Login</LinkButton>
                    <LinkButton className="w-full" href="/register" variant="secondary">Register</LinkButton>
                </div>
                <div className="md:hidden">
                    <Dropdown>
                        <Button isIconOnly variant="secondary">
                            <Icon name="Menu" />
                        </Button>
                        <Dropdown.Popover>
                            <Dropdown.Menu className="w-50">
                                <Dropdown.Item textValue="New file">
                                    <LinkButton className="w-full" href="/home" variant="primary">Home</LinkButton>
                                </Dropdown.Item>
                                <Dropdown.Item textValue="New file">
                                    <LinkButton className="w-full" href="/login" variant="secondary">Login</LinkButton>
                                </Dropdown.Item>
                                <Dropdown.Item textValue="Copy link">
                                    <LinkButton className="w-full" href="/register" variant="secondary">Register</LinkButton>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>
            </Sectioner>
            <div className="h-16" />
            <div className="px-8 xl:p-0">
                {children}
            </div>

            {/* Footer */}
            <Sectioner isLanding flex="row" justify="between" middle landingClassName="border-t-2 px-4 xl:px-0" spacing="md">
                <Sectioner>
                    <h1 className="text-accent-soft-foreground">© 2026 CASHFLOW</h1>
                </Sectioner>
                <Links justify="end" />
            </Sectioner>
            <ThemeSwitch />
        </Sectioner>
    )
}

function Links({ justify }: { justify: "center" | "end" }) {
    return (
        <Sectioner flex="row" gap="md" justify={justify} className="hidden lg:flex">
            <Link href="/home#resources" >Recursos<Link.Icon /></Link>
            <Link href="/home#howitwork" >Como Funciona<Link.Icon /></Link>
            <Link href="/develop" >Develop<Link.Icon /></Link>
        </Sectioner>
    )
}