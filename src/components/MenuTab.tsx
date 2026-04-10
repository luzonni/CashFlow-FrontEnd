"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Icon } from "./Icon";
import { Page } from "../configs/pages";

type MenuTabProps = {
    list: Page[];
}

export default function MenuTab({ list }: MenuTabProps) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className="flex flex-row p-2 gap-2 hover:shadow-2xl border-2 rounded-4xl duration-300">
            {list.map((page) => {
                const isActive = pathname.startsWith(page.pageHref);
                return (
                    <Button
                        key={page.pageKey}
                        variant={page.isDesabled ? "ghost" : (isActive ? "primary" : "secondary")}
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