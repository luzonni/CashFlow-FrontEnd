"use client"

import { Icon } from "@components/Icon";
import ConfirmActionModal from "@components/modals/ConfirmActionModal";
import { Button, Chip, Table, toast, Tooltip } from "@heroui/react"
import Category from "@models/Category"
import { SetStateAction } from "react";

type TableCategoryProps = {
    categories: Category[];
    setCategories: (value: SetStateAction<Category[]>) => void;
}

export default function TableCategory({ categories, setCategories }: TableCategoryProps) {

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
            <Table.ScrollContainer className="max-h-80 overflow-y-auto">
                <Table.Content aria-label="Categories">
                    <Table.Header>
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
                                        {c.name}
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
                                                <Chip color="default">{c.parent.name}</Chip>
                                                :
                                                <Chip color="default">Root</Chip>
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-row gap-2">
                                            <Tooltip delay={0}>
                                                <Button isIconOnly variant="secondary"><Icon name="Pen" /></Button>
                                                <Tooltip.Content>
                                                    <p>Edit</p>
                                                </Tooltip.Content>
                                            </Tooltip>
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