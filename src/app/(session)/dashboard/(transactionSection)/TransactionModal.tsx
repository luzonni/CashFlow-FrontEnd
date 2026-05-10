"use client";

import { Icon } from "@components/Icon";
import { Button, Calendar, Chip, CloseButton, ColorSwatch, DateField, DatePicker, Description, Header, Label, ListBox, Modal, NumberField, Select, Separator, TextArea } from "@heroui/react";
import Transaction, { TransactionState, TransactionType } from "@models/Transaction";
import {
    DateValue,
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import { ReactNode, useEffect, useState } from "react";
import Category from "@models/Category";
import PaymentMethod from "@models/PaymentMethod";
import authFetch from "@services/AuthFetch";
import { API } from "@services/API";
import GroupCategory from "@models/GroupCategory";
import { group } from "console";
import { useUser } from "@components/hooks/useUser";

type TransactionTypeModal = {
    transaction?: Transaction;
    newTransaction?: (
        description: string,
        amount: number,
        type: TransactionType,
        state: TransactionState,
        currency: string,
        paymentMethodId: number,
        categoryId: number,
        date: DateValue
    ) => Promise<void>;
    updateTransaction?: (

    ) => Promise<void>;
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
    const { user, loading } = useUser();
    const [description, setDescription] = useState<string>(transaction ? transaction.description : "");
    const [amount, setAmount] = useState<number>(transaction ? transaction.amount : 0);
    const [paymentMethod, setPaymentMethod] = useState<number>(transaction ? transaction.paymentMethod.id : 0);
    const [category, setCategory] = useState<number>(transaction ? transaction.category.id : 0);
    const [type, setType] = useState<TransactionType>(transaction ? transaction.type : "EXPENSE");
    const [state, setState] = useState<TransactionState>(transaction ? transaction.state : "CONFIRM");
    const [date, setDate] = useState<DateValue | null>(transaction ? transaction.date : today(getLocalTimeZone()));

    const title = transaction ? `Update transaction ${transaction.id}` : "New transaction";

    function handlerSubmit() {
        if(!user) {
            return;
        }
        if (transaction) {
            if (updateTransaction)
                updateTransaction();
        } else {
            if (newTransaction)
                newTransaction(
                    description,
                    amount,
                    type,
                    state,
                    user.settings.currency,
                    paymentMethod,
                    category,
                    date ? date : today(getLocalTimeZone()),
                    
                );
        }
    }

    return (
        <Modal>
            {children}
            <Modal.Backdrop>
                <Modal.Container>
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
                                            <Description>Payment confirmed</Description>
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="PENDING" textValue="Pending">
                                            <Chip variant="secondary" color="warning">Pending</Chip>
                                            <Description>Payment pending</Description>
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="CANCELLED" textValue="Cancelled">
                                            <Chip variant="secondary" color="danger">Cancelled</Chip>
                                            <Description>Payment cancelled</Description>
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
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
                                            <Description>Amounts received</Description>
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="EXPENSE" textValue="Expense">
                                            <Chip variant="soft" color="danger">Expense</Chip>
                                            <Description>Amounts paid</Description>
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                            <NumberField
                                value={amount}
                                minValue={0}
                                onChange={(value) => setAmount(value)}
                                name="decimal"
                                formatOptions={{
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                    style: "decimal",
                                }}
                            >
                                <Label>Amount ({user?.settings.currency})</Label>
                                <NumberField.Group>
                                    <NumberField.DecrementButton />
                                    <NumberField.Input />
                                    <NumberField.IncrementButton />
                                </NumberField.Group>
                            </NumberField>
                            <Select
                                placeholder="Select a category"
                                value={category}
                                onChange={(value) => setCategory(value ? Number(value.toString()) : 0)}
                            >
                                <Label>Category</Label>
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
                                value={paymentMethod}
                                onChange={(value) => setPaymentMethod(value ? Number(value.toString()) : 0)}
                            >
                                <Label>Payment Method</Label>
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
                                            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                        </Calendar.Grid>
                                        <Calendar.YearPickerGrid>
                                            <Calendar.YearPickerGridBody>
                                                {({ year }) => <Calendar.YearPickerCell year={year} />}
                                            </Calendar.YearPickerGridBody>
                                        </Calendar.YearPickerGrid>
                                    </Calendar>
                                </DatePicker.Popover>
                            </DatePicker>
                            <div className="flex flex-col gap-2">
                                <Label>Description</Label>
                                <div className="flex w-96 flex-col gap-2">
                                    <TextArea
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