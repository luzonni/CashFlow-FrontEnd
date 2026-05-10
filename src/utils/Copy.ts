import { toast } from "@heroui/react";

export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success(`"${text}" was copied`)
    } catch (err) {
        toast.danger("Something was wrong to copy")
    }
};