"use client";

import { Button } from "@heroui/react";
import Sectioner from "./Sectioner";

type BannerProps = {
    title: string;
    description?: string;
    label: string;
    action: () => void;
}

export default function Banner({
    title,
    description,
    label,
    action
}: BannerProps) {
    return (
        <Sectioner className="bg-accent rounded-md px-8" spacing="lg" flex="row" middle>
            <Sectioner flex="col">
                <h1 className="font-bold text-2xl text-default max-w-1/2">{title}</h1>
                <p className="font-light text-md text-default">{description}</p>
            </Sectioner>
            <Button variant="secondary" onClick={action}>
                {label}
            </Button>
        </Sectioner>
    )
}