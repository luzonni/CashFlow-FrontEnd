"use client";

import { Icon } from "@components/Icon";
import GroupCategoryModal from "./GroupCategoryModal";
import TableCategory from "./TableCategory";
import { Button } from "@heroui/react";
import { CategoriesProvider } from "@components/providers/CategoriesProvider";

export default function SectionCategory() {
    return (
        <div className="flex flex-col gap-3">
            <CategoriesProvider>
                <div className="flex flex-row justify-between gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <Icon name="Type" />
                        <h1>Categorias</h1>
                    </div>
                    <div>
                        <GroupCategoryModal>
                            <Button>
                                <Icon name="Group" />
                                New Group
                            </Button>
                        </GroupCategoryModal>
                    </div>
                </div>
                <div className="felx flex-col gap-1">
                    <TableCategory />
                </div>
            </CategoriesProvider>
        </div>
    )
}