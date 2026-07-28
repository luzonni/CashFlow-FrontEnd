import { icons } from "lucide-react";
import { ReactNode } from "react";
import { Icon } from "./Icon";

type CardCashProps = {
    icon: keyof typeof icons;
    label: string;
    color?: "success" | "warning" | "danger";
    children: ReactNode; 
}

export default function CardCash({
    icon,
    label,
    color = "success",
    children
}: CardCashProps) {
    return (
        <div className="w-full flex flex-col bg-surface rounded-2xl p-4">
            <div className="flex flex-row gap-2 items-center">
                <div className={`flex p-2 bg-${color}-soft rounded-2xl text-${color}`}>
                    <Icon name={icon} />
                </div>
                <h1>{label}</h1>
            </div>
            <div className="p-2">
                {children}
            </div>
        </div>
    )
}