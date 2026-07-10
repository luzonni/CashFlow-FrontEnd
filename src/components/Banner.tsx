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
        <Sectioner className="bg-accent rounded-md px-8 flex-col md:flex-row " spacing="lg" flex="row" middle>
            <Sectioner className="items-center flex flex-col text-center md:text-start md:items-start">
                <h1 className="font-bold text-2xl text-default lg:max-w-1/2">{title}</h1>
                <p className="font-light text-md text-default">{description}</p>
            </Sectioner>
            <Button variant="secondary" onClick={action}>
                {label}
            </Button>
        </Sectioner>
    )
}