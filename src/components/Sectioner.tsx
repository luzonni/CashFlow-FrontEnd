import { ComponentPropsWithRef, ElementType } from "react"
import { tv, VariantProps } from "tailwind-variants";

const sectioner = tv({
    base: "w-full",
    variants: {
        flex: {
            row: "flex flex-row",
            col: "flex flex-col"
        },
        gap: {
            none: "gap-0",
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-8"
        },
        spacing: {
            xs: "py-2",
            sm: "py-4",
            md: "py-8",
            lg: "py-16",
        },
        justify: {
            between: "justify-between",
            center: "justify-center",
            around: "justify-around",
            base: "justify-baseline"
        },
        middle: {
            true: "items-center",
        }
    },
    defaultVariants: {
        spacing: "md",
        flex: "row",
        gap: "none",
        isLanding: false,
        justify: "base"
    },
});

type SectionerProps<T extends ElementType = "div"> = {
    el?: T;
    spacing?: VariantProps<typeof sectioner>["spacing"];
    flex?: VariantProps<typeof sectioner>["flex"];
    middle?: VariantProps<typeof sectioner>["middle"];
    isLanding?: boolean;
    justify?: VariantProps<typeof sectioner>["justify"];
    gap?: VariantProps<typeof sectioner>["gap"];
} & ComponentPropsWithRef<T>;


export default function Sectioner<T extends ElementType = "div">({
    el,
    flex,
    spacing,
    middle,
    gap,
    justify,
    isLanding,
    className,
    children,
    ...props
}: SectionerProps<T>) {
    const Element = el || "div";
    const variants: VariantProps<typeof sectioner> = {
        flex,
        spacing,
        middle,
        gap,
        justify
    }
    return (
        <Element
            className={isLanding ? "w-full flex justify-center" : sectioner({ ...variants, className })}
            {...props}
        >
            {
                isLanding ? (
                    <div
                        className={sectioner({
                            ...variants,
                            className: `max-w-290 ${className ?? ""}`,
                        })}
                    >
                        {children}
                    </div>
                ) :
                    children

            }
        </Element>
    )
}