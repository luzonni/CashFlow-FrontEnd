import Category from "./Category";

type GroupCategory = {
    id: number;
    name: string;
    description: string;
    active: boolean;
    categories: Category[];
    createAt: string;
}

export default GroupCategory;