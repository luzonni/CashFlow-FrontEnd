"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Icon } from "./Icon";
import { Page } from "@configs/pages";

type MenuTabProps = {
    list: Page[];
}

export default function MenuTab({ list }: MenuTabProps) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className="w-full flex flex-col items-center p-2 gap-2">
            {list.map((page) => {
                const isActive = pathname.startsWith(page.pageHref);
                return (
                    <Button
                        className="w-full"
                        key={page.pageKey}
                        variant={isActive ? "secondary" : "ghost"}
                        onClick={() => { router.push(page.pageHref) }}
                        isDisabled={page.isDesabled}
                    >
                        <Icon name={page.pageIcon} />
                        {page.pageName}
                    </Button>
                );
            })}
        </div>
    );
}