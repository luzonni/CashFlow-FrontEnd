"use client";

import { Icon } from "@components/Icon";
import { Button, Modal } from "@heroui/react";
import { ReactNode } from "react";

type RuleModalProps = {
    children: ReactNode
}

export default function RuleModal({children}: RuleModalProps) {
    return (
        <Modal>
            {children}
            <Modal.Backdrop>
                <Modal.Container size="md">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="Plus" />
                            </Modal.Icon>
                            <Modal.Heading>New Rule</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            todo
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="w-full" slot="close">
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>

    )
}