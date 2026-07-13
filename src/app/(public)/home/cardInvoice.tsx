import { Separator } from "@heroui/react";
import { Transition } from "motion/react"
import * as motion from "motion/react-client"

const transition: Transition = {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
}

export default function CardInvoice() {
    return (
        <div className="w-full max-w-120 flex flex-col rounded-xl shadow-2xl bg-surface">
            <div className="w-full flex flex-col gap-2 sm:flex-row justify-between bg-foreground items-center p-4 rounded-t-2xl">
                <h1 className="text-default">EXTRATO · JULHO 2026</h1>
                <h1 className="font-mono text-2xl text-default">R$ 3.749,30</h1>
            </div>
            <div className="p-4 rounded-b-md">
                <RowInvoce
                    label="Salário"
                    cat="RECEITA FIXA"
                    value="R$ 5.200,00"
                    positive
                />
                <RowInvoce
                    label="Cofrinho · 118% CDI"
                    cat="INVESTIMENTO"
                    value="R$ 49,30"
                    positive
                />
                <RowInvoce
                    label="Aluguel"
                    cat="MORADIA"
                    value="R$ 1.100,00"
                />
                <RowInvoce
                    label="Meta · Viagem"
                    cat="OBJETIVO · 62%"
                    value="R$ 400,00"
                />
            </div>
            <div className="w-full flex justify-center items-center">
                <svg className="flex flex-row justify-center" height={80}>
                    <motion.path
                        d="M0 40 C 30 40, 40 12, 70 12 S 110 48, 140 48 S 180 8, 210 8 S 250 36, 300 20"
                        fill="transparent"
                        strokeWidth="3"
                        stroke="var(--accent)"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={transition}
                    />
                </svg>
            </div>
        </div>
    )
}

function RowInvoce({ label, cat, value, positive }: { label: string; cat: string; value: string; positive?: boolean }) {
    return (
        <>
            <Separator />
            <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-col gap-1">
                    <h1 className="text-md sm:text-xl">{label}</h1>
                    <h1 className="text-xs font-light">{cat}</h1>
                </div>
                <div>
                    <h1 className={`${positive ? "text-success" : "text-danger"} text-md sm:text-xl`}>{positive ? "+" : "-"} {value}</h1>
                </div>
            </div>
        </>
    )
}