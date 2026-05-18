"use client";

import { Icon } from "@components/Icon";
import GroupCategoryModal from "./GroupCategoryModal";
import TableCategory from "./TableCategory";
import { Button } from "@heroui/react";
import authFetch from "@services/AuthFetch";
import GroupCategory from "@models/GroupCategory";
import { toast } from "@heroui/react";
import Category from "@models/Category";
import { API } from "@services/API";

type SectionCategoryProps = {
    groups: GroupCategory[];
    setGroups: (value: GroupCategory[]) => void;
}

export default function SectionCategory({ groups, setGroups }: SectionCategoryProps) {

    async function newGroup(name: string, description: string) {
        const res = await authFetch(API.GROUP_CATEGORY.main(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        })
        if (!res.ok) {
            toast.danger("This group likely exists");
            return;
        }
        const group: GroupCategory = await res.json()
        setGroups([...groups, group]);
        toast.success(`The ${name} group was created`)
    }

    async function newCategory(groupId: number, color: string, name: string) {
        const res = await authFetch(API.CATEGORY.main(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId,
                color,
                name
            })
        })
        if (!res.ok) {
            toast.danger("This category likely exists");
            return;
        }
        const newCategory: Category = await res.json()
        setGroups(groups.map((g: GroupCategory) =>
            g.id === groupId
                ? {
                    ...g,
                    categories: [
                        ...g.categories,
                        newCategory
                    ]
                }
                : g
        ));
        toast.success(`Category "${name}" created!`);
    }

    async function updateGroup(id: number, name: string, description: string) {
        const res = await authFetch(API.GROUP_CATEGORY.byId(id), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "description": description
            })
        })
        if (!res.ok) {
            toast.danger("Erro ao atualizar o grupo!")
        }
        const data: GroupCategory = await res.json();
        setGroups(groups.map((g: GroupCategory) =>
            g.id === id ?
                data
                : g
        ));
        toast.success(`The group ${name} was updated`)
    }

    async function deleteGroup(id: number) {
        const res = await authFetch(API.GROUP_CATEGORY.byId(id), {
            method: 'DELETE'
        })
        if (!res.ok) {
            toast.danger("Error delete grouo!");
            return;
        }
        setGroups(groups.filter(g => g.id !== id));
        toast.success(`The group was deleted`);
    }

    async function updateCategory(groupId: number, id: number, color: string, name: string) {
        const res = await authFetch(API.CATEGORY.byId(id), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "color": color,
                "groupId": groupId
            })
        });
        if (!res.ok) {
            toast.danger("Erro ao atualizar a categoria!")
        }
        const data: Category = await res.json();
        setGroups(groups.map((g: GroupCategory) =>
            g.id === groupId
                ? {
                    ...g,
                    categories: g.categories.map((c: Category) =>
                        c.id === id
                            ? data :
                            c
                    )
                }
                : g
        ));
        toast.success(`The category "${name} was updated"`)
    }

    async function deleteCategory(groupId: number, id: number) {
        const res = await authFetch(API.CATEGORY.byId(id), {
            method: "DELETE"
        });
        if (!res.ok) {
            toast.danger("Error to delete category!");
            return;
        }
        setGroups(groups.map((g: GroupCategory) =>
            g.id === groupId ?
                {
                    ...g,
                    categories: g.categories.filter(c => c.id !== id)
                }
                : g
        ));
        toast.danger("Delete: " + id);
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex bg-surface-secondary p-2 rounded-2xl flex-row justify-between gap-2 items-center">
                <div className="flex gap-2 items-center">
                    <Icon name="Type" />
                    <h1>Categorias</h1>
                </div>
                <div>
                    <GroupCategoryModal
                        newGroup={newGroup}
                    >
                        <Button>
                            <Icon name="Group" />
                            New Group
                        </Button>
                    </GroupCategoryModal>
                </div>
            </div>
            <div className="felx flex-col gap-1">
                <TableCategory
                    groups={groups}
                    newGroup={newGroup}
                    newCategory={newCategory}
                    updateGroup={updateGroup}
                    updateCategory={updateCategory}
                    deleteGroup={deleteGroup}
                    deleteCategory={deleteCategory}
                />
            </div>
        </div>
    )
}