import TypeCategory from "./TypeCategory";

type Category = {
    id: number;
    name: string;
    type: TypeCategory;
    color: string;
    parent?: Category;
}

export default Category;