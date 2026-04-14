"use client";

import { Icon, ValidLucideIcons } from "@components/Icon";
import ConfirmActionContext from "@context/ConfirmActionContext";
import { AlertDialog, Button } from "@heroui/react";
import { ReactNode, useState } from "react";

export function ConfirmActionProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("Title");
    const [description, setDescription] = useState("Description");
    const [icon, setIcon] = useState<ValidLucideIcons>("Turtle");

    const [acceptAction, setAcceptAction] = useState<() => Promise<void>>(async () => { });

    function confirm(
        icon: ValidLucideIcons,
        title: string,
        description: string,
        accept: () => Promise<void>
    ) {
        setIcon(icon);
        setTitle(title);
        setDescription(description);
        setAcceptAction(() => accept);
        setOpen(true);
    }

    async function handlerAccept() {
        try {
            await acceptAction();
        } finally {
            setOpen(false);
            setAcceptAction(async () => { });
        }
    }

    return (
        <ConfirmActionContext.Provider value={{ confirm }}>
            <AlertDialog>
                <AlertDialog.Backdrop isOpen={open} onOpenChange={setOpen}>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog>
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header className="flex flex-row items-center gap-2">
                                <div className="flex justify-center items-center p-2 border-4 rounded-4xl">
                                    <Icon name={icon} />
                                </div>
                                <AlertDialog.Heading>{title}</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body className="p-2">
                                <p>{description}</p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handlerAccept}>
                                    Confirm
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>

            {children}
        </ConfirmActionContext.Provider>
    );
}