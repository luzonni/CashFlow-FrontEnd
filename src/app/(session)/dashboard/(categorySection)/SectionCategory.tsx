"use client";

import { Icon } from "@components/Icon";
import GroupCategory from "@models/GroupCategory";
import { useState } from "react";
import NewGroupCategoryModal from "./NewGroupCategoryModal";
import TableCategory from "./TableCategory";
import Category from "@models/Category";
import { useAction } from "@components/hooks/useConfirm";
import { toast } from "@heroui/react";
import { CategoriesProvider } from "@components/providers/CategoriesProvider";


export default function SectionCategory() {
    const [groups, setGroups] = useState<GroupCategory[]>([]);
    const { confirm } = useAction();
    return (
        <div className="flex flex-col gap-3">
            <CategoriesProvider>
                <div className="flex flex-row justify-between gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <Icon name="Type" />
                        <h1>Categorias</h1>
                    </div>
                    <div>
                        <NewGroupCategoryModal />
                    </div>
                </div>
                <div className="felx flex-col gap-1">
                    <TableCategory />
                </div>
            </CategoriesProvider>
        </div>
    )
}