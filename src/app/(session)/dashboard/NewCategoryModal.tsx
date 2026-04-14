"use client";

import { Icon } from "@components/Icon";
import { Button, Input, Label, Modal, Form, toast, Skeleton } from "@heroui/react";
import GroupCategory from "@models/GroupCategory";
import { newCategory } from "@services/GroupCategoryService";
import {  useState } from "react";

type NewCategoryModalProps = {
    groups: GroupCategory[];
    setGroups: (values: GroupCategory[]) => void;
}

export default function NewCategoryModal({ groups, setGroups }: NewCategoryModalProps) {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    async function handlerSubmit() {
        try {
            const data: GroupCategory = await newCategory(name, description);
            setGroups([...groups, data]);
            toast.success(`Group "${data.name}" created!`);
        }catch( err ) {
            toast.danger(String(err));
        }
    }

    if (!groups) {
        return (
            <Skeleton />
        )
    }

    return (
        <Modal>
            <Button>
                <Icon name="Group" />
                New Group
            </Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="FileMinusCorner" />
                            </Modal.Icon>
                            <Modal.Heading>New Group of Category</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-2 p-2">
                            <Form className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <Label>Name</Label>
                                    <Input placeholder="Rent" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label>Description</Label>
                                    <Input placeholder="idea?" onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div>
                                    <Button onClick={() => handlerSubmit()} slot="close">Done</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}