"use client";

import { Icon } from "@components/Icon";
import { Button, ButtonGroup, Modal, RangeCalendar } from "@heroui/react";
import {
    DateValue,
    getLocalTimeZone,
    parseDate,
    today,
} from "@internationalized/date";
import DateRange from "@models/DateRange";

type CalendarModalProps = {
    value: DateRange | undefined;
    setValue: (value: DateRange | undefined) => void;
}

export default function CalendarModal({ value, setValue }: CalendarModalProps) {

    function dataPattern(data: DateValue): string {
        const date = data.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone);
        return new Intl.DateTimeFormat(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    }

    return (
        <>
            <Modal>
                <Button variant="primary">
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
                </Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog>
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-default text-foreground">
                                    <Icon name="CalendarDays" />
                                </Modal.Icon>
                                <Modal.Heading>Select the date range</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
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
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="flex flex-col gap-2">
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

                                    <Button className="w-full" slot="close">
                                        Continue
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </>
    );

}