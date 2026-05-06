"use client";

import authFetch from "@services/AuthFetch";
import { ReactNode, useEffect, useState } from "react";
import GroupCategory from "@models/GroupCategory";
import CategoryContext from "@context/CategoryContext";
import TypeCategory from "@models/TypeCategory";
import { toast } from "@heroui/react";
import Category from "@models/Category";
import { API } from "@services/API";

export function CategoriesProvider({ children }: { children: ReactNode }) {
    const [groups, setGroups] = useState<GroupCategory[]>([]);

    async function fetchCategories() {
        const res = await authFetch(API.GROUP_CATEGORY.main(), {
            method: "GET"
        });
        if (!res.ok) {
            toast.danger("Something went wrong while listing the categories");
            return;
        }
        const data: GroupCategory[] = await res.json();
        setGroups(data);
    }

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

    async function newCategory(groupId: number, color: string, name: string, type: TypeCategory) {
        if (!type) {
            toast.danger("Type is necessery!");
            return;
        }
        const res = await authFetch(API.CATEGORY.main(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId,
                color,
                name,
                type
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

    async function updateCategory(groupId: number, id: number, color: string, name: string, type: TypeCategory) {
        const res = await authFetch(API.CATEGORY.byId(id), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "color": color,
                "type": type,
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

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ groups, newGroup, newCategory, updateGroup, deleteGroup, updateCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}