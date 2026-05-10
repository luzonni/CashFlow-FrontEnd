

export const formatDate = (
    date: string,
    locale: string
): string => {
    return new Intl.DateTimeFormat(locale, {
        dateStyle: "short",
    }).format(new Date(date));
};