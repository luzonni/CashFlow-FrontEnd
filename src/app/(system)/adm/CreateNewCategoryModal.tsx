"use client";

import { Icon } from "@components/Icon";
import { Button, FieldError, Form, Input, Label, Modal, TextField, Select, ListBox, Key, Description, ColorPicker, ColorArea, ColorSwatch, ColorSlider, parseColor, toast } from "@heroui/react";
import GroupCategory from "@models/GroupCategory";
import TypeCategory from "@models/TypeCategory";
import { API } from "@services/API";
import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from "react";

type CreateNewCategoryModalProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    prevCategory?: GroupCategory;
    categories: GroupCategory[];
    setCategories: Dispatch<SetStateAction<GroupCategory[]>>;

}

export default function CreateNewCategoryModal({
    isOpen,
    setOpen,
    prevCategory,
    categories,
    setCategories
}: CreateNewCategoryModalProps) {
    const [color, setColor] = useState(parseColor(prevCategory ? prevCategory.color : "#0080ff"));
    const [name, setName] = useState<string>(prevCategory ? prevCategory.name : "");
    const [type, setType] = useState<Key | null>(prevCategory ? prevCategory.type.toUpperCase() : null);

    function buildPayload() {
        return {
            color: color.toString("hex"),
            name: name.trim(),
            type: type?.toString().toUpperCase() as TypeCategory
        };
    }

    async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!type || !name.trim()) {
            return;
        }

        if (prevCategory) {
            await handlerEdit(prevCategory.id);
        } else {
            await handlerCreate();
        }
    }

    async function handlerCreate() {
        const res = await fetch(API.CATEGORY.main(), {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buildPayload())
        })
        if (!res.ok) {
            toast.danger("Error to persist Category");
            return;
        }

        const createdCategory: GroupCategory = await res.json();
        setCategories(prev => [...prev, createdCategory]);
        setOpen(false);
    }

    async function handlerEdit(id: number) {
        const res = await fetch(API.CATEGORY.byId(id), {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buildPayload())
        })
        if (!res.ok) {
            toast.danger("Error to update Category");
            return;
        }

        const updatedCategory: GroupCategory = await res.json();
        setCategories(prev =>
            prev.map(category =>
                category.id === updatedCategory.id ? updatedCategory : category
            )
        );
        setOpen(false);
    }

    function reset() {
        setName("");
        setType(null);
        setColor(parseColor("#0080ff"));
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (prevCategory) {
            setColor(parseColor(prevCategory.color));
            setName(prevCategory.name);
            setType(prevCategory.type);
        } else {
            reset();
        }
    }, [isOpen, prevCategory]);

    return (
        <Modal isOpen={isOpen} onOpenChange={setOpen}>
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
                                    <Label>Color</Label>
                                    <div className="w-full flex flex-row rounded-2xl bg-gray-100 p-3">
                                        <ColorPicker className="w-full" value={color} onChange={setColor}>
                                            <ColorPicker.Trigger className="w-full">
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
