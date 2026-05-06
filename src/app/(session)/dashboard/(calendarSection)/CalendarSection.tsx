"use client";

import { Button, ButtonGroup, DateValue, Description, RangeCalendar } from "@heroui/react";
import {
    getLocalTimeZone,
    parseDate,
    today,
} from "@internationalized/date";
import { useEffect, useState } from "react";

type DateRange = {
    start: DateValue;
    end: DateValue;
};



export default function CalendarSection() {
    const [value, setValue] = useState<DateRange | null>();

    useEffect(() => {
        const currentDate = today(getLocalTimeZone());
        setValue({
            start: currentDate,
            end: currentDate
        });
    }, [])

    function dataPattern(data: DateValue): string {
        const date = data.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone);
        return new Intl.DateTimeFormat(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    }

    return (
        <div className="flex flex-col items-center gap-4 justify-between h-full">

            <div className="flex flex-row bg-accent py-3 px-4 rounded-2xl shadow-xl">
                <h1 className="text-center text-white font-bold">
                    {
                        value ?
                            (value.start.toString() === value.end.toString() ?
                                dataPattern(value.start) :
                                `${dataPattern(value.start)} -> ${dataPattern(value.end)}`)
                            :
                            "(None)"
                    }
                </h1>
            </div>
            <RangeCalendar
                aria-label="Trip dates"
                firstDayOfWeek="mon"
                value={value}
                onChange={setValue}
            >
                <RangeCalendar.Header>
                    <RangeCalendar.Heading />
                    <RangeCalendar.NavButton slot="previous" />
                    <RangeCalendar.NavButton slot="next" />
                </RangeCalendar.Header>
                <RangeCalendar.Grid>
                    <RangeCalendar.GridHeader>
                        {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                    </RangeCalendar.GridHeader>
                    <RangeCalendar.GridBody>
                        {(date) => <RangeCalendar.Cell date={date} />}
                    </RangeCalendar.GridBody>
                </RangeCalendar.Grid>
            </RangeCalendar>
            <div className="flex gap-2">
                <ButtonGroup>
                    <Button
                        size="sm"
                        variant="secondary"
                        onPress={() => {
                            const currentDate = today(getLocalTimeZone());
                            setValue({
                                start: currentDate,
                                end: currentDate
                            });
                        }}
                    >
                        Today
                    </Button>
                    <Button
                        size="sm"
                        variant="tertiary"
                        onPress={() => {
                            const start = today(getLocalTimeZone());
                            setValue({ end: start.add({ days: 6 }), start });
                        }}
                    >
                        <ButtonGroup.Separator />
                        Week ahead
                    </Button>
                    <Button
                        size="sm"
                        variant="tertiary"
                        onPress={() => {
                            const start = today(getLocalTimeZone());
                            setValue({ end: start.subtract({ days: 6 }), start });
                        }}
                    >
                        <ButtonGroup.Separator />
                        Week behind
                    </Button>
                    <Button
                        size="sm"
                        variant="tertiary"
                        onPress={() => {
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = today.getMonth() + 1;
                            const start = parseDate(
                                `${year}-${String(month).padStart(2, "0")}-01`
                            );
                            const end = parseDate(
                                `${year}-${String(month).padStart(2, "0")}-${String(
                                    new Date(year, month, 0).getDate()
                                ).padStart(2, "0")}`
                            );
                            setValue({ start, end });
                        }}
                    >
                        <ButtonGroup.Separator />
                        Current Month
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );

}