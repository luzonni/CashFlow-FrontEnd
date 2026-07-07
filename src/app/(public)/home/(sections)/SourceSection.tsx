import Sectioner from "@components/Sectioner";
import { Separator } from "@heroui/react";


export default function SourcesSection() {
    type Source = {
        label: string;
        description: string;
    }
    const sources: Source[] = [
        {
            label: "Gastos categorizados",
            description: "Cada real categorizado, cada meta acompanhada, cada investimento comparado, sem planilha manual."
        },
        {
            label: "Metas com progresso real",
            description: "Defina um objetivo, um valor e um prazo. CashFlow calcula quanto guardar por mês e mostra o quanto falta, sempre atualizado."
        },
        {
            label: "Investimentos comparados",
            description: "Acompanhe cofrinhos, CDBs e poupança lado a lado, com rendimento real em CDI — para saber se sua reserva está no lugar certo."
        },
        {
            label: "Fluxo de caixa mensal",
            description: "Um relatório que mostra entradas, saídas e saldo projetado — antes do mês acabar, não depois."
        }
    ]

    return (
        <Sectioner id="resources" flex="col" gap="sm" justify="between" isLanding spacing="none" landingClassName="scroll-mt-30">
            <Sectioner flex="col" gap="md" className="lg:max-w-1/2">
                <h1 className="font-light text-xs text-accent">RECURSOS</h1>
                <h1 className="font-light text-4xl font-fraunces">Quatro formas de entender seu dinheiro</h1>
                <p className="font-light text-sm">
                    Cada real categorizado, cada meta acompanhada, cada investimento comparado, sem planilha manual.
                </p>
            </Sectioner>
            <Sectioner flex="col" className="bg-surface border-2 rounded-md">
                {
                    sources.map((source, index) => (
                        <div key={index}>
                            <Sectioner flex="row" justify="between" middle className="flex-col gap-2 items-center sm:flex-row px-8 py-4">
                                <h1 className="text-accent font-bold">{index + 1}</h1>
                                <h1 className="text-xl font-fraunces">{source.label}</h1>
                                <h1 className="w-1/2 font-light text-sm text-center sm:text-start">{source.description}</h1>
                            </Sectioner>
                            {index < sources.length - 1 && (<Separator />)}
                        </div>
                    ))
                }

            </Sectioner>
        </Sectioner>
    )
}