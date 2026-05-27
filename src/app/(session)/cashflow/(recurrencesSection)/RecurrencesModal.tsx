"use client";

import { useCashflow } from "@components/hooks/useCashflow";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import {
    Label,
    Modal,
    Tabs,
    Select,
    ListBox,
    NumberField,
    Skeleton,
    Chip,
    Header,
    ColorSwatch,
    Button,
    ProgressBar,
    Input,
    TextArea,
    Description,
    Checkbox,
    DatePicker,
    DateField,
    Calendar,
    DateValue
} from "@heroui/react";
import Category from "@models/Category";
import { today, getLocalTimeZone } from "@internationalized/date";
import PaymentMethod from "@models/PaymentMethod";
import { TransactionType } from "@models/Transaction";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useMemo, useState } from "react";
import Recurrence from "@models/Recurrence";
import RecurrenceService from "@services/RecurrenceService";
import apiAction from "@services/ApiAction";

type RecurrencesModalProps = {
    children: ReactNode;
}

type FormRecurrence = {
    amount: number;
    paymentMethod: number;
    type: TransactionType;
    category: number;
    name: string;
    description: string;
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    interval: number;
    firstRecord: DateValue;
    occurence: number;
    checked: boolean;
}

const defaultForm: FormRecurrence = {
    amount: 0,
    paymentMethod: 0,
    type: "EXPENSE",
    category: 0,
    description: "",
    frequency: "MONTHLY",
    interval: 0,
    firstRecord: today(getLocalTimeZone()),
    name: "",
    occurence: 0,
    checked: false
};

