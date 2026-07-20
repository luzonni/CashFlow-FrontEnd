import CashShower from "@components/CashShower";
import { useCurrency } from "@components/hooks/useCurrency";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Description, Label, Modal, TextArea, Select, ListBox, NumberField, Button } from "@heroui/react"
import { ReactNode, useState } from "react"

type InstallmentsModalProps = {
    children: ReactNode;
}

type FormInstallment = {
    description: string;
    amount: number;
    installments: number;
}

export default function InstallmentsModal({
    children
}: InstallmentsModalProps) {
    const { user } = useUser();
    const listOfCurrency = useCurrency();
    const defaultForm: FormInstallment = {
        description: "",
        amount: 0,
        installments: 1
    }
    const [currency, setCurrency] = useState<string>(user.settings.currency);
    const [form, setForm] = useState<FormInstallment>(defaultForm);
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
                            <Select
                                placeholder="Select one"
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
                                        <NumberField.Input/>
                                        <NumberField.IncrementButton />
                                    </NumberField.Group>
                                </NumberField>
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
                                <CashShower value={form.amount / form.installments} className="text-foreground" />
                            </div>
                            <div>
                                <Button>Done</Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}