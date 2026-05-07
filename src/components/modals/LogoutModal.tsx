"use client";

import { Icon } from "@components/Icon";
import { Button, Modal, toast } from "@heroui/react";
import { useRouter } from "next/navigation";

type LogoutModalProps = {
    logout: () => Promise<void>;
}

export default function LogoutModal({ logout }: LogoutModalProps) {
    const router = useRouter();

    async function handerLogOut() {
        await logout();
        toast("Logout!")
        router.push("/");
    }
    return (
        <Modal>
            <Button isIconOnly variant="ghost">
                <Icon name="LogOut" />
            </Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="LogOut" />
                            </Modal.Icon>
                            <Modal.Heading>Confirm Logout</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Are you sure you want to leave?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="w-full" slot="close" onClick={() => { handerLogOut() }}>
                                Continue
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}