export default function RecurrencesModal({ children }: RecurrencesModalProps) {
    const { setRecurrences } = useCashflow();
    const [form, setForm] = useState<FormRecurrence>(defaultForm);
    const { user } = useUser();

    function handlerCreateRecurrence() {
        apiAction(async () => {
            const recurrence: Recurrence = await RecurrenceService.create({
                "name": form.name,
                "description": form.description,
                "categoryId": form.category,
                "paymentMethodId": form.paymentMethod,
                "type": form.type,
                "amount": form.amount,
                "frequency": form.frequency,
                "currency": user.settings.currency,
                "firstRecord": form.firstRecord.toString(),
                "interval": form.interval,
                "maxOccurrences": form.occurence,
                "timeZone": "GM-2"
            });
            setRecurrences((prev) => [...prev, recurrence])
        }, "Error while create a new recurrence")
    }

    return (
        <Modal onOpenChange={() => { setForm(defaultForm) }}>
            {children}
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Icon name="ChartColumn" />
                            </Modal.Icon>
                            <Modal.Heading>
                                <Label>Create Recurrence</Label>
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <Tabs className="w-full max-w-md">
                                <Tabs.ListContainer>
                                    <Tabs.List aria-label="Options">
                                        <Tabs.Tab id="transaction">
                                            Transaction
                                            <Tabs.Indicator />
                                        </Tabs.Tab>
                                        <Tabs.Tab id="recurrence">
                                            Recurrence
                                            <Tabs.Indicator />
                                        </Tabs.Tab>
                                        <Tabs.Tab id="resume">
                                            Resume
                                            <Tabs.Indicator />
                                        </Tabs.Tab>
                                    </Tabs.List>
                                </Tabs.ListContainer>
                                <Tabs.Panel className="pt-4 h-60 overflow-clip" id="transaction">
                                    <CreateTransactionTemplate
                                        {...{ form, setForm }}
                                    />
                                </Tabs.Panel>
                                <Tabs.Panel className="pt-4 h-60 overflow-y-auto" id="recurrence">
                                    <SetRecurrenceValues {...{ form, setForm }} />
                                </Tabs.Panel>
                                <Tabs.Panel className="pt-4 h-60" id="resume">
                                    <Resume {...{ form, setForm }} />
                                </Tabs.Panel>
                            </Tabs>
                        </Modal.Body>
                        <Modal.Footer>
                            <Progress {...{ form }} handlerCreateRecurrence={handlerCreateRecurrence} />
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

function Progress({ form, handlerCreateRecurrence }: { form?: FormRecurrence, handlerCreateRecurrence: () => void }) {
    const [done, setDone] = useState<boolean>(false);
    const progress = useMemo(() => {
        if (!form) return 0;

        const validations = [
            !!form.description,
            !!form.name,
            form.amount > 0,
            form.category !== 0,
            form.paymentMethod !== 0,
            form.occurence > 0,
            form.interval > 0,
            form.checked
        ];

        const completed = validations.filter(Boolean).length;
        setDone(completed === validations.length);
        return (completed / validations.length) * 100;
    }, [form]);

    return (
        <div className="flex flex-row w-full gap-2">
            <ProgressBar aria-label="Loading" value={progress}>
                <Label>Progress</Label>
                <ProgressBar.Output />
                <ProgressBar.Track>
                    <ProgressBar.Fill />
                </ProgressBar.Track>
            </ProgressBar>
            <Button isDisabled={!done} onClick={handlerCreateRecurrence}>Done</Button>
        </div>
    )
}

function CreateTransactionTemplate(
    { form, setForm }:
        {
            form: FormRecurrence,
            setForm: (value: FormRecurrence) => void
        }
) {
    const { user } = useUser();
    const { groupsCategory, paymentMethods } = useCashflow();

    const currency: string = user.settings.currency;

    return (
        <div className="flex flex-col gap-4 p-2 h-full justify-center">
            <div className="flex flex-row gap-2">
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
                    formatOptions={{
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                        style: "currency",
                        currency: currency,
                    }}
                    step={0.5}
                >
                    <Label isRequired>Amount ({currency})</Label>
                    <NumberField.Group>
                        <NumberField.DecrementButton />
                        <NumberField.Input />
                        <NumberField.IncrementButton />
                    </NumberField.Group>
                </NumberField>
            </div>
            <div className="flex flex-row gap-2">
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
        </div>
    )
}

function SetRecurrenceValues(
    { form, setForm }:
        {
            form: FormRecurrence,
            setForm: (value: FormRecurrence) => void
        }
) {
    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-1">
                <Label htmlFor="input-type-email">Name</Label>
                <Input
                    placeholder="Netflix"
                    type="text"
                    value={form.name}
                    maxLength={50}
                    onChange={(value) => setForm({ ...form, name: value.target.value })}
                />
            </div>
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
            <DatePicker
                name="date"
                value={form.firstRecord}
                onChange={(v) => { setForm({ ...form, firstRecord: v as DateValue }) }}

            >
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
                <Description>
                    Date of the first recurrence launch
                </Description>
            </DatePicker>
            <div className="flex flex-col gap-2">
                <div className="w-full">
                    <Select
                        placeholder="Select one"
                        className=""
                        value={form.frequency}
                        onChange={(value) =>
                            setForm({
                                ...form,
                                frequency: value as typeof form.frequency
                            })
                        }
                    >
                        <Label>Frequency</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="DAILY" textValue="Daily">
                                    Daily
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="WEEKLY" textValue="Weekly">
                                    Weekly
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="MONTHLY" textValue="Monthly">
                                    Monthly
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="YEARLY" textValue="Yearly">
                                    Yearly
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
                <div className="flex flex-row gap-1 overflow-hidden p-1">
                    <NumberField
                        isRequired
                        className="w-full"
                        value={form.occurence}
                        onChange={(value: number) =>
                            setForm({
                                ...form,
                                occurence: value
                            })
                        }
                        minValue={0}
                        name="occurence"
                        step={1}
                    >
                        <Label>Occurences</Label>
                        <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input />
                            <NumberField.IncrementButton />
                        </NumberField.Group>
                    </NumberField>
                    <NumberField
                        isRequired
                        className="w-full"
                        value={form.interval}
                        onChange={(value: number) =>
                            setForm({
                                ...form,
                                interval: value
                            })
                        }
                        minValue={0}
                        name="interval"
                        step={1}
                    >
                        <Label>Interval</Label>
                        <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input />
                            <NumberField.IncrementButton />
                        </NumberField.Group>
                    </NumberField>
                </div>
            </div>
        </div>
    )
}

function Resume(
    { form, setForm }:
        {
            form: FormRecurrence,
            setForm: (value: FormRecurrence) => void
        }
) {
    const { categories, paymentMethods } = useCashflow();
    const category: Category | undefined = categories.filter((c) => c.id === form.category)[0];
    const paymentMethod: PaymentMethod | undefined = paymentMethods.filter((pm) => pm.id === form.paymentMethod)[0];
    return (
        <div className="flex flex-col gap-2 justify-between h-full">
            <div className="flex flex-col gap-2 p-2 overflow-y-auto bg-background-tertiary rounded-2xl">
                <div className="flex flex-row gap-3 bg-surface-secondary items-center p-3 rounded-2xl">
                    <ColorSwatch color={form.name ? "#00ff00" : "#ff0000"} className="w-2" shape="square" />
                    <div className="flex flex-col gap-1">
                        <Label>Name</Label>
                        <Description>{form.name ? form.name : "Is Required"}</Description>
                    </div>
                </div>

                <div className="flex flex-row gap-3 bg-surface-secondary items-center p-3 rounded-2xl">
                    <ColorSwatch color={form.description ? "#00ff00" : "#ff0000"} className="w-2" shape="square" />
                    <div className="flex flex-col gap-1">
                        <Label>Description</Label>
                        <Description>{form.description ? form.description : "Is Required"}</Description>
                    </div>
                </div>

                <div className="flex flex-row gap-3 bg-surface-secondary items-center p-3 rounded-2xl">
                    <ColorSwatch color={category ? "#00ff00" : "#ff0000"} className="w-2" shape="square" />
                    <div className="flex flex-col gap-1">
                        <Label>Category</Label>
                        <Description>{category ? category.name : "Is Required"}</Description>
                    </div>
                </div>

                <div className="flex flex-row gap-3 bg-surface-secondary items-center p-3 rounded-2xl">
                    <ColorSwatch color={paymentMethod ? "#00ff00" : "#ff0000"} className="w-2" shape="square" />
                    <div className="flex flex-col gap-1">
                        <Label>Payment Method</Label>
                        <Description>{paymentMethod ? paymentMethod.name : "Is Required"}</Description>
                    </div>
                </div>

                <div className="flex flex-row gap-3 bg-surface-secondary items-center p-3 rounded-2xl">
                    <ColorSwatch color={form.type ? "#00ff00" : "#ff0000"} className="w-2" shape="square" />
                    <div className="flex flex-col gap-1">
                        <Label>Type</Label>
                        <Description>{form.type}</Description>
                    </div>
                </div>

                <div className="flex flex-row gap-3 bg-surface-secondary items-center p-3 rounded-2xl">
                    <ColorSwatch color={form.frequency ? "#00ff00" : "#ff0000"} className="w-2" shape="square" />
                    <div className="flex flex-col gap-1">
                        <Label>Frequency</Label>
                        <Description>{form.frequency}</Description>
                    </div>
                </div>
                <div className="flex flex-row gap-3 bg-surface-secondary items-center p-3 rounded-2xl">
                    <ColorSwatch color={form.occurence ? "#00ff00" : "#ff0000"} className="w-2" shape="square" />
                    <div className="flex flex-col gap-1">
                        <Label>Occurences</Label>
                        <Description>{form.occurence ? form.occurence : "Is Required"}</Description>
                    </div>
                </div>
                <div className="flex flex-row gap-3 bg-surface-secondary items-center p-3 rounded-2xl">
                    <ColorSwatch color={form.interval ? "#00ff00" : "#ff0000"} className="w-2" shape="square" />
                    <div className="flex flex-col gap-1">
                        <Label>Interval</Label>
                        <Description>{form.interval ? form.interval : "Is Required"}</Description>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end">
                <Checkbox
                    id="checking-values"
                    isSelected={form.checked}
                    onChange={(value) => setForm({ ...form, checked: value })}
                >
                    <Checkbox.Control>
                        <Checkbox.Indicator />
                    </Checkbox.Control>

                    <Checkbox.Content>
                        <Label htmlFor="checking-values">Checked!</Label>
                    </Checkbox.Content>
                </Checkbox>
            </div>
        </div>
    )
}