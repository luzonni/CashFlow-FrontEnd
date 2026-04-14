import TypeCategory from "./TypeCategory";

type Category = {
    id: number;
    groupId: number;
    name: string;
    color: string;
    type: TypeCategory,
    active: boolean;
    createAt: string;
};

export default Category;