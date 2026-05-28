"use client";

import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Button, Chip, Description, Label, Modal, Separator, Table, Tooltip } from "@heroui/react";
import Recurrence, { RecordStatus, RecurrenceRecord } from "@models/Recurrence"
import { TransactionType } from "@models/Transaction";
import User from "@models/User";
import { currencyFormat } from "@utils/Currency";
import { formatDate } from "@utils/DateUtils";

type RecurrenceDisplayProps = {
    recurrence: Recurrence;
}

export default function RecurrenceDisplay({ recurrence }: RecurrenceDisplayProps) {
    const { user } = useUser();
    function getType(type: TransactionType) {
        switch (type) {
            case "INCOME": return (<Chip color="success" variant="soft">{type}</Chip>);
            case "EXPENSE": return (<Chip color="danger" variant="soft">{type}</Chip>);
        }
    }
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
                        <Modal.Body className="flex flex-col gap-4 p-2">
                            <section className="flex flex-row justify-between">
                                <div className="flex flex-col gap-2">
                                    <Label>{recurrence.name}</Label>
                                    <Description>{recurrence.description}</Description>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Tooltip delay={0}>
                                        <Button isIconOnly variant="secondary"><Icon name="Pen" /></Button>
                                        <Tooltip.Content>
                                            <p>Edit</p>
                                        </Tooltip.Content>
                                    </Tooltip>
                                    <Tooltip delay={0}>
                                        <Button isIconOnly variant="secondary"><Icon name="Pause" /></Button>
                                        <Tooltip.Content>
                                            <p>Pause</p>
                                        </Tooltip.Content>
                                    </Tooltip>
                                    <Tooltip delay={0}>
                                        <Button isIconOnly variant="danger-soft"><Icon name="Trash" /></Button>
                                        <Tooltip.Content>
                                            <p>Cancel</p>
                                        </Tooltip.Content>
                                    </Tooltip>
                                </div>
                            </section>
                            <section className="flex flex-col gap-2 bg-surface-secondary p-2 rounded-2xl">
                                <div className="flex flex-row gap-2 justify-between">
                                    <div className="flex flex-row items-center gap-2">
                                        <Icon name="Calendar" />
                                        <Label>Records</Label>
                                    </div>
                                    {getType(recurrence.type)}
                                </div>
                                <RecordsTable {...{ recurrence, user }} />
                            </section>
                            <section className="flex flex-col gap-4">
                                <div className="w-full flex flex-row gap-4 justify-between items-center bg-surface-secondary p-2 rounded-2xl">
                                    <Label className="px-2">Frequency</Label>
                                    <div className="flex flex-row justify-center items-center gap-2 w-2/3 p-2 bg-background-tertiary rounded-2xl">
                                        <Chip color="accent">{recurrence.frequency}</Chip>
                                        <Separator orientation="vertical" variant="secondary" />
                                        <Icon name="Footprints" /> {recurrence.interval}
                                        <Separator orientation="vertical" variant="secondary" />
                                        <Icon name="CalendarSync" /> {recurrence.maxOccurrences}
                                    </div>
                                </div>
                                <div className="w-full flex flex-row gap-2 justify-between items-center bg-surface-secondary p-2 rounded-2xl">
                                    <Label className="px-2">Amount</Label>
                                    <div className="flex flex-row justify-center w-2/3 p-2 gap-2 bg-background-tertiary rounded-2xl">
                                        {currencyFormat(recurrence.currency, recurrence.amount, user.settings.locale)}
                                        <Icon name="Asterisk" />
                                        {recurrence.maxOccurrences}
                                        <Icon name="EqualApproximately" />
                                        {currencyFormat(recurrence.currency, recurrence.amount * recurrence.maxOccurrences, user.settings.locale)}
                                    </div>
                                </div>
                            </section>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

function RecordsTable(
    { recurrence, user }: {
        user: User;
        recurrence: Recurrence;
    }
) {
    const records = recurrence.records;
    function getStatus(status: RecordStatus) {
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
                        <Table.Column>Transaction</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            records.map((record) => (
                                <Table.Row key={record.id}>
                                    <Table.Cell>{formatDate(record.scheduledTo, user.settings.locale)}</Table.Cell>
                                    <Table.Cell>{currencyFormat(recurrence.currency, record.amount, user.settings.locale)}</Table.Cell>
                                    <Table.Cell>{getStatus(record.status)}</Table.Cell>
                                    <Table.Cell>
                                        {
                                            record.transaction ?
                                                (
                                                    //precisa fazer com que o usuario consiga copiar o ID da transação
                                                    <Button
                                                        isIconOnly
                                                        variant="secondary"
                                                    >
                                                        <Icon name="ArrowRightLeft" />
                                                    </Button>
                                                )
                                                :
                                                (
                                                    <Icon name="Hourglass" />
                                                )
                                        }
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    )
}