import Sectioner from "@components/Sectioner";
import { Separator } from "@heroui/react";


export default function HowItWorks() {
    type Step = {
        label: string;
        description: string;
        value: string;
    }
    const steps: Step[] = [
        {
            label: "Conecte suas contas",
            description: "Importe ou lance manualmente suas receitas e despesas do mês.",
            value: "R$ 0,00"
        },
        {
            label: "Defina suas metas",
            description: "Escolha um objetivo: viagem, reserva de emergência, um projeto e um prazo.",
            value: "R$ 3.100,00"
        },
        {
            label: "Acompanhe o fluxo",
            description: "Veja o extrato se atualizar a cada lançamento, com o saldo projetado para o fim do mês.",
            value: "R$ 2.898,40"
        }
    ]
    return (
        <Sectioner id="howitwork" isLanding flex="col" gap="lg" landingClassName="scroll-mt-30">
            <Sectioner flex="col" gap="md" className="lg:w-1/2">
                <h1 className="font-light text-xs text-accent">
                    COMO FUNCIONA
                </h1>
                <h1 className="font-light text-4xl font-fraunces">
                    Três lançamentos até o seu primeiro extrato
                </h1>
            </Sectioner>
            <Sectioner flex="col" className="border-2 rounded-md bg-accent">
                {
                    steps.map((step, index) => (
                        <div key={index}>
                            <Sectioner flex="row" middle justify="between" gap="lg" className="px-8 py-4">
                                <h1 className="text-default font-bold">{index + 1}</h1>
                                <Sectioner flex="col">
                                    <h1 className="text-default font-bold">{step.label}</h1>
                                    <h1 className="text-default font-light text-sm">{step.description}</h1>
                                </Sectioner>
                                <Sectioner flex="col" className="min-w-fit max-w-fit">
                                    <h1 className="text-default font-light text-sm">Saldo</h1>
                                    <h1 className="text-default font-bold">{step.value}</h1>
                                </Sectioner>
                            </Sectioner>
                            {index < steps.length - 1 && (<Separator />)}
                        </div>
                    ))
                }
            </Sectioner>
        </Sectioner>
    )
}