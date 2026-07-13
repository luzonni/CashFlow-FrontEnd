"use client";

import { Button, VariantProps } from "@heroui/react";
import Sectioner from "./Sectioner";
import { tv } from "tailwind-variants/lite";

const bannerTv = tv({
    base: "rounded-md px-8 flex-col md:flex-row",
    variants: {
        bg: {
            primary: "bg-surface text-default-foreground",
            secondary: "bg-surface-foreground text-default"
        }
    },
    defaultVariants: {
        bg: "primary"
    }
})

type BannerProps = {
    title: string;
    description?: string;
    bg?: VariantProps<typeof bannerTv>["bg"];
    label: string;
    action: () => void;
}

export default function Banner({
    title,
    description,
    bg,
    label,
    action
}: BannerProps) {
    return (
        <Sectioner className={bannerTv({bg})} spacing="lg" flex="row" middle>
            <Sectioner className="items-center flex flex-col text-center md:text-start md:items-start">
                <h1 className="font-bold text-2xl lg:max-w-1/2">{title}</h1>
                <p className="font-light text-md">{description}</p>
            </Sectioner>
            <Button variant="secondary" onClick={action}>
                {label}
            </Button>
        </Sectioner>
    )
}