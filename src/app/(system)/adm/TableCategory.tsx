"use client"

import { Icon } from "@components/Icon";
import ConfirmAction from "@components/ConfirmAction";
import {
    Button,
    ButtonGroup,
    Chip,
    ColorSwatch,
    Dropdown,
    Label,
    Separator,
    toast
} from "@heroui/react";
import Category from "@models/Category";
import {
    ReactNode,
    SetStateAction,
    useState,
    useMemo
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type TableCategoryProps = {
    categories: Category[];
    setCategories: (value: SetStateAction<Category[]>) => void;
    updateTable: () => Promise<void>;
};

export default function TableCategory({
    categories,
    setCategories,
}: TableCategoryProps) {

    async function handlerDelete(id: number) {
        const res = await fetch(`/api/category/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            toast.danger("Erro ao excluir a categoria...");
            return;
        }

        const ids = await res.json();

        setCategories(prev =>
            prev?.filter(c => !ids.includes(c.id))
        );
    }

    const roots = useMemo(
        () => categories.filter(cat => !cat.parent),
        [categories]
    );

    return (
        <div className="overflow-y-auto">
            {roots.map((cat) => (
                <div key={cat.id} className="flex flex-col gap-4 p-2">
                    <RootCategory category={cat} onDelete={handlerDelete}>
                        <div className="flex flex-col gap-5 p-3">
                            {categories
                                .filter(child => child.parent?.id === cat.id)
                                .map(c => (
                                    <ItemCategory
                                        key={c.id}
                                        category={c}
                                        onDelete={handlerDelete}
                                    />
                                ))}
                        </div>
                    </RootCategory>

                    <Separator orientation="horizontal" />
                </div>
            ))}
        </div>
    );
}

function RootCategory({
    category,
    children,
    onDelete
}: {
    category: Category;
    children: ReactNode;
    onDelete: (id: number) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
                <ItemCategory onDelete={onDelete} category={category} />
                <Separator orientation="vertical" />

                <Button
                    variant="secondary"
                    onClick={() => setOpen(prev => !prev)}
                >
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon name="ChevronDown" />
                    </motion.div>
                </Button>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.25,
                            ease: "easeInOut"
                        }}
                        style={{ overflow: "hidden" }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ItemCategory({
    category,
    onDelete
}: {
    category: Category;
    onDelete: (id: number) => void;
}) {
    return (
        <motion.div
            layout
            className="w-full flex flex-row gap-2 items-center justify-between"
        >
            <div className="flex flex-row gap-2 items-center">
                <ColorSwatch
                    color={category.color}
                    shape="square"
                    size="sm"
                />
                <h3>{category.name}</h3>
                <Separator orientation="vertical" />
                <Chip
                    color={
                        category.type === "EXPENSE"
                            ? "danger"
                            : "success"
                    }
                >
                    {category.type}
                </Chip>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Dropdown>
                    <Button isIconOnly variant="secondary">
                        <Icon name="EllipsisVertical"/>
                    </Button>
                    <Dropdown.Popover>
                        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                            <Dropdown.Item id="new-file" textValue="New file">
                                <Label>Edit</Label>
                            </Dropdown.Item>
                            <Dropdown.Item id="copy-link" textValue="Copy link" variant="danger">
                                <ConfirmAction
                                    title="Really delete this category"
                                    description="Opa!"
                                    accept={() => onDelete(category.id)}
                                >
                                    <Label>Delete</Label>
                                </ConfirmAction>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </div>
        </motion.div>
    );
}