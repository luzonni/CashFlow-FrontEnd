import DateRange from "./DateRange";
import { CalendarDate } from "@internationalized/date";

type MonthPeriod = {
    month: number;
    year: number;
}

export function toRange({ month, year }: MonthPeriod): DateRange {
    const start = new CalendarDate(year, month, 1);
    const end = new CalendarDate(year, month + 1, 1).subtract({ days: 1 });
    return { start, end };
}

export default MonthPeriod;