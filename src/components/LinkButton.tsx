"use client";

import { Button, ButtonProps } from "@heroui/react";
import { useRouter } from 'next/navigation'


export default function LinkButton(props: {href: string} & ButtonProps) {
    const router = useRouter();
    return (
        <Button
            {...props}
            onClick={() => router.push(props.href) }
        />
    )
}