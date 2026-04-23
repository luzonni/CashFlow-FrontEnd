"use client";

import { useUser } from "@components/hooks/useUser"
import { Icon } from "@components/Icon";
import { Button, Chip, ColorSwatch, Table, toast, Tooltip } from "@heroui/react";
import GroupCategory from "@models/GroupCategory";
import { useEffect, useState } from "react";
import TableCategory from "../../(session)/dashboard/(categorySection)/TableCategory";
import CreateNewCategoryModal from "./CreateNewCategoryModal";
import { useAction } from "@components/hooks/useConfirm";
import { API } from "@services/API";


export default function Page() {
    const { user } = useUser();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<GroupCategory[]>([]);
    const [prevCategory, setPrevCategory] = useState<GroupCategory | undefined>(undefined);
    const { confirm } = useAction()

    async function refresh() {
        const res = await fetch(API.CATEGORY.main(), {
            method: "GET",
            credentials: "include"
        });
        const data: GroupCategory[] = await res.json();
        setCategories(data);
    }

    async function handlerDelete(category: GroupCategory) {
        confirm(
            "Trash",
            `Do you really delete "${category.name}"?`,
            "If you delete a root, its children will be automatically deleted, be careful!",
            async () => {
                const res = await fetch(API.CATEGORY.byId(category.id), {
                    method: "DELETE",
                    credentials: "include"
                });
                if (!res.ok) {
                    toast.danger("Erro ao excluir a categoria...");
                    return;
                }
                setCategories(categories.filter(c => c.id !== category.id));
            }
        )
    }

    async function handlerEdit(category: GroupCategory) {
        setPrevCategory(category);
        setOpen(true);
    }

    useEffect(() => {
        refresh();
    }, [])

    if (!user || !categories) {
        return (
            <div>what?</div>
        )
    }

    return (
        <>
            <CreateNewCategoryModal
                isOpen={isOpen}
                setOpen={setOpen}
                prevCategory={prevCategory}
                categories={categories}
                setCategories={setCategories}
            />
            <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div className="flex flex-col gap-4 bg-white rounded-2xl p-6">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2">
                            <Icon name="Tag" />
                            <h1>Categorias Padrão</h1>
                        </div>
                        <div>
                            <Button onClick={() => {
                                setPrevCategory(undefined);
                                setOpen(true);
                            }}>
                                <Icon name="Plus" />
                                New
                            </Button>
                        </div>
                    </div>
                    <div className="max-h-120">
                        <Table>
                            <Table.ScrollContainer>
                                <Table.Content>
                                    <Table.Header>
                                        <Table.Column isRowHeader>Category</Table.Column>
                                        <Table.Column>Type</Table.Column>
                                        <Table.Column>Action</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            categories.map((c) => (
                                                <Table.Row key={c.id}>
                                                    <Table.Cell>
                                                        <div className="flex flex-row gap-2 items-center">
                                                            <ColorSwatch shape="square" color={c.color} />
                                                            {c.name}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Chip color={c.type === "EXPENSE" ? "danger" : "success"}>
                                                            {c.type}
                                                        </Chip>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex flex-row gap-2">
                                                            <Tooltip>
                                                                <Tooltip.Trigger>
                                                                    <Button 
                                                                        isIconOnly 
                                                                        variant="secondary"
                                                                        onClick={() => handlerEdit(c)}
                                                                    ><Icon name="Pen" /></Button>
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
                                                                        onClick={() => {handlerDelete(c)}}
                                                                    ><Icon name="Trash" /></Button>
                                                                </Tooltip.Trigger>
                                                                <Tooltip.Content>
                                                                    <Tooltip.Arrow />
                                                                    Delete
                                                                </Tooltip.Content>
                                                            </Tooltip>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4">
                    <h1>Listagem de usuarios!</h1>
                </div>
                <div className="bg-white rounded-2xl p-4">

                </div>
                <div className="col-span-3 bg-white rounded-2xl p-4">

                </div>
            </div>
        </>
    )
}
