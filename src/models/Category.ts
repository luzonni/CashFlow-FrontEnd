import TypeCategory from "./TypeCategory";

type Category = {
    id: number;
    name: string;
    type: TypeCategory;
    parent?: Category;
}

export default Category;