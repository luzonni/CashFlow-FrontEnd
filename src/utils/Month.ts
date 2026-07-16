import { Key } from "@heroui/react";

export type Month = {
    label: string;
    key: Key;
    index: number;
}

const months: Month[] = [
    { label: "January", key: "jan", index: 1 },
    { label: "February", key: "feb", index: 2 },
    { label: "March", key: "mar", index: 3 },
    { label: "April", key: "apr", index: 4 },
    { label: "May", key: "may", index: 5 },
    { label: "June", key: "jun", index: 6 },
    { label: "July", key: "jul", index: 7 },
    { label: "August", key: "aug", index: 8 },
    { label: "September", key: "sep", index: 9 },
    { label: "October", key: "oct", index: 10 },
    { label: "November", key: "nov", index: 11 },
    { label: "December", key: "dec", index: 12 },
];

export default months;