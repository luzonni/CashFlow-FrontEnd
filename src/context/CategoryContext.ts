
import { createContext } from "react";
import GroupCategory from "@models/GroupCategory";
import TypeCategory from "@models/TypeCategory";

type CategoryContextProps = {
    groups: GroupCategory[];
    newGroup: (name: string, description: string) => Promise<void>;
    newCategory: (groupId: number, color: string, name: string, type: TypeCategory) => Promise<void>;
    updateGroup: (id: number, name: string, description: string) => Promise<void>;
    deleteGroup: (id: number) => Promise<void>;
    updateCategory: (groupId: number, id: number, color: string, name: string, type: TypeCategory) => Promise<void>;
    deleteCategory: (groupId: number, id: number) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextProps | null>(null);

export default CategoryContext;