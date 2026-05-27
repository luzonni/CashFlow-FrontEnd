"use client";

import { Icon } from "@components/Icon";
import { Button, Calendar, Chip, ColorSwatch, DateField, DatePicker, Description, Header, Label, ListBox, Modal, NumberField, Select, TextArea } from "@heroui/react";
import Transaction, { TransactionState, TransactionType } from "@models/Transaction";
import {
    DateValue
} from "@internationalized/date";
import { ReactNode, useState } from "react";
import PaymentMethod from "@models/PaymentMethod";
import GroupCategory from "@models/GroupCategory";
import { useUser } from "@components/hooks/useUser";
import LocalDate, { toDateValue, today, toLocalDate } from "@models/LocalDate";
import { TransactionRequest } from "@services/TransactionService";

type TransactionTypeModal = {
    transaction?: Transaction;
    newTransaction?: (
        request: TransactionRequest
    ) => void;
    updateTransaction?: (
        id: string,
        request: TransactionRequest
    ) => void;
    groupsCategory: GroupCategory[];
    paymentMethods: PaymentMethod[];
    children: ReactNode;
}

export default function TransactionModal({
    transaction,
    newTransaction,
    updateTransaction,
    groupsCategory,
    paymentMethods,
    children
}: TransactionTypeModal) {
    const { user } = useUser();
    const [description, setDescription] = useState<string>(transaction ? transaction.description : "");
    const [amount, setAmount] = useState<number>(transaction ? transaction.amount : 0);
    const [paymentMethod, setPaymentMethod] = useState<number>(transaction ? transaction.paymentMethod.id : 0);
    const [category, setCategory] = useState<number>(transaction ? transaction.category.id : 0);
    const [type, setType] = useState<TransactionType>(transaction ? transaction.type : "EXPENSE");
    const [state, setState] = useState<TransactionState>(transaction ? transaction.state : "CONFIRM");
    const [date, setDate] = useState<DateValue | null>(transaction ? toDateValue(transaction.date) : toDateValue(today()));


    function handlerSubmit() {
        const trans: TransactionRequest = {
            "description": description,
            "amount": amount,
            "paymentMethodId": paymentMethod,
            "type": type,
            "state": state,
            "categoryId": category,
            "date": date ? toLocalDate(date) : today()
        }
        if (transaction) {
            if (updateTransaction)
                updateTransaction(
                    transaction.id,
                    trans
                );
        } else {
            if (newTransaction)
                newTransaction(
                    {
                        ...trans,
                        "currency": user.settings.currency
                    }
                );
        }
    }
    
    const title = transaction ? `Update transaction` : "New transaction";
    const currency: string = transaction ? transaction.currency : user.settings.currency;

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
                            <DatePicker name="date" value={date} onChange={setDate}>
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
                                        value={description}
                                        maxLength={120}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <Description id="textarea-controlled-description">
                                        Characters: {description.length} / 120
                                    </Description>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <Select
                                    value={type}
                                    onChange={(value) => setType(value as TransactionType)}
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
                                    value={amount}
                                    minValue={0}
                                    onChange={(value) => setAmount(value)}
                                    name="currency"
                                    formatOptions={{
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 2,
                                        style: "currency",
                                        currency: currency,
                                    }}
                                    step={0.5}
                                >
                                    <Label>Amount ({currency})</Label>
                                    <NumberField.Group>
                                        <NumberField.DecrementButton />
                                        <NumberField.Input />
                                        <NumberField.IncrementButton />
                                    </NumberField.Group>
                                </NumberField>
                                <Select
                                    value={state}
                                    onChange={(value) => setState(value as TransactionState)}
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
                            <div className="w-full flex flex-row gap-2">
                                <Select
                                    placeholder="Select a category"
                                    className="w-full"
                                    value={category}
                                    onChange={(value) => setCategory(value ? Number(value.toString()) : 0)}
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
                                    value={paymentMethod}
                                    onChange={(value) => setPaymentMethod(value ? Number(value.toString()) : 0)}
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
                            <Button slot="close" onClick={() => handlerSubmit()}>Done</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}