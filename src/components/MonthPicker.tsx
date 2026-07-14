"use client";

import { Button, ButtonGroup, Dropdown, Input, Key, Label, NumberField, Separator } from "@heroui/react";
import DateRange from "@models/DateRange";
import { CalendarDate } from "@internationalized/date";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { motion, AnimatePresence } from "framer-motion";

type Month = {
    label: string;
    key: Key;
    index: number;
}

type MonthPickerProps = {
    value: DateRange;
    setValue: (value: DateRange) => void
}

const months: Month[] = [
    { label: "January", key: "jan", index: 1 },
    { label: "February", key: "feb", index: 2 },
    { label: "March", key: "mar", index: 3 },
    { label: "April", key: "apr", index: 4 },
    { label: "May", key: "may", index: 5 },
    { label: "June", key: "jun", index: 6 },
    { label: "July", key: "jul", index: 7 },
    { label: "August", key: "aug", index: 8 },
    { label: "September", key: "sep", index: 9 },
    { label: "October", key: "oct", index: 10 },
    { label: "November", key: "nov", index: 11 },
    { label: "December", key: "dec", index: 12 },
];

export default function MonthPicker({ value, setValue }: MonthPickerProps) {
    const [year, setYear] = useState<number>(value.start.year);
    const [month, setMonth] = useState<Month>(months[value.start.month - 1])
    const [yearEdit, setYearEdit] = useState<boolean>(false);


    function handlerSelect() {
        const start = new CalendarDate(year, month.index, 1);
        const end = new CalendarDate(
            year,
            month.index,
            new CalendarDate(year, month.index, 1).calendar.getDaysInMonth(
                new CalendarDate(year, month.index, 1)
            )
        );
        setValue({
            start,
            end,
        });
    }

    useEffect(() => {
        handlerSelect();
    }, [month, year])

    return (
        <div className="flex flex-row p-2 gap-2 rounded-4xl bg-default-soft w-fit">
            <Dropdown>
                <Button aria-label="Menu" variant="secondary">
                    <Icon name="Calendar" /> {months[value.start.month - 1].label}
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu
                        className="max-h-80 overflow-y-auto"
                        selectionMode="single"
                        selectedKeys={[month.key]}
                        onAction={(key) => setMonth(months.filter((m) => m.key === key)[0])}
                    >
                        {
                            months.map((m) => (
                                <Dropdown.Item key={m.key} id={m.key} textValue={m.label} variant="default">
                                    <Dropdown.ItemIndicator />
                                    <Label>{m.label}</Label>
                                </Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <Separator orientation="vertical" variant="secondary" />
            <div className={`flex flex-row items-center rounded-full ${yearEdit ? "bg-segment" : "bg-default"}`}>
                <AnimatePresence>
                    {yearEdit && (
                        <motion.button
                            key="minus"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            onClick={() => setYear(year - 1)}
                            className="px-3 flex h-full rounded-l-full overflow-hidden"
                        >
                            <Icon name="Minus" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <motion.button
                    layout
                    onClick={() => setYearEdit(!yearEdit)}
                    className="flex items-center px-4 h-full"
                >
                    {year}
                </motion.button>

                <AnimatePresence>
                    {yearEdit && (
                        <motion.button
                            key="plus"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            onClick={() => setYear(year + 1)}
                            className="px-3 flex h-full rounded-r-full overflow-hidden"
                        >
                            <Icon name="Plus" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}