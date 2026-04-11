"use client";

import { Icon, ValidLucideIcons } from "@components/Icon";
import { AlertDialog, Button } from "@heroui/react";
import { ReactNode } from "react";

type ConfirmActionProps = {
    icon?: ValidLucideIcons;
    title: string;
    description: string;
    children: ReactNode;
    accept: () => void;
}

export default function ConfirmAction({ icon = "CircleAlert", title, description, accept, children }: ConfirmActionProps) {
    return (
        <AlertDialog>
            <AlertDialog.Trigger>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog>
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon>
                                <Icon name={icon} />
                            </AlertDialog.Icon>
                            <AlertDialog.Heading>{title}</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            {description}
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button slot="close" variant="primary" onClick={() => accept()}>
                                Done
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    )
}