import { tv, VariantProps } from "tailwind-variants";

const sectionTv = tv({
    base: "flex px-4 bg-white rounded-2xl",
    variants: {
        vertical: {
            true: "flex-row",
            false: "flex-col"
        },
        layout: {
            start: "",
            end: "justify-end",
            between: "justify-between",
            middle: "items-center"
        },
        gap: {
            sm: "gap-1",
            md: "gap-2",
            lg: "gap-4"
        },
        shadow: {
            true: "shadow-2xl",
            false: ""
        },
        pad: {
            sm: "p-2",
            md: "p-4",
            lg: "p-8"
        }
    },
    defaultVariants: {
        shadow: false,
        pad: "md",
        vertical: false,
        gap: "md",
        layout: "start"
    }
});

type SectionProps = React.ComponentProps<'section'> & VariantProps<typeof sectionTv>;

export default function Section({ children, ...props }: SectionProps) {
    return (
        <section
            className={sectionTv(props)}
            {...props}
        >
            {children}
        </section>
    )
}