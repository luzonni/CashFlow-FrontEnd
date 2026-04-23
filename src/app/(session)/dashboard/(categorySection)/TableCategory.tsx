"use client";

import { Icon } from "@components/Icon";
import {
    Button,
    Chip,
    ColorSwatch,
    Dropdown,
    Label,
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
import NewCategoryModal from "./NewCategoryModal";
import { useCategory } from "@components/hooks/useCategory";
import { useAction } from "@components/hooks/useConfirm";


export default function TableCategory() {
    const { groups } = useCategory();

    return (
        <div className="h-100 overflow-y-auto bg-gray-200 rounded-2xl p-2 flex flex-col gap-2">
            {groups.map((g) => (
                <motion.div
                    key={g.id}
                    layout
                    className="flex flex-col gap-4 bg-white rounded-2xl p-4"
                >
                    <RootGroup
                        group={g}
                    >
                        <motion.div layout className="flex flex-col gap-5 p-3">
                            {g.categories.map((c) => (
                                <ItemCategory
                                    key={c.id}
                                    groupId={g.id}
                                    category={c}
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
    children
}: {
    group: GroupCategory;
    children: ReactNode;
}) {
    const { updateGroup, deleteGroup } = useCategory();
    const [open, setOpen] = useState(false);
    const { confirm } = useAction();

    function handerDelete(id: number) {
        confirm(
            "Trash",
            "Delete?",
            "Delete?",
            async () => {
                deleteGroup(id);
            }
        );
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <h1>{group.name}</h1>
                        <p className="text-gray-400">{group.description}</p>
                    </div>

                    <div className="flex flex-row gap-2">
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

                        <Tooltip>
                            <Tooltip.Trigger>
                                <Button
                                    isIconOnly
                                    variant="danger-soft"
                                    onClick={() => handerDelete(group.id)}
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

                <Separator orientation="vertical" />

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

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div>
                            <div className="w-full flex flex-row justify-between items-center p-2">
                                <div>
                                    <h1 className="text-xl font-bold">Categories:</h1>
                                </div>
                                <NewCategoryModal 
                                    group={group}
                                />
                            </div>
                            <Separator/>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ItemCategory({
    groupId,
    category
}: {
    groupId: number,
    category: Category;
}) {
    const { deleteCategory } = useCategory();
    const { confirm } = useAction();

    function handerDelete(id: number) {
        confirm(
            "Trash",
            "Delete?",
            "Delete?",
            async () => {
                deleteCategory(groupId, id);
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
                        <Icon name="EllipsisVertical" />
                    </Button>

                    <Dropdown.Popover>
                        <Dropdown.Menu
                            onAction={(key) => {
                                switch (key) {
                                    case "edit":

                                        return;
                                    case "delete":
                                        handerDelete(category.id);
                                        return;
                                }
                            }}
                        >
                            <Dropdown.Item id="edit">
                                <Label>Edit</Label>
                            </Dropdown.Item>

                            <Dropdown.Item id="delete" variant="danger">
                                <Label>Delete</Label>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </div>
        </motion.div>
    );
}