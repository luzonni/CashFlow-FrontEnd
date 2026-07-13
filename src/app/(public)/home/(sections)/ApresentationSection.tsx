import Sectioner from "@components/Sectioner";
import CardInvoice from "../cardInvoice";
import { Carousel } from "@components/Carousel";

export default function ApresentactionSection() {
    type Advantage = {
        label: string;
        description: string;
    }
    const advantages: Advantage[] = [
        {
            label: "100%",
            description: "Gratuito"
        },
        {
            label: "Inteligente",
            description: "IA para ajudar com seu comportamento"
        },
        {
            label: "BRL",
            description: "Compativel com qualquer moeda"
        },
    ];
    return (
        <Sectioner flex="row" justify="between" isLanding spacing="md" middle className="flex-col lg:flex-row p-6" gap="md">
            <Sectioner className="max-w-140" middle gap="md" flex="col">
                <Sectioner flex="col" gap="md">
                    <h1 className="font-light text-accent">Controle financeiro pessoal</h1>
                    <h1 className="text-xl ms:text-6xl font-fraunces">Todo real que entra e sai tem um destino.</h1>
                    <h1 className="text-md ms:text-4xl italic font-fraunces text-accent">Acompanhe o dele.</h1>
                </Sectioner>
                <div className="flex flex-col gap-4">
                    <p className="font-light">
                        CashFlow reúne contas, metas e investimentos num extrato único e vivo para você ver, todo mês, exatamente para onde seu dinheiro está indo.
                    </p>
                    <Carousel withoutButtons>
                        {
                            advantages.map((a, i) => (
                                <div key={a+"/"+i} className="border-3 rounded-2xl p-3 border-accent flex flex-col gap-1">
                                    <h1 className="border-l-4 p-2 border-accent font-bold">{a.label}</h1>
                                    <p className="border-l-4 p-2 border-accent font-light text-sm">{a.description}</p>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </Sectioner>
            <CardInvoice />
        </Sectioner>
    )
}
