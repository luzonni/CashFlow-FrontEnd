import LocalDate from "@models/LocalDate";

export const formatDate = (
    input: string,
    locale: string
): string => {
    const isoDate = input.includes("T")
        ? input.split("T")[0]
        : input;

    const parts = isoDate.split("-");

    if (parts.length !== 3) {
        throw new Error(`Invalid date format: ${input}`);
    }

    const [year, month, day] = parts.map(Number);

    if (
        Number.isNaN(year) ||
        Number.isNaN(month) ||
        Number.isNaN(day)
    ) {
        throw new Error(`Invalid date values: ${input}`);
    }

    const date = new Date(year, month - 1, day);

    if (Number.isNaN(date.getTime())) {
        throw new Error(`Invalid JS Date: ${input}`);
    }

    return new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
    }).format(date);
};