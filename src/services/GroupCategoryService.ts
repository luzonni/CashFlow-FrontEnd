import GroupCategory from "@models/GroupCategory";
import { API } from "./API";

export async function listAll(): Promise<GroupCategory[]> {
    const res = await fetch(API.GROUP_CATEGORY.main(), {
        method: "GET",
        credentials: "include"
    });
    if(!res.ok) {
        throw new Error("Erro na listagem de categorias"); //TODO melhorar isso!
    }
    const data: GroupCategory[] = await res.json();
    return data;
}

export async function newCategory(name: string, description: string): Promise<GroupCategory> {
    const res = await fetch(API.GROUP_CATEGORY.main(), {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    })
    if (!res.ok) {
        throw new Error('Erro com o servidor...'); //TODO melhorar isso!
    }
    const group: GroupCategory = await res.json()
    return group;
}

export async function dropCategory(id: number) {
    const res = await fetch(API.GROUP_CATEGORY.byId(id), {
        method: 'DELETE',
        credentials: "include"
    })
    if (!res.ok) {
        throw new Error('Erro com o servidor...'); //TODO melhorar isso!
    }
}