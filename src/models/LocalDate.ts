import {
    DateValue,
    getLocalTimeZone,
    parseDate,
    today as todayInternationalized,
} from "@internationalized/date";

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

export default LocalDate;