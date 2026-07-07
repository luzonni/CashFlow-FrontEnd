import Sectioner from "@components/Sectioner";
import CardInvoice from "../cardInvoice";

export default function ApresentactionSection() {
    return (
        <Sectioner flex="row" justify="between" isLanding spacing="md" middle className="flex-col lg:flex-row p-6" >
            <Sectioner className="max-w-140" middle gap="md" flex="col">
                <Sectioner flex="col" gap="md">
                    <h1 className="font-light text-accent">Controle financeiro pessoal</h1>
                    <h1 className="text-xl ms:text-6xl font-fraunces">Todo real que entra e sai tem um destino.</h1>
                    <h1 className="text-md ms:text-4xl italic font-fraunces text-accent">Acompanhe o dele.</h1>
                </Sectioner>
                <div>
                    <p className="font-light">
                        CashFlow reúne contas, metas e investimentos num extrato único e vivo para você ver, todo mês, exatamente para onde seu dinheiro está indo.
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row justify-between">
                        <div className="border-l-2 px-2 border-accent flex flex-col gap-1">
                            <h1 className="border-l-2 p-2 border-accent font-bold">100%</h1>
                            <p className="border-l-2 p-2 border-accent font-light text-sm">Gratuito</p>
                        </div>
                        <div className="border-l-2 px-2 border-accent flex flex-col gap-1">
                            <h1 className="border-l-2 p-2 border-accent font-bold">3 min</h1>
                            <p className="border-l-2 p-2 border-accent font-light text-sm">Para o primeiro extrato</p>
                        </div>
                        <div className="border-l-2 px-2 border-accent flex flex-col gap-1">
                            <h1 className="border-l-2 p-2 border-accent font-bold">BRL</h1>
                            <p className="border-l-2 p-2 border-accent font-light text-sm">Compativel com qualquer moeda</p>
                        </div>
                    </div>
                </div>
            </Sectioner>
            <CardInvoice />
        </Sectioner>
    )
}
