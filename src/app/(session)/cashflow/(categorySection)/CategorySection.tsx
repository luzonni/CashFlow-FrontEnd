"use client";

import { Icon } from "@components/Icon";
import GroupCategoryModal from "./GroupCategoryModal";
import TableCategory from "./TableCategory";
import { Button } from "@heroui/react";
import GroupCategory from "@models/GroupCategory";
import { toast } from "@heroui/react";
import Category from "@models/Category";
import apiAction from "@services/ApiAction";
import CategoryService from "@services/CategoryService";
import { useCashflow } from "@components/hooks/useCashflow";

export default function CategorySection() {
    const { tagger } = useCashflow();

    async function handlerCreateGroup(name: string, description: string) {
        apiAction(async () => {
            const group: GroupCategory = await CategoryService.create.group(name, description);
            tagger.group.put(group);
            toast.success(`The ${name} group was created`)
        }, "Error to create a group.")
    }

    async function handlerCreateCategory(groupId: number, color: string, name: string) {
        apiAction(async () => {
            const newCategory: Category = await CategoryService.create.category(groupId, color, name);
            tagger.category.put(newCategory);
            toast.success(`Category "${name}" created!`);
        }, "Error to create a category.")
    }

    async function handlerUpdateGroup(id: number, name: string, description: string) {
        apiAction(async () => {
            const group = await CategoryService.update.group(id, name, description);
            tagger.group.update(group);
            toast.success(`The group ${name} was updated`)
        }, "Error to update group")
    }

    async function handlerDeleteGroup(group: GroupCategory) {
        apiAction(async () => {
            await CategoryService.delete.group(group.id);
            tagger.group.delete(group);
            toast.success(`The group was deleted`);
        }, "Error to delete group")
    }

    async function handlerUpdateCategory(groupId: number, id: number, color: string, name: string) {
        apiAction(async () => {
            const category = await CategoryService.update.category(groupId, id, color, name);
            tagger.category.update(category)
            toast.success(`The category "${name} was updated"`)
        }, "Error to update category")
    }

    async function handlerDeleteCategory(category: Category) {
        apiAction(async () => {
            await CategoryService.delete.category(category.id);
            tagger.category.delete(category);
            toast.danger("Delete: " + category.id);
        }, "Error to delete category");
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex bg-surface-secondary p-2 pl-4 rounded-2xl flex-row justify-between gap-2 items-center">
                <div className="flex gap-2 items-center">
                    <Icon name="Type" />
                    <h1>Category</h1>
                </div>
                <div>
                    <GroupCategoryModal
                        newGroup={handlerCreateGroup}
                    >
                        <Button>
                            <Icon name="Plus" />
                            New
                        </Button>
                    </GroupCategoryModal>
                </div>
            </div>
            <div className="felx flex-col gap-1">
                <TableCategory
                    groups={tagger.group.values}
                    newGroup={handlerCreateGroup}
                    newCategory={handlerCreateCategory}
                    updateGroup={handlerUpdateGroup}
                    updateCategory={handlerUpdateCategory}
                    deleteGroup={handlerDeleteGroup}
                    deleteCategory={handlerDeleteCategory}
                />
            </div>
        </div>
    )
}