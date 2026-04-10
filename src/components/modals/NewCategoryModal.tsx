"use client";

import { Icon } from "@components/Icon";
import { Select, Button, Input, Label, Modal, ListBox, Form } from "@heroui/react";

type NewCategoryModalProps = {

}

export default function NewCategoryModal({ }: NewCategoryModalProps) {

    return (
        <Modal>
            <Button>
                <Icon name="FileMinusCorner" />
                New
            </Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="FileMinusCorner" />
                            </Modal.Icon>
                            <Modal.Heading>New Category</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-2 p-2">
                            <FormCategory />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="w-full" slot="close">
                                Done
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

function FormCategory() {
    return (
        <Form>
            <div className="flex flex-col gap-1">
                <Label>Name</Label>
                <Input placeholder="category name" />
            </div>
            <div className="flex flex-col gap-1">
                <Select className="w-[256px]" placeholder="Select one">
                    <Label>State</Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            <ListBox.Item id="florida" textValue="Florida">
                                Florida
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="delaware" textValue="Delaware">
                                Delaware
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="california" textValue="California">
                                California
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="texas" textValue="Texas">
                                Texas
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="new-york" textValue="New York">
                                New York
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="washington" textValue="Washington">
                                Washington
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>
        </Form>
    )
}