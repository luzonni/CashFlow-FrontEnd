import { ComponentProps, ComponentPropsWithRef, ElementType } from "react"
import { tv, VariantProps } from "tailwind-variants";

const sectionerTv = tv({
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
            none: "",
            xs: "py-2",
            sm: "py-4",
            md: "py-8",
            lg: "py-16",
        },
        justify: {
            between: "justify-between",
            center: "justify-center",
            around: "justify-around",
            end: "justify-end",
            base: "justify-baseline"
        },
        middle: {
            true: "items-center",
        }
    },
    defaultVariants: {
        spacing: "xs",
        flex: "row",
        gap: "none",
        isLanding: false,
        justify: "base"
    },
});

type SectionerProps<T extends ElementType = "div"> = {
    el?: T;
    spacing?: VariantProps<typeof sectionerTv>["spacing"];
    flex?: VariantProps<typeof sectionerTv>["flex"];
    middle?: VariantProps<typeof sectionerTv>["middle"];
    isLanding?: boolean;
    landingClassName?: ComponentProps<T>["className"];
    justify?: VariantProps<typeof sectionerTv>["justify"];
    gap?: VariantProps<typeof sectionerTv>["gap"];
} & ComponentPropsWithRef<T>;


export default function Sectioner<T extends ElementType = "div">({
    el,
    flex,
    spacing,
    middle,
    gap,
    justify,
    isLanding,
    landingClassName,
    className,
    children,
    ...props
}: SectionerProps<T>) {
    const Element = el || "div";
    const variants: VariantProps<typeof sectionerTv> = {
        flex,
        spacing,
        middle,
        gap,
        justify
    }
    return (
        <Element
            className={isLanding ? `w-full flex justify-center ${landingClassName ?? ""}` : sectionerTv({ ...variants, className })}
            {...props}
        >
            {
                isLanding ? (
                    <div
                        className={sectionerTv({
                            ...variants,
                            className: `max-w-7xl ${className ?? ""}`,
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