"use client";

import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Button, Chip, Description, Label, Modal, Table } from "@heroui/react";
import Recurrence, { RecordStatus, RecurrenceRecord } from "@models/Recurrence"
import { copyToClipboard } from "@utils/Copy";
import { currencyFormat } from "@utils/Currency";
import { formatDate } from "@utils/DateUtils";

type RecurrenceDisplayProps = {
    recurrence: Recurrence;
}

export default function RecurrenceDisplay({ recurrence }: RecurrenceDisplayProps) {
    return (
        <Modal>
            <Button isIconOnly variant="secondary">
                <Icon name="Eye" />
            </Button>
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger /> {/* Optional: Close button */}
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="ChartColumn" />
                            </Modal.Icon>
                            <Modal.Heading>
                                <Label>View Recurrence</Label>
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-2 p-2">
                            <section className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <Icon name="Calendar" />
                                    <Label>Records</Label>
                                </div>
                                <RecordsTable {...{ recurrence }} />
                            </section>
                            <section className="flex flex-row gap-2">
                                <div className="w-full flex flex-col gap-2">
                                    <Label>{recurrence.name}</Label>
                                    <Description>{recurrence.description}</Description>
                                </div>
                                <div className="w-full flex flex-col">
                                    <Label>Frequency</Label>
                                    <div className="p-2">
                                        <Description>{recurrence.frequency}</Description>
                                    </div>
                                </div>
                            </section>
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

function RecordsTable(
    { recurrence }: {
        recurrence: Recurrence;
    }
) {
    const { user } = useUser();
    const records = recurrence.records;
    function getStatus(status: RecordStatus) {
        ''
        switch (status) {
            case "EXECUTED": return (<Chip color="accent"><Icon size={12} name="Check" />{status}</Chip>);
            case "PENDING": return (<Chip color="warning"><Icon size={12} name="ClockAlert" />{status}</Chip>);
            case "FAILED": return (<Chip color="danger"><Icon size={12} name="TriangleAlert" />{status}</Chip>);
            case "SKIPPED": return (<Chip color="danger"><Icon size={12} name="TriangleAlert" />{status}</Chip>);
        }
    }
    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Team members">
                    <Table.Header>
                        <Table.Column isRowHeader>Scheduled</Table.Column>
                        <Table.Column>Amount</Table.Column>
                        <Table.Column>Status</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            records.map((record) => (
                                <Table.Row key={record.id}>
                                    <Table.Cell>{formatDate(record.scheduledTo, user.settings.locale)}</Table.Cell>
                                    <Table.Cell>{currencyFormat(recurrence.currency, record.amount, user.settings.locale)}</Table.Cell>
                                    <Table.Cell>{getStatus(record.status)}</Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    )
}