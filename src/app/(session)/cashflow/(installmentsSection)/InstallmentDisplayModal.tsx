"use client";

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
    const percent: number = (installment.conclusions / installment.installments) * 100;
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
                                <Table variant="secondary">
                                    <Table.ScrollContainer className="max-h-60">
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
                                                            <TrComponent.ButtonID transaction={t} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <TrComponent.Date transaction={t} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <TrComponent.Cash transaction={t} className="text-foreground" />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <TrComponent.State transaction={t} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table.Content>
                                    </Table.ScrollContainer>
                                </Table>
                            </div>
                            <div className="flex flex-col gap-2 pt-4">
                                <div className="flex flex-row gap-2">
                                    <div className="bg-default p-4 rounded-2xl w-full flex flex-col gap-2">
                                        <Label>Category</Label>
                                        <TrComponent.Category category={installment.category} />
                                    </div>
                                    <div className="bg-default p-4 rounded-2xl w-full flex flex-col gap-2">
                                        <Label>Payment Method</Label>
                                        <TrComponent.PM pm={installment.paymentMethod} />
                                    </div>
                                </div>
                                <div className="bg-default p-4 rounded-2xl w-full flex flex-col gap-2">
                                    <Label>Description</Label>
                                    <h1>{installment.description}</h1>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="flex flex-col gap-4">
                            <ProgressBar aria-label="Loading" value={percent}>
                                <Label>Loading</Label>
                                <ProgressBar.Output />
                                <ProgressBar.Track>
                                    <ProgressBar.Fill />
                                </ProgressBar.Track>
                            </ProgressBar>
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