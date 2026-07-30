"use client";

import { Button, ButtonGroup, Dropdown, Input, Key, Label, NumberField, Separator } from "@heroui/react";
import DateRange from "@models/DateRange";
import { CalendarDate } from "@internationalized/date";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { motion, AnimatePresence } from "framer-motion";
import months, { Month } from "@utils/Month";
import MonthPeriod from "@models/MonthPeriod";

type MonthPickerProps = {
    value: MonthPeriod;
    setValue: (value: MonthPeriod) => void
}

export default function MonthPicker({ value, setValue }: MonthPickerProps) {
    const [year, setYear] = useState<number>(value.year);
    const [month, setMonth] = useState<Month>(months[value.month - 1])
    const [yearEdit, setYearEdit] = useState<boolean>(false);

    useEffect(() => {
        setValue({
            month: month.index,
            year: year,
        });
    }, [month, year])

    return (
        <div className="flex flex-row md:p-2 md:gap-2 rounded-4xl bg-default-soft w-fit">
            <Dropdown>
                <Button aria-label="Menu" variant="secondary" className="rounded-none rounded-l-full md:rounded-full">
                    <Icon name="Calendar" /> {months[value.month - 1].label}
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
            <div className={`flex flex-row items-center md:rounded-full rounded-r-full ${yearEdit ? "bg-segment" : "bg-default"}`}>
                <AnimatePresence>
                    {yearEdit && (
                        <motion.button
                            key="minus"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            onClick={() => setYear(year - 1)}
                            className="px-1 md:px-3 flex h-full rounded-l-full overflow-hidden"
                        >
                            <Icon name="Minus" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <motion.button
                    layout
                    onClick={() => setYearEdit(!yearEdit)}
                    className={`flex items-center px-4 md:px-4 h-full ${yearEdit ? "text-foreground" : "text-accent"}`}
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
                            className="px-1 md:px-3 flex h-full rounded-r-full overflow-hidden"
                        >
                            <Icon name="Plus" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}