

export const formatDate = (
    date: string,
    locale: string
): string => {
    const [year, month, day] = date.split("-").map(Number);
    return new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
    }).format(new Date(year, month - 1, day));
};