"use client"

import { Icon } from "@components/Icon";
import ConfirmActionModal from "@components/modals/ConfirmActionModal";
import { Button, Chip, ColorSwatch, Table, toast, Tooltip } from "@heroui/react"
import Category from "@models/Category"
import { SetStateAction } from "react";
import CreateNewCategoryModal from "./CreateNewCategoryModal";

type TableCategoryProps = {
    categories: Category[];
    setCategories: (value: SetStateAction<Category[]>) => void;
    updateTable: () => Promise<void>;
}

export default function TableCategory({ categories, setCategories, updateTable }: TableCategoryProps) {

    async function handlerDelete(id: number) {
        const res = await fetch(`/api/category/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            toast.danger("Erro ao excluir a categoria...")
            return;
        }
        const ids = await res.json();
        setCategories(prev =>
            prev?.filter(c => !ids.includes(c.id))
        );
    }

    return (
        <Table>
            <Table.ScrollContainer className="max-h-120 overflow-y-auto">
                <Table.Content aria-label="Categories">
                    <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
                        <Table.Column>Color</Table.Column>
                        <Table.Column isRowHeader>Name</Table.Column>
                        <Table.Column>Type</Table.Column>
                        <Table.Column>Branch</Table.Column>
                        <Table.Column>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            categories.map((c) => (
                                <Table.Row key={"item" + c.id + "/" + c.name}>
                                    <Table.Cell>
                                        <ColorSwatch aria-label="Blue" color={c.color} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <h1 className="text-[1rem]">
                                            {c.name}
                                        </h1>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            c.type === "EXPENSE" ?
                                                <Chip color="danger">Expense</Chip>
                                                :
                                                <Chip color="success">Income</Chip>
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            c.parent ?
                                                <Chip color="default">
                                                    <h1 className="font-bold" style={{ color: c.parent.color }}>
                                                        {c.parent.name}
                                                    </h1>
                                                </Chip>
                                                :
                                                <Chip color="default">
                                                    <h1 className="font-bold">Root</h1>
                                                </Chip>
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-row items-center gap-2">
                                            <CreateNewCategoryModal
                                                prevCategory={c}
                                                categories={categories}
                                                setCategories={setCategories}
                                                updateTable={updateTable}
                                            >
                                                <Tooltip delay={0}>
                                                    <Button
                                                        isIconOnly
                                                        variant="secondary"
                                                    ><Icon name="Pen" /></Button>
                                                    <Tooltip.Content>
                                                        <p>Edit</p>
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </CreateNewCategoryModal>
                                            <ConfirmActionModal
                                                icon="Trash"
                                                description={`Do you really want to delete "${c.name}"?`}
                                                title={`Delete ${c.name}`}
                                                accept={() => { handlerDelete(c.id) }}
                                            >
                                                <Tooltip delay={0}>
                                                    <Button
                                                        isIconOnly
                                                        variant="danger-soft"
                                                    ><Icon name="Trash" /></Button>
                                                    <Tooltip.Content>
                                                        <p>Delet</p>
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </ConfirmActionModal>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    )
}