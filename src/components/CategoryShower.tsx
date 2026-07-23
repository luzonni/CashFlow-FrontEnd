import { ColorSwatch } from "@heroui/react";
import Category from "@models/Category";


export default function CategoryShower({ category }: { category: Category }) {
    return (
        <div className="flex items-center gap-2">
            <ColorSwatch
                className="w-2"
                shape="square"
                color={category.color}
            />
            {category.name}
        </div>
    )
}