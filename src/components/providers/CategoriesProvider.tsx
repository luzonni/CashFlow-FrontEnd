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
            throw new Error("Erro na listagem de categorias"); //TODO melhorar isso!
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
            toast.danger("Error");
            return;
        }
        const group: GroupCategory = await res.json()
        setGroups([...groups, group]);
    }

    async function newCategory(groupId: number, color: string, name: string, type: TypeCategory) {
        if (!type) {
            toast.danger("Type is necessery!");
            return;
        }
        try {
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
                if (res.status == 409) {
                    throw new Error("Categoria já criada!");
                }
                throw new Error("Erro inesperado!"); //TODO melhorar isso!
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
        } catch (err) {
            toast.danger(String(err));
        }
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
            throw new Error("Erro com o servidor..."); //TODO melhorar isso!
        }
        const data: GroupCategory = await res.json();
        //atualizar a lista
    }

    async function deleteGroup(id: number) {
        const res = await authFetch(API.GROUP_CATEGORY.byId(id), {
            method: 'DELETE'
        })
        if (!res.ok) {
            toast.danger("Error delete grouo!");
            return;
        }
        //atualizar a lista
        setGroups(groups.filter(g => g.id !== id));
    }

    async function updateCategory(griupId: number, id: number, color: string, name: string, type: TypeCategory) {

    }

    async function deleteCategory(groupId: number, id: number) {
        // const res = await authFetch(API.CATEGORY.byId(id), {
        //     method: "DELETE"
        // });
        // if (!res.ok) {
        //     toast.danger("Error to delete category!");
        //     return;
        // }
        toast.danger("Delete: " + id)
        setGroups(groups.map((g: GroupCategory) => 
            g.id === groupId ?
            {
                ...g,
                categories: g.categories.filter(c => c.id !== id)
            }
            : g
        ));
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