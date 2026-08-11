import {
    DateValue,
    getLocalTimeZone,
    parseDate,
    today as todayInternationalized,
} from "@internationalized/date";
import MonthPeriod from "./MonthPeriod";

type LocalDate = `${number}-${number}-${number}`;

export function toLocalDate(date: DateValue): LocalDate {
    return date.toString() as LocalDate;
}

export function toDateValue(date: LocalDate): DateValue {
    return parseDate(date);
}

export function today(): LocalDate {
    return todayInternationalized(getLocalTimeZone()).toString() as LocalDate;
}

export function equalPeriod(date: LocalDate, period: MonthPeriod) {
    const year = date.split("-")[0];
    
    const month = date.split("-")[1];
    return Number(year) === period.year && month === String(period.month).padStart(2, "0");
}

export default LocalDate;