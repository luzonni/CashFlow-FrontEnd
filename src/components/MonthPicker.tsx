"use client";

import { Button, Dropdown, Input, Label } from "@heroui/react";
import DateRange from "@models/DateRange";
import { CalendarDate } from "@internationalized/date";

type Month = {
    label: string;
    key: number;
}

type MonthPickerProps = {
    value: DateRange;
    setValue: (value: DateRange) => void
}

export default function MonthPicker({ value, setValue }: MonthPickerProps) {
    const months: Month[] = [
        { label: "January", key: 1 },
        { label: "February", key: 2 },
        { label: "March", key: 3 },
        { label: "April", key: 4 },
        { label: "May", key: 5 },
        { label: "June", key: 6 },
        { label: "July", key: 7 },
        { label: "August", key: 8 },
        { label: "September", key: 9 },
        { label: "October", key: 10 },
        { label: "November", key: 11 },
        { label: "December", key: 12 },
    ];
    const monthSelect = value.start.month;
    function handlerSelect(month: number) {
        const year = new Date().getFullYear();
        const start = new CalendarDate(year, month, 1);
        const end = new CalendarDate(
            year,
            month,
            new CalendarDate(year, month, 1).calendar.getDaysInMonth(
                new CalendarDate(year, month, 1)
            )
        );
        setValue({
            start,
            end,
        });
    }
    return (
        <div className="flex flex-row p-2 rounded-md bg-surface-secondary w-fit">
            <Dropdown>
                <Button aria-label="Menu" variant="secondary">
                    Month: {months[value.start.month-1].label}
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu className="max-h-80 overflow-scroll w-fit min-w-46" selectionMode="single" selectedKeys={String(monthSelect)} onAction={(key) => handlerSelect(Number(key))}>
                        {
                            months.map((m) => (
                                <Dropdown.Item key={m.key} id={String(m.key)} textValue={m.label} variant="default">
                                    <Dropdown.ItemIndicator />
                                    <Label>{m.label}</Label>
                                </Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <Input type="number"/>
        </div>
    )
}