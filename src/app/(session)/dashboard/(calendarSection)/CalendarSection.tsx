"use client";

import { Button, ButtonGroup, DateValue, RangeCalendar } from "@heroui/react";
import {
    getLocalTimeZone,
    parseDate,
    today,
} from "@internationalized/date";
import DateRange from "@models/DateRange";

type CalendarSectionProps = {
    value: DateRange | undefined;
    setValue: (value: DateRange | undefined) => void;
}

export default function CalendarSection({value, setValue}: CalendarSectionProps) {
    return (
        <div className="flex flex-col items-center gap-4">
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