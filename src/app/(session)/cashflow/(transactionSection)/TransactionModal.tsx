"use client";

import { Icon } from "@components/Icon";
import { Button, Calendar, Chip, ColorSwatch, DateField, DatePicker, Description, Header, Label, ListBox, Modal, NumberField, Select, TextArea } from "@heroui/react";
import Transaction, { TransactionState, TransactionType } from "@models/Transaction";
import {
    DateValue
} from "@internationalized/date";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@components/hooks/useUser";
import { toDateValue, today, toLocalDate } from "@models/LocalDate";
import { TransactionRequest } from "@services/TransactionService";
import { useCashflow } from "@components/hooks/useCashflow";
import ExchangeService from "@services/ExchangeService";
import apiAction from "@services/ApiAction";
import { useCurrency } from "@components/hooks/useCurrency";

type TransactionTypeModal = {
    transaction?: Transaction;
    newTransaction?: (
        request: TransactionRequest
    ) => void;
    updateTransaction?: (
        id: string,
        request: TransactionRequest
    ) => void;
    children: ReactNode;
}

type FormTransaction = {
    description: string;
    amount: number;
    paymentMethod: number;
    category: number;
    type: TransactionType;
    state: TransactionState;
    date: DateValue | null;
}

export default function TransactionModal({
    transaction,
    newTransaction,
    updateTransaction,
    children
}: TransactionTypeModal) {
    const { user } = useUser();
    const { groupsCategory, paymentMethods } = useCashflow();
    const [currency, setCurrency] = useState<string>(transaction ? transaction.currency : user.settings.currency);
    const listOfCurrency = useCurrency();

    const defaultForm = {
        "description": transaction ? transaction.description : "",
        "amount": transaction ? transaction.defaultAmount : 0,
        "paymentMethod": transaction ? transaction.paymentMethod.id : 0,
        "category": transaction ? transaction.category.id : 0,
        "type": transaction ? transaction.type : "EXPENSE",
        "state": transaction ? transaction.state : "CONFIRM",
        "date": transaction ? toDateValue(transaction.date) : toDateValue(today()),
    }

    const [form, setForm] = useState<FormTransaction>(defaultForm)

    function resetForm() {
        setForm(defaultForm);
    }

    function handlerSubmit() {
        const request: TransactionRequest = {
            "description": form.description,
            "paymentMethodId": form.paymentMethod,
            "type": form.type,
            "state": form.state,
            "categoryId": form.category,
            "amount": form.amount,
            "date": form.date ? toLocalDate(form.date) : today()
        }
        if (transaction) {
            if (updateTransaction)
                updateTransaction(
                    transaction.id,
                    request
                );
        } else {
            if (newTransaction)
                newTransaction(
                    {
                        ...request,
                        "currency": currency
                    }
                );
            resetForm();
        }
    }

    const title = transaction ? `Update transaction` : "New transaction";

    return (
        <Modal>
            {children}
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="ArrowLeftRight" />
                            </Modal.Icon>
                            <Modal.Heading>
                                {title}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-4 p-2">
                            <DatePicker isDisabled={!!transaction} name="date" value={form.date} onChange={(dt) => setForm({ ...form, date: dt })}>
                                <Label>Date</Label>
                                <DateField.Group fullWidth>
                                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                    <DateField.Suffix>
                                        <DatePicker.Trigger>
                                            <DatePicker.TriggerIndicator />
                                        </DatePicker.Trigger>
                                    </DateField.Suffix>
                                </DateField.Group>
                                <DatePicker.Popover>
                                    <Calendar aria-label="Event date">
                                        <Calendar.Header>
                                            <Calendar.YearPickerTrigger>
                                                <Calendar.YearPickerTriggerHeading />
                                                <Calendar.YearPickerTriggerIndicator />
                                            </Calendar.YearPickerTrigger>
                                            <Calendar.NavButton slot="previous" />
                                            <Calendar.NavButton slot="next" />
                                        </Calendar.Header>
                                        <Calendar.Grid>
                                            <Calendar.GridHeader>
                                                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                            </Calendar.GridHeader>
                                            <Calendar.GridBody>
                                                {(date) => <Calendar.Cell date={date} />}
                                            </Calendar.GridBody>
                                        </Calendar.Grid>
                                        <Calendar.YearPickerGrid>
                                            <Calendar.YearPickerGridBody>
                                                {({ year }) => <Calendar.YearPickerCell year={year} />}
                                            </Calendar.YearPickerGridBody>
                                        </Calendar.YearPickerGrid>
                                    </Calendar>
                                </DatePicker.Popover>
                            </DatePicker>
                            <div className="w-full flex flex-col gap-2">
                                <Label isRequired>Description</Label>
                                <div className="w-full flex flex-col gap-2">
                                    <TextArea
                                        className="h-26"
                                        aria-describedby="textarea-controlled-description"
                                        aria-label="Announcement"
                                        placeholder="Compose an announcement..."
                                        value={form.description}
                                        maxLength={120}
                                        onChange={(event) => setForm({ ...form, description: event.target.value })}
                                    />
                                    <Description id="textarea-controlled-description">
                                        Characters: {form.description.length} / 120
                                    </Description>
                                </div>
                            </div>
                            <Select
                                placeholder="Select one"
                                value={currency}
                                onChange={(key) => setCurrency(key?.toString() ?? currency)}
                                isDisabled={!!transaction}
                            >
                                <Label>Currency</Label>
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        {
                                            listOfCurrency.map((value) => (
                                                <ListBox.Item key={value} id={value} textValue={value}>
                                                    {value} {value === user.settings.currency && "(System)"}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))
                                        }

                                    </ListBox>
                                </Select.Popover>
                                {
                                    !transaction && (
                                        <Description>This value cannot be changed later.</Description>
                                    )
                                }
                            </Select>
                            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                                <Select
                                    value={form.type}
                                    onChange={(value) => setForm({ ...form, type: value as TransactionType })}
                                >
                                    <Label>Type</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="INCOME" textValue="Income">
                                                <Chip variant="soft" color="success">Income</Chip>
                                            </ListBox.Item>
                                            <ListBox.Item id="EXPENSE" textValue="Expense">
                                                <Chip variant="soft" color="danger">Expense</Chip>
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                <NumberField
                                    value={form.amount}
                                    minValue={0}
                                    onChange={(value) => setForm({ ...form, amount: value })}
                                    name="currency"
                                    isDisabled={!!transaction}
                                    formatOptions={{
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 2,
                                        style: "currency",
                                        currency: currency,
                                    }}
                                >
                                    <Label>Amount ({currency})</Label>
                                    <NumberField.Group>
                                        <NumberField.DecrementButton />
                                        <NumberField.Input />
                                        <NumberField.IncrementButton />
                                    </NumberField.Group>
                                </NumberField>
                                <Select
                                    value={form.state}
                                    onChange={(value) => setForm({ ...form, state: value as TransactionState })}
                                >
                                    <Label>State</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="CONFIRM" textValue="Confirm">
                                                <Chip variant="secondary" color="success">Confirm</Chip>
                                            </ListBox.Item>
                                            <ListBox.Item id="PENDING" textValue="Pending">
                                                <Chip variant="secondary" color="warning">Pending</Chip>
                                            </ListBox.Item>
                                            <ListBox.Item id="CANCELLED" textValue="Cancelled">
                                                <Chip variant="secondary" color="danger">Cancelled</Chip>
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                            <div className="w-full flex flex-col lg:flex-row gap-3">
                                <Select
                                    placeholder="Select a category"
                                    className="w-full"
                                    value={form.category}
                                    onChange={(value) => setForm({ ...form, category: value ? Number(value.toString()) : 0 })}
                                >
                                    <Label isRequired>Category</Label>
                                    <Select.Trigger>
                                        <Select.Value className="flex flex-row items-center gap-2" />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            {
                                                groupsCategory.map((group) => (
                                                    <ListBox.Section key={group.id}>
                                                        <Header>{group.name}</Header>
                                                        {
                                                            group.categories.map((cat) => (
                                                                <ListBox.Item key={cat.id} id={cat.id} textValue={cat.name}>
                                                                    <ColorSwatch size="xs" color={cat.color} />
                                                                    {cat.name}
                                                                    <ListBox.ItemIndicator />
                                                                </ListBox.Item>
                                                            ))
                                                        }
                                                    </ListBox.Section>
                                                ))
                                            }
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                <Select
                                    placeholder="Select one"
                                    className="w-full"
                                    value={form.paymentMethod}
                                    onChange={(value) => setForm({ ...form, paymentMethod: value ? Number(value.toString()) : 0 })}
                                >
                                    <Label isRequired>Payment Method</Label>
                                    <Select.Trigger>
                                        <Select.Value className="flex flex-row items-center gap-2" />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            {
                                                paymentMethods.map((pm) => (
                                                    <ListBox.Item key={pm.id} id={pm.id} textValue={pm.name} className="flex flex-row">
                                                        <ColorSwatch size="xs" color={pm.color} />
                                                        {pm.name}
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                ))
                                            }
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => resetForm()}>Reser</Button>
                            <Button slot="close" onClick={() => handlerSubmit()}>Done</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal >
    )
}