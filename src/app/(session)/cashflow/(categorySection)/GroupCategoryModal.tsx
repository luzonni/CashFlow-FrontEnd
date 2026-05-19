"use client";

import { Icon } from "@components/Icon";
import { Button, Input, Label, Modal, Form } from "@heroui/react";
import GroupCategory from "@models/GroupCategory";
import { ReactNode, useState } from "react";


type GroupCategoryModalProps = {
    group?: GroupCategory;
    children: ReactNode;
    newGroup?: (name: string, description: string) => Promise<void>;
    updateGroup?: (id: number, name: string, description: string) => Promise<void>;
}

export default function GroupCategoryModal({ group, newGroup, updateGroup, children }: GroupCategoryModalProps) {
    const [name, setName] = useState<string>(group ? group.name : "");
    const [description, setDescription] = useState<string>(group ? group.description : "");

    const title = group ? "Edit group category" : "New group category";

    async function handlerSubmit() {
        if (group) {
            if(updateGroup)
                updateGroup(group.id, name, description);
        } else {
            if(newGroup)
                newGroup(name, description);
            setName("")
            setDescription("");
        }
    }

    return (
        <Modal>
            {children}
            <Modal.Backdrop>
                <Modal.Container size="xs">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="FileMinusCorner" />
                            </Modal.Icon>
                            <Modal.Heading>{title}</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-2 p-2">
                            <Form className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <Label>Name</Label>
                                    <Input
                                        placeholder="Rent"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label>Description</Label>
                                    <Input
                                        placeholder="idea?"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
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