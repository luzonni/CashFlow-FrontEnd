import CashShower from "@components/CashShower";
import { useCashflow } from "@components/hooks/useCashflow";
import { useCurrency } from "@components/hooks/useCurrency";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Description, Label, Modal, TextArea, Select, ListBox, NumberField, Button, ColorSwatch, Header, DateValue, DatePicker, DateField, Calendar } from "@heroui/react"
import Installment from "@models/Installment";
import apiAction from "@services/ApiAction";
import InstallmentService from "@services/InstallmentService";
import { ReactNode, useState } from "react"
import { toDateValue, today, toLocalDate } from "@models/LocalDate";

type InstallmentsModalProps = {
    installment?: Installment;
    children: ReactNode;
}

type FormInstallment = {
    description: string;
    amount: number;
    installments: number;
    paymentMethodId: number;
    categoryId: number;
    date: DateValue | null;
}

export default function InstallmentsModal({
    installment,
    children
}: InstallmentsModalProps) {
    const { user } = useUser();
    const { paymentMethods, groupsCategory, setInstallments } = useCashflow();
    const listOfCurrency = useCurrency();
    const defaultForm: FormInstallment = {
        description: "",
        amount: 0,
        installments: 1,
        paymentMethodId: 0,
        categoryId: 0,
        date: installment ? toDateValue(installment.date) : toDateValue(today())
    }
    const [currency, setCurrency] = useState<string>(user.settings.currency);
    const [form, setForm] = useState<FormInstallment>(defaultForm);


    function handlerCreate() {
        apiAction(async () => {
            const inst: Installment = await InstallmentService.create({
                ...form,
                currency,
                date: form.date ? toLocalDate(form.date) : today()
            });
            setInstallments((prev) => [...prev, inst]);
        }, "Error while create Installment");
    }

    return (
        <Modal>
            {children}
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger /> {/* Optional: Close button */}
                        <Modal.Header>
                            <Modal.Icon className="bg-default">
                                <Icon name="CreditCard" />
                            </Modal.Icon>
                            <Modal.Heading>
                                Installment
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-3">
                            <div className="flex flex-row gap-2">
                                <DatePicker isDisabled={!!installment} name="date" value={form.date} onChange={(dt) => setForm({ ...form, date: dt })}>
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
                                <Select
                                    placeholder="Select one"
                                    className="w-full"
                                    value={currency}
                                    onChange={(key) => setCurrency(key?.toString() ?? currency)}
                                    isDisabled={false}
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
                                        !false && (
                                            <Description>This value cannot be changed later.</Description>
                                        )
                                    }
                                </Select>
                            </div>
                            <div className="flex flex-row gap-2">
                                <NumberField
                                    value={form.amount}
                                    minValue={0}
                                    onChange={(value) => setForm({ ...form, amount: value })}
                                    name="currency"
                                    isDisabled={false}
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
                                <NumberField
                                    value={form.installments}
                                    minValue={0}
                                    onChange={(value) => setForm({ ...form, installments: value })}
                                    name="Installments"
                                    isDisabled={false}
                                    step={1}
                                    formatOptions={{
                                        maximumFractionDigits: 0,
                                        minimumFractionDigits: 0
                                    }}
                                >
                                    <Label>Number of installments</Label>
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
                                    value={form.categoryId}
                                    onChange={(value) => setForm({ ...form, categoryId: value ? Number(value.toString()) : 0 })}
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
                                    value={form.paymentMethodId}
                                    onChange={(value) => setForm({ ...form, paymentMethodId: value ? Number(value.toString()) : 0 })}
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
                        </Modal.Body>
                        <Modal.Footer className="flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-1">
                                <h1>
                                    {form.installments}x :
                                </h1>
                                <CashShower value={form.amount / form.installments} currency={currency} className="text-foreground" />
                            </div>
                            <div>
                                <Button onClick={() => handlerCreate()}>Done</Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}