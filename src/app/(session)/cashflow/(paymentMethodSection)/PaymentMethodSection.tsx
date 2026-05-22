"use client";

import { Icon } from "@components/Icon";
import { Button, ColorSwatch, Table, toast } from "@heroui/react";
import PaymentMethodModal from "./PaymentMethodModal";
import PaymentMethod from "@models/PaymentMethod";
import { useAction } from "@components/hooks/useConfirm";
import PaymentMethodService from "@services/PaymentMethodService";
import apiAction from "@services/ApiAction";
import { useCashflow } from "@components/hooks/useCashflow";

export default function PaymentMethodSection() {
    const { paymentMethods, setPaymentMethods } = useCashflow();
    const { confirm } = useAction();

    function handlerCreate(color: string, name: string) {
        apiAction(async () => {
            const data: PaymentMethod = await PaymentMethodService.create(color, name);
            setPaymentMethods([...paymentMethods, data]);
        }, "Error while create")
    }

    function handlerUpdate(id: number, color: string, name: string) {
        apiAction(async () => {
            const data: PaymentMethod = await PaymentMethodService.update(id, color, name);
            setPaymentMethods(paymentMethods.map(pm =>
                pm.id === id ?
                    data :
                    pm
            ));
        }, "Error while update")
    }

    function handlerDelete(payMethod: PaymentMethod) {
        confirm(
            "Trash",
            `Delete "${payMethod.name}"?`,
            "Really?",
            async () => {
                apiAction(async () => {
                    await PaymentMethodService.delete(payMethod.id);
                    setPaymentMethods(paymentMethods.filter(pm => pm.id !== payMethod.id));
                    toast.success(`The "${payMethod.name} was deleted!"`)
                }, "Something was wrong while delete this method.")
            }
        );
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full bg-surface-secondary p-2 rounded-2xl flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-1">
                    <Icon name="WalletCards" />
                    <h1>Payment Methods</h1>
                </div>
                <PaymentMethodModal create={handlerCreate}>
                    <Button>
                        <Icon name="Plus" />
                        New
                    </Button>
                </PaymentMethodModal>
            </div>
            <div>
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Payment Methods">
                            <Table.Header>
                                <Table.Column isRowHeader><Icon name="Eclipse" /></Table.Column>
                                <Table.Column>Name</Table.Column>
                                <Table.Column>Action</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {
                                    paymentMethods.map((pm) => (
                                        <Table.Row key={`Row${pm.id}/${pm.name}`}>
                                            <Table.Cell><ColorSwatch color={pm.color} /></Table.Cell>
                                            <Table.Cell>{pm.name}</Table.Cell>
                                            <Table.Cell className="flex flex-row gap-2">
                                                <PaymentMethodModal
                                                    payMethod={pm}
                                                    update={handlerUpdate}
                                                >
                                                    <Button isIconOnly variant="tertiary"><Icon name="Pen" /></Button>
                                                </PaymentMethodModal>
                                                <Button
                                                    isIconOnly
                                                    variant="danger-soft"
                                                    onClick={() => handlerDelete(pm)}
                                                >
                                                    <Icon name="Trash" />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    )
}