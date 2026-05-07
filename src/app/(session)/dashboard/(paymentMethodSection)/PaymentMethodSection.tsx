"use client";

import { Icon } from "@components/Icon";
import { Button, ColorSwatch, Table, toast } from "@heroui/react";
import PaymentMethodModal from "./PaymentMethodModal";
import PaymentMethod from "@models/PaymentMethod";
import authFetch from "@services/AuthFetch";
import { API } from "@services/API";
import { useEffect, useState } from "react";
import { useAction } from "@components/hooks/useConfirm";


export default function PaymentMethodSection() {
    const { confirm } = useAction();
    const [payMethods, setPayMethods] = useState<PaymentMethod[]>([]);

    async function fetch() {
        const res = await authFetch(API.PAYMENT_METHOD.main(), {
            method: "GET"
        });
        if (!res.ok) {
            toast.danger("Something was wrong while fetch this request.")
            return;
        }
        const data: PaymentMethod[] = await res.json();
        setPayMethods(data);
    }

    async function create(color: string, name: string) {
        const res = await authFetch(API.PAYMENT_METHOD.main(), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({color, name})
        });
        if (!res.ok) {
            toast.danger("This method name exists.")
            return;
        }
        const data: PaymentMethod = await res.json();
        setPayMethods([...payMethods, data]);
    }

    async function update(id: number, color: string, name: string) {
        const res = await authFetch(API.PAYMENT_METHOD.byId(id), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({color, name})
        });
        if (!res.ok) {
            toast.danger("Something was wrong while persist this request.")
            return;
        }
        const data: PaymentMethod = await res.json();
        setPayMethods(payMethods.map(pm =>
            pm.id === id ?
            data :
            pm
        ));
    }

    function handlerDelete(payMethod: PaymentMethod) {
        confirm(
            "Trash",
            `Delete "${payMethod.name}"?`,
            "Really?",
            async () => {
                const res = await authFetch(API.PAYMENT_METHOD.byId(payMethod.id), {
                    method: "DELETE"
                });
                if(!res.ok) {
                    toast.danger("Something was wrong while delete this method.")
                    return;
                }
                setPayMethods(payMethods.filter(pm => pm.id !== payMethod.id));
                toast.success(`The "${payMethod.name} was deleted!"`)
            }
        );
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className="w-full flex flex-col gap-2 p-2">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-1">
                    <Icon name="WalletCards" />
                    <h1>Payment Methods</h1>
                </div>
                <PaymentMethodModal create={create}>
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
                                    payMethods.map((pm) => (
                                        <Table.Row key={`Row${pm.id}/${pm.name}`}>
                                            <Table.Cell><ColorSwatch color={pm.color} /></Table.Cell>
                                            <Table.Cell>{pm.name}</Table.Cell>
                                            <Table.Cell className="flex flex-row gap-2">
                                                <PaymentMethodModal 
                                                    payMethod={pm}
                                                    update={update}
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