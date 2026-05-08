"use client";

import { Icon } from "@components/Icon";
import { Button, Chip, Table } from "@heroui/react";
import CalendarModal from "./CalendarModal";
import { useEffect, useState } from "react";
import DateRange from "@models/DateRange";
import {
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import TransactionDisplayModal from "./TransactionDisplayModal";


export default function TransactionSection() {
    const [data, setData] = useState<DateRange | undefined>();

    useEffect(() => {
        const currentDate = today(getLocalTimeZone());
        setData({
            start: currentDate,
            end: currentDate
        });
    }, []);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-row items-center gap-3 justify-between">
                <CalendarModal value={data} setValue={setData}/>
                <div>
                    <Button variant="secondary">
                        <Icon name="Plus" />
                        New
                    </Button>
                </div>
            </div>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members">
                        <Table.Header>
                            <Table.Column isRowHeader>ID</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Payment Method</Table.Column>
                            <Table.Column>Date</Table.Column>
                            <Table.Column>Type</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Value</Table.Column>
                            <Table.Column>Display</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Button isIconOnly variant="tertiary">
                                        <Icon name="IdCard" />
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>Funcionarios</Table.Cell>
                                <Table.Cell><Chip color="accent">Crédito</Chip></Table.Cell>
                                <Table.Cell>01/01/2009</Table.Cell>
                                <Table.Cell><Chip>EXPENSE</Chip></Table.Cell>
                                <Table.Cell><Chip>Processing...</Chip></Table.Cell>
                                <Table.Cell>R$ 343,12</Table.Cell>
                                <Table.Cell><TransactionDisplayModal/></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    )
}