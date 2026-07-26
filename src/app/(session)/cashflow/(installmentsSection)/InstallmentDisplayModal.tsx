"use client";

import CashShower from "@components/CashShower";
import { Icon } from "@components/Icon";
import TrComponent from "@components/TrComponent";
import { Button, Label, Modal, ProgressBar, Table } from "@heroui/react";
import Installment from "@models/Installment";
import { ReactNode } from "react";

type InstallmentDisplayModalProps = {
    children: ReactNode;
    installment: Installment;
}

export default function InstallmentDisplayModal({
    installment,
    children
}: InstallmentDisplayModalProps) {

    return (
        <Modal>
            {children}
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="CreditCard" />
                            </Modal.Icon>
                            <Modal.Heading>Installment</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flex flex-col gap-2">
                                <ProgressBar aria-label="Loading" value={60}>
                                    <Label>Loading</Label>
                                    <ProgressBar.Output />
                                    <ProgressBar.Track>
                                        <ProgressBar.Fill />
                                    </ProgressBar.Track>
                                </ProgressBar>
                                <Table variant="secondary">
                                    <Table.ScrollContainer>
                                        <Table.Content aria-label="Team members">
                                            <Table.Header>
                                                <Table.Column isRowHeader>ID</Table.Column>
                                                <Table.Column>Date</Table.Column>
                                                <Table.Column>Value</Table.Column>
                                                <Table.Column>Status</Table.Column>
                                            </Table.Header>
                                            <Table.Body>
                                                {installment.transactions.map((t) => (
                                                    <Table.Row key={t.id}>
                                                        <Table.Cell>
                                                            <Icon name="IdCard" />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <TrComponent.Date transaction={t}/>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <TrComponent.Cash transaction={t} className="text-foreground"/>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <TrComponent.State transaction={t}/>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table.Content>
                                    </Table.ScrollContainer>
                                </Table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="w-full" slot="close">
                                Continue
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}