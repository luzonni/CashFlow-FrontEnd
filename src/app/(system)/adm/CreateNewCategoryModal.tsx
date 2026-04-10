"use client";

import { Icon } from "@components/Icon";
import { Button, FieldError, Form, Input, Label, Modal, TextField, Select, ListBox, Key, Description, ColorPicker, ColorArea, ColorSwatch, ColorSlider, parseColor, toast } from "@heroui/react";
import Category from "@models/Category";
import TypeCategory from "@models/TypeCategory";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

type CreateNewCategoryModalProps = {
    prevCategory?: Category;
    categories: Category[];
    setCategories: (value: Category[]) => void;
    children: ReactNode;
    updateTable: () => Promise<void>;
}

export default function CreateNewCategoryModal({ prevCategory, categories, setCategories, updateTable, children }: CreateNewCategoryModalProps) {
    const [open, setOpen] = useState(false);

    const [color, setColor] = useState(parseColor(prevCategory ? prevCategory.color : "#0080ff"));
    const [name, setName] = useState<string>(prevCategory ? prevCategory.name : "");
    const [type, setType] = useState<Key | null>(prevCategory ? prevCategory.type.toUpperCase() : null);
    const [stateParent, setStateParent] = useState<Key | null>((prevCategory && prevCategory.parent) ? prevCategory.parent.id : null);

    async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (prevCategory) {
            updateCategory(prevCategory.id);
        } else {
            postCategory();
        }
        await updateTable();
    }

    async function postCategory() {
        const res = await fetch("/api/category", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                type,
                color: color.toString("hex"),
                parentId: stateParent
            })
        })
        if (!res.ok) {
            toast.danger("Error to persist Category");
            return;
        }
        const data = await res.json();
        setOpen(false);
        setStateParent(null);
        setName("")
        setType(null)
        setColor(parseColor("#0080ff"))
    }

    async function updateCategory(id: number) {
        const res = await fetch(`/api/category/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                type,
                color: color.toString("hex"),
                parentId: stateParent
            })
        })
        if (!res.ok) {
            toast.danger("Error to update Category");
            return;
        }
        setOpen(false);
        setStateParent(null);
        setName("")
        setType(null)
        setColor(parseColor("#0080ff"))
    }


    useEffect(() => {
        if (!prevCategory) {
            setStateParent(null);
            setName("")
            setType(null)
            setColor(parseColor("#0080ff"))
        }
    }, [open])

    const disabledKeys = useMemo(() => {
        return categories
            .filter(c =>
                c.parent != null ||
                c.id === prevCategory?.id ||
                c.type !== type?.toString().toUpperCase()
            )
            .map(c => c.id);
    }, [categories, prevCategory, type]);

    return (
        <Modal isOpen={open} onOpenChange={setOpen}>
            <Modal.Trigger>
                <div onClick={() => { setOpen(true) }}>
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
                            <Modal.Heading>
                                {
                                    prevCategory ?
                                        "Edit Category"
                                        :
                                        "New Category"
                                }
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-3">
                            <Form className="flex flex-col gap-3 " onSubmit={handlerSubmit}>
                                <div className="flex flex-col items-start gap-4">
                                    <Label>Choose color tag</Label>
                                    <div className="flex flex-row rounded-2xl bg-gray-100 p-3">
                                        <ColorPicker value={color} onChange={setColor}>
                                            <ColorPicker.Trigger>
                                                <ColorSwatch size="lg" />
                                                <Label>Pick a color</Label>
                                            </ColorPicker.Trigger>
                                            <ColorPicker.Popover>
                                                <ColorArea
                                                    aria-label="Color area"
                                                    className="max-w-full"
                                                    colorSpace="hsb"
                                                    xChannel="saturation"
                                                    yChannel="brightness"
                                                >
                                                    <ColorArea.Thumb />
                                                </ColorArea>
                                                <ColorSlider channel="hue" className="gap-1 px-1" colorSpace="hsb">
                                                    <Label>Hue</Label>
                                                    <ColorSlider.Output className="text-muted" />
                                                    <ColorSlider.Track>
                                                        <ColorSlider.Thumb />
                                                    </ColorSlider.Track>
                                                </ColorSlider>
                                            </ColorPicker.Popover>
                                        </ColorPicker>
                                    </div>
                                </div>
                                <TextField
                                    isRequired
                                    type="text"
                                >
                                    <Label>Name</Label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Aluguel"
                                    />
                                    <FieldError />
                                </TextField>
                                <Select
                                    className="w-full"
                                    value={type}
                                    onChange={(value) => {
                                        setType(value);
                                        setStateParent(null);
                                    }}
                                    isRequired
                                >
                                    <Label>Type</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="EXPENSE">
                                                Expense
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="INCOME">
                                                Income
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                <div className="flex flex-row gap-2 items-center">
                                    <Select
                                        className="w-full"
                                        value={stateParent}
                                        onChange={(value) => setStateParent(value)}
                                        disabledKeys={disabledKeys}
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