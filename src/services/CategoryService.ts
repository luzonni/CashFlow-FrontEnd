import GroupCategory from "@models/GroupCategory";
import authFetch from "./AuthFetch";
import { API } from "./API";
import Category from "@models/Category";
import ErrorHandler from "./ErrorHandler";

async function listGroups(): Promise<GroupCategory[]> {
    const res = await authFetch(API.GROUP_CATEGORY.main(), {
        method: "GET"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: GroupCategory[] = await res.json();
    return data;
}

async function createGroup(name: string, description: string): Promise<GroupCategory> {
    const res = await authFetch(API.GROUP_CATEGORY.main(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
    const data: GroupCategory = await res.json();
    return data;
}

async function createCategory(groupId: number, color: string, name: string): Promise<Category> {
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
        throw await ErrorHandler.throw(res);
    }
    const data: Category = await res.json()
    return data;
}

async function updateCategory(groupId: number, id: number, color: string, name: string): Promise<Category> {
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
        throw await ErrorHandler.throw(res);
    }
    const data: Category = await res.json();
    return data
}

async function updateGroup(id: number, name: string, description: string): Promise<GroupCategory> {
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
        throw await ErrorHandler.throw(res);
    }
    const data: GroupCategory = await res.json();
    return data;
}

async function deleteGroup(id: number): Promise<void> {
    const res = await authFetch(API.GROUP_CATEGORY.byId(id), {
        method: 'DELETE'
    })
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
}

async function deleteCategory(id: number): Promise<void> {
    const res = await authFetch(API.CATEGORY.byId(id), {
        method: "DELETE"
    });
    if (!res.ok) {
        throw await ErrorHandler.throw(res);
    }
}

export default {
    list: {
        group: listGroups,
        category: () => {}
    },
    delete: {
        group: deleteGroup,
        category: deleteCategory
    },
    create: {
        group: createGroup,
        category: createCategory
    },
    update: {
        group: updateGroup,
        category: updateCategory
    }
}