"use client";

import { Icon } from "@components/Icon";
import { Button, FieldError, Form, Input, Label, Modal, TextField, Select, ListBox, Key, Description, TagGroup, Tag, Fieldset } from "@heroui/react";
import Category from "@models/Category";
import { FormEvent, ReactNode, useEffect, useState } from "react";

type CreateNewCategoryModalProps = {
    categories: Category[];
    setCategories: (value: Category[]) => void;
    children: ReactNode;
}

export default function CreateNewCategoryModal({ categories, setCategories, children }: CreateNewCategoryModalProps) {
    const [open, setOpen] = useState(false);
    const [stateParent, setStateParent] = useState<Key | null>();

    async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        const res = await fetch("/api/category", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (res.ok) {
            const data = await res.json();
            setCategories([...categories, data]);
            setOpen(false);
        }
    }

    return (
        <Modal isOpen={open} onOpenChange={setOpen}>
            <Modal.Trigger>
                <div onClick={() => {setOpen(true)}}>
                    {children}
                </div>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="Cable" />
                            </Modal.Icon>
                            <Modal.Heading>New Category</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-3">
                            <Form className="flex flex-col gap-3 " onSubmit={handlerSubmit}>
                                <TextField
                                    isRequired
                                    name="name"
                                    type="text"
                                >
                                    <Label>Name</Label>
                                    <Input
                                        placeholder="Aluguel"
                                    />
                                    <FieldError />
                                </TextField>
                                <Select
                                    className="w-full"
                                    name="type"
                                    isRequired
                                >
                                    <Label>Type</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="expense" textValue="expense">
                                                Expense
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="income" textValue="income">
                                                Income
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                <div className="flex flex-row gap-2 items-center">
                                    <Select
                                        className="w-full"
                                        name="parentId"
                                        value={stateParent}
                                        onChange={(value) => setStateParent(value)}
                                    >
                                        <Label>Parent</Label>
                                        <Select.Trigger>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                {
                                                    categories.map((c) => (
                                                        <ListBox.Item id={c.id} key={c.id} textValue={c.name}>
                                                            {c.name}
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    ))
                                                }
                                            </ListBox>
                                        </Select.Popover>
                                        <Description>If this is empty, the category will be root.</Description>
                                    </Select>
                                    <Button variant="secondary" onClick={() => { setStateParent(null) }}><Icon name="Trash" /></Button>
                                </div>

                                <Button
                                    className="w-full"
                                    type="submit"
                                >
                                    Done
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}