"use client";

import { useCashflow } from "@components/hooks/useCashflow";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Button, Chip, Description, Label, Modal, NumberField, ProgressBar, Separator, Table, toast, Tooltip } from "@heroui/react";
import Recurrence, { RecordStatus, RecurrenceStatus } from "@models/Recurrence"
import { TransactionType } from "@models/Transaction";
import User from "@models/User";
import apiAction from "@services/ApiAction";
import RecurrenceService from "@services/RecurrenceService";
import { copyToClipboard } from "@utils/Copy";
import { currencyFormat } from "@utils/Currency";
import { formatDate } from "@utils/DateUtils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type RecurrenceDisplayProps = {
    recurrence: Recurrence;
}

export default function RecurrenceDisplay({ recurrence }: RecurrenceDisplayProps) {
    const { user } = useUser();
    const { setRecurrences } = useCashflow();
    const [isEditing, setIsEditting] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(recurrence.amount);
    const [status, setStatus] = useState<RecurrenceStatus>(recurrence.status);
    function getType(type: TransactionType) {
        switch (type) {
            case "INCOME": return (<Chip color="success" variant="soft">{type}</Chip>);
            case "EXPENSE": return (<Chip color="danger" variant="soft">{type}</Chip>);
        }
    }

    useEffect(() => {
        if (status === recurrence.status && amount === recurrence.amount) {
            return;
        }
        apiAction(async () => {
            const id = recurrence.id;
            RecurrenceService.update(id, amount, status);
            setAmount(amount);
            setRecurrences((prev) => prev.map((recurrence) => (
                id === recurrence.id ?
                    {
                        ...recurrence,
                        amount,
                        status,
                        records: recurrence.records.map((record) => (
                            record.status === "PENDING" ?
                                {
                                    ...record,
                                    amount
                                }
                                :
                                record
                        ))
                    }
                    :
                    recurrence
            )))
        }, "Something was wrong while update amount value");
    }, [amount, status]);

    return (
        <Modal>
            <Button isIconOnly variant="secondary">
                <Icon name="Eye" />
            </Button>
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
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
                                    <div className="flex flex-row gap-2 items-center">
                                        <Label>{recurrence.name}</Label>
                                        <Separator variant="secondary" orientation="vertical" />
                                        <Chip>{recurrence.status}</Chip>
                                    </div>
                                    <Description>{recurrence.description}</Description>
                                </div>
                                {
                                    status !== "ENDED" && (
                                        <div className="flex flex-row gap-2">
                                            <Tooltip delay={0}>
                                                <Button
                                                    isIconOnly
                                                    variant="secondary"
                                                    onClick={() => {
                                                        if (status === "ACTIVE") {
                                                            setStatus("PAUSED");
                                                        } else if (status === "PAUSED") {
                                                            setStatus("ACTIVE")
                                                        }
                                                    }}
                                                >
                                                    {
                                                        status === "ACTIVE" ? (
                                                            <Icon name="Pause" />
                                                        ) : (
                                                            <Icon name="Play" />
                                                        )
                                                    }
                                                </Button>
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
                                    )
                                }

                            </section>
                            <section className="flex flex-col gap-2 bg-surface-secondary p-2 rounded-2xl">
                                <div className="flex flex-row gap-2 justify-between px-2">
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
                                <div className="w-full flex flex-col gap-2 bg-surface-secondary p-2 rounded-2xl">
                                    <div className="flex flex-row gap-2 justify-between items-center w-full">
                                        <Label className="px-2">Amount</Label>

                                        <div className="flex flex-row justify-center w-2/3 p-2 gap-2 bg-background-tertiary rounded-2xl">
                                            {currencyFormat(recurrence.currency, recurrence.amount, user.settings.locale)}
                                            <Icon name="Asterisk" />
                                            {recurrence.maxOccurrences}
                                            <Icon name="EqualApproximately" />
                                            {currencyFormat(
                                                recurrence.currency,
                                                recurrence.amount * recurrence.maxOccurrences,
                                                user.settings.locale
                                            )}
                                        </div>

                                        <Tooltip delay={0}>
                                            <Button
                                                isIconOnly
                                                variant={isEditing ? "secondary" : "tertiary"}
                                                onClick={() => setIsEditting(!isEditing)}
                                            >
                                                <Icon name="Pen" />
                                            </Button>

                                            <Tooltip.Content>
                                                <p>Edit</p>
                                            </Tooltip.Content>
                                        </Tooltip>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isEditing && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    height: 0,
                                                    y: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    height: "auto",
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    height: 0,
                                                    y: -10,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeInOut",
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-col gap-2 p-2">
                                                    <NumberField
                                                        value={amount}
                                                        minValue={0}
                                                        onChange={setAmount}
                                                        name="currency"
                                                        formatOptions={{
                                                            maximumFractionDigits: 2,
                                                            minimumFractionDigits: 2,
                                                            style: "currency",
                                                            currency: recurrence.currency,
                                                        }}
                                                    >
                                                        <Label>
                                                            Amount ({recurrence.currency})
                                                        </Label>

                                                        <NumberField.Group>
                                                            <NumberField.DecrementButton />
                                                            <NumberField.Input />
                                                            <NumberField.IncrementButton />
                                                        </NumberField.Group>
                                                    </NumberField>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </section>
                        </Modal.Body>
                        <Modal.Footer>
                            <ProgressBar value={(recurrence.occurrencesProduced / recurrence.maxOccurrences) * 100}>
                                <Label>Completed</Label>
                                <ProgressBar.Output />
                                <ProgressBar.Track>
                                    <ProgressBar.Fill />
                                </ProgressBar.Track>
                            </ProgressBar>
                        </Modal.Footer>
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

    return (
        <Table>
            <Table.ScrollContainer className="max-h-60">
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
                                    <Table.Cell>{Status(record.status)}</Table.Cell>
                                    <Table.Cell>
                                        {
                                            record.transaction ?
                                                (
                                                    //precisa fazer com que o usuario consiga copiar o ID da transação
                                                    <Button
                                                        isIconOnly
                                                        variant="secondary"
                                                        onClick={() => {
                                                            const id = record.transaction ? record.transaction.id : "null";
                                                            if (id !== "null") {
                                                                copyToClipboard(id);
                                                            } else {
                                                                toast.danger("Error while copy UUID");
                                                            }
                                                        }}
                                                    >
                                                        <Icon name="ArrowRightLeft" />
                                                    </Button>
                                                )
                                                :
                                                (
                                                    <div className="w-min flex bg-surface-secondary rounded-full p-2">
                                                        <Icon name="Hourglass" />
                                                    </div>
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

function Status(status: RecordStatus) {
    switch (status) {
        case "EXECUTED": return (
            <Tooltip delay={0}>
                <Tooltip.Trigger aria-label="Info icon">
                    <div className="rounded-full bg-accent-soft flex p-2">
                        <Icon name="Check" />
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content showArrow>
                    <Tooltip.Arrow />
                    <div className="max-w-xs px-1 py-1.5">
                        <p className="mb-1 font-semibold">Executed</p>
                        <p className="text-sm text-muted">
                            The transaction has already been completed. If you wish to locate it, click the button on the right and paste it into the transactions section.
                        </p>
                    </div>
                </Tooltip.Content>
            </Tooltip>
        );
        case "PENDING": return (
            <Tooltip delay={0}>
                <Tooltip.Trigger aria-label="Info icon">
                    <div className="rounded-full bg-warning-soft flex p-2">
                        <Icon name="ClockAlert" size={20} />
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content showArrow>
                    <Tooltip.Arrow />
                    <div className="max-w-xs px-1 py-1.5">
                        <p className="mb-1 font-semibold">Pending...</p>
                        <p className="text-sm text-muted">
                            This transaction has yet to be launched.
                        </p>
                    </div>
                </Tooltip.Content>
            </Tooltip>
        );
        case "FAILED": return (
            <Tooltip delay={0}>
                <Tooltip.Trigger aria-label="Info icon">
                    <div className="rounded-full bg-danger-soft flex p-2">
                        <Icon name="TriangleAlert" size={20} />
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content showArrow>
                    <Tooltip.Arrow />
                    <div className="max-w-xs px-1 py-1.5">
                        <p className="mb-1 font-semibold">Failed</p>
                        <p className="text-sm text-muted">
                            The transaction could not be completed. It may still be possible within the next few business days, or please contact support.
                        </p>
                    </div>
                </Tooltip.Content>
            </Tooltip>
        );
        case "SKIPPED": return (
            <Tooltip delay={0}>
                <Tooltip.Trigger aria-label="Info icon">
                    <div className="rounded-full bg-warning-soft flex p-2">
                        <Icon name="SkipForward" size={20} />
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content showArrow>
                    <Tooltip.Arrow />
                    <div className="max-w-xs px-1 py-1.5">
                        <p className="mb-1 font-semibold">Skipped</p>
                        <p className="text-sm text-muted">
                            The transaction was skipped, probably because recurring payments were paused that day.
                        </p>
                    </div>
                </Tooltip.Content>
            </Tooltip>
        );
    }
}