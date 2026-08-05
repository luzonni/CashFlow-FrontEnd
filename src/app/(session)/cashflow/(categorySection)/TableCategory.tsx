"use client";

import { Icon } from "@components/Icon";
import {
    Button,
    ColorSwatch,
    Separator,
    Tooltip
} from "@heroui/react";
import GroupCategory from "@models/GroupCategory";
import {
    ReactNode,
    useState
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Category from "@models/Category";
import CategoryModal from "./CategoryModal";
import { useAction } from "@components/hooks/useConfirm";
import GroupCategoryModal from "./GroupCategoryModal";

type TableCategoryProps = {
    groups: GroupCategory[];
    newGroup: (name: string, description: string) => Promise<void>;
    newCategory: (groupId: number, color: string, name: string) => Promise<void>;
    updateGroup: (id: number, name: string, description: string) => Promise<void>;
    deleteGroup: (value: GroupCategory) => Promise<void>;
    updateCategory: (groupId: number, id: number, color: string, name: string) => Promise<void>;
    deleteCategory: (value: Category) => Promise<void>;
}

export default function TableCategory(props: TableCategoryProps) {
    const { groups } = props;
    return (
        <div className="h-100 overflow-y-auto bg-surface-secondary rounded-2xl p-2 flex flex-col gap-2">
            {groups.map((g) => (
                <motion.div
                    key={g.id}
                    layout
                    className="flex flex-col gap-4 bg-surface rounded-2xl p-4"
                >
                    <RootGroup
                        group={g}
                        deleteGroup={props.deleteGroup}
                        newCategory={props.newCategory}
                        updateCategory={props.updateCategory}
                        updateGroup={props.updateGroup}
                    >
                        <motion.div layout className="flex flex-col gap-5 p-3">
                            {g.categories.map((c) => (
                                <ItemCategory
                                    key={c.id}
                                    group={g}
                                    category={c}
                                    updateCategory={props.updateCategory}
                                    deleteCategory={props.deleteCategory}
                                />
                            ))}
                        </motion.div>
                    </RootGroup>
                </motion.div>
            ))}
        </div>
    );
}

function RootGroup({
    group,
    updateGroup,
    deleteGroup,
    newCategory,
    children
}: {
    group: GroupCategory;
    children: ReactNode;
    updateGroup: (id: number, name: string, description: string) => Promise<void>;
    deleteGroup: (value: GroupCategory) => Promise<void>;
    newCategory: (groupId: number, color: string, name: string) => Promise<void>;
    updateCategory: (groupId: number, id: number, color: string, name: string) => Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    const { confirm } = useAction();

    function handerDelete(value: GroupCategory) {
        confirm(
            "Trash",
            "Delete?",
            "Delete?",
            async () => {
                deleteGroup(value);
            }
        );
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2 items-center">
                            <Icon name="Folder" />
                            <h1>{group.name}</h1>
                        </div>
                        <p className="text-gray-400">{group.description}</p>
                    </div>

                    <div className="flex flex-row gap-2">
                        <GroupCategoryModal
                            group={group}
                            updateGroup={updateGroup}
                        >
                            <Tooltip>
                                <Tooltip.Trigger>
                                    <Button
                                        isIconOnly
                                        aria-label="Close"
                                        variant="secondary"
                                    >
                                        <Icon name="Pen" />
                                    </Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>
                                    <Tooltip.Arrow />
                                    Edit
                                </Tooltip.Content>
                            </Tooltip>
                        </GroupCategoryModal>

                        <Tooltip>
                            <Tooltip.Trigger>
                                <Button
                                    isIconOnly
                                    variant="danger-soft"
                                    onClick={() => handerDelete(group)}
                                >
                                    <Icon name="Trash" />
                                </Button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <Tooltip.Arrow />
                                Delete
                            </Tooltip.Content>
                        </Tooltip>
                    </div>
                </div>

                <Separator orientation="vertical" variant="secondary" />

                <Tooltip>
                    <Tooltip.Trigger>
                        <Button
                            isIconOnly
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
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <Tooltip.Arrow />
                        Show Categories
                    </Tooltip.Content>
                </Tooltip>
            </div>
            <AnimatePresence initial={false} mode="wait">
                {open && (
                    <motion.div
                        key="wrapper"
                        layout
                        initial={{
                            opacity: 0,
                            height: 0,
                            scale: 0.98,
                            y: -6
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            scale: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            scale: 0.98,
                            y: -6
                        }}
                        transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="overflow-hidden"
                    >
                        <div className="bg-surface-secondary rounded-2xl my-2 p-2">
                            <div className="flex flex-col gap-2">
                                <div className="w-full flex flex-row justify-between items-center">
                                    <h1 className="text-sm ml-2">
                                        Categories:
                                    </h1>

                                    <CategoryModal
                                        group={group}
                                        newCategory={newCategory}
                                    >
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                        >
                                            <Icon name="Plus" />
                                        </Button>
                                    </CategoryModal>
                                </div>

                                <div className="bg-surface rounded-2xl">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ItemCategory({
    group,
    category,
    updateCategory,
    deleteCategory
}: {
    group: GroupCategory,
    category: Category;
    updateCategory: (groupId: number, id: number, color: string, name: string) => Promise<void>;
    deleteCategory: (value: Category) => Promise<void>;
}) {
    const { confirm } = useAction();

    function handerDelete(value: Category) {
        confirm(
            "Trash",
            "Delete?",
            "Delete?",
            async () => {
                deleteCategory(value);
            }
        );
    }

    return (
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full flex flex-row gap-2 items-center justify-between"
        >
            <div className="flex flex-row gap-2 items-center">
                <ColorSwatch
                    color={category.color}
                    shape="square"
                    size="sm"
                />
                <h3 className="text-xs lg:text-base">{category.name}</h3>
            </div>

            <div className="flex flex-row gap-2 items-center">
                <CategoryModal
                    group={group}
                    category={category}
                    updateCategory={updateCategory}
                >
                    <Tooltip>
                        <Tooltip.Trigger>
                            <Button
                                isIconOnly
                                variant="secondary"
                            >
                                <Icon name="Pen" />
                            </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                            <Tooltip.Arrow />
                            Edit
                        </Tooltip.Content>
                    </Tooltip>
                </CategoryModal>
                <Tooltip>
                    <Tooltip.Trigger>
                        <Button
                            isIconOnly
                            variant="danger-soft"
                            onClick={() => handerDelete(category)}
                        >
                            <Icon name="Trash" />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <Tooltip.Arrow />
                        Delet
                    </Tooltip.Content>
                </Tooltip>
            </div>
        </motion.div>
    );
}