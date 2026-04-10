"use client";

import { Icon, ValidLucideIcons } from "@components/Icon";
import { Button, Modal } from "@heroui/react";
import { ReactNode } from "react";

type ConfirmActionModalProps = {
    icon: ValidLucideIcons;
    title: string;
    description: string;
    children: ReactNode;
    accept: () => void;
}

export default function ConfirmActionModal({ icon, title, description, accept, children }: ConfirmActionModalProps) {
    return (
        <Modal>
            <Modal.Trigger>
                {children}
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name={icon} />
                            </Modal.Icon>
                            <Modal.Heading>{title}</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {description}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="w-full"
                                variant="secondary"
                                onClick={() => { accept() }}
                            >
                                Continue
                            </Button>
                            <Button
                                className="w-full"
                                variant="primary"
                                slot="close"
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}