"use client"

import { Icon } from "@components/Icon";
import ConfirmAction from "@components/ConfirmAction";
import {
    Button,
    Chip,
    ColorSwatch,
    Dropdown,
    Label,
    Separator,
    toast,
    Tooltip
} from "@heroui/react";
import GroupCategory from "@models/GroupCategory";
import {
    ReactNode,
    SetStateAction,
    useState,
    useMemo
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Category from "@models/Category";

type TableCategoryProps = {
    groups: GroupCategory[];
    setGroups: (value: SetStateAction<GroupCategory[]>) => void;
};

export default function TableCategory({
    groups,
    setGroups
}: TableCategoryProps) {

    const roots = useMemo(
        () => groups.filter(cat => cat.active),
        [groups]
    );

    return (
        <div className="h-100 overflow-y-auto bg-gray-200 rounded-2xl p-2 flex flex-col gap-2">
            {roots.map((cat) => (
                <div key={cat.id} className="flex flex-col gap-4 bg-white rounded-2xl p-4">
                    <RootGroup group={cat}>
                        <div className="flex flex-col gap-5 p-3">
                            {cat.categories
                                .map(c => (
                                    <ItemCategory
                                        key={c.id}
                                        category={c}
                                    />
                                ))}
                        </div>
                    </RootGroup>
                </div>
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
    const [open, setOpen] = useState(false);
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
                                <Button isIconOnly variant="secondary"><Icon name="Pen" /></Button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <Tooltip.Arrow />
                                Edit
                            </Tooltip.Content>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip.Trigger>
                                <Button isIconOnly variant="danger-soft"><Icon name="Trash" /></Button>
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
    category
}: {
    category: Category;
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
                        <Icon name="EllipsisVertical" />
                    </Button>
                    <Dropdown.Popover>
                        <Dropdown.Menu
                            onAction={(key) => {
                                switch (key) {
                                    case "edit":

                                        return;
                                    case "delet":

                                        return;
                                }
                            }
                            }>
                            <Dropdown.Item id="edit">
                                <Label>Edit</Label>
                            </Dropdown.Item>
                            <Dropdown.Item id="delet" variant="danger">
                                <Label>Delete</Label>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </div>
        </motion.div>
    );
}