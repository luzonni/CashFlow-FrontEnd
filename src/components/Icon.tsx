import { icons } from "lucide-react";
import { ElementType, ComponentPropsWithoutRef } from "react";

export type ValidLucideIcons = keyof typeof icons;

type IconProps<T extends ElementType = "span"> = {
    name: ValidLucideIcons;
    size?: number;
    stroke?: number;
    color?: string;
    as?: T;
    label?: string;
    className?: string;
} & ComponentPropsWithoutRef<T>;

export function Icon<T extends ElementType = "span">({
    name,
    size = 20,
    stroke = 2,
    color = "currentColor",
    as,
    label,
    ...props
}: IconProps<T>) {
    const Component = as || "span";
    const IconComponent = icons[name];

    if (!IconComponent) return null;

    return (
        <Component
            aria-label={label}
            className="inline-flex items-center justify-center"
            {...props}
        >
            <IconComponent
                size={size}
                strokeWidth={stroke}
                color={color}
                aria-hidden={label ? undefined : true}
            />
        </Component>
    );
}
