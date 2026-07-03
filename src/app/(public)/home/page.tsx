import LinkButton from "@components/LinkButton"
import CardInvoice from "./cardInvoice"
import { Separator } from "@heroui/react"
import Sectioner from "@components/Sectioner"

export default function Home() {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <header className="w-full border-b-2 flex justify-center">
                <div className="w-full max-w-290 py-6 flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <img src="/logo.svg" className="h-8" />
                        <h1 className="font-fraunces text-xl font-bold">CashFlow</h1>
                    </div>
                    <div className="flex flex-row gap-2">
                        <LinkButton href="/login" variant="primary">Login</LinkButton>
                        <LinkButton href="/register" variant="secondary">Register</LinkButton>
                    </div>
                </div>
            </header>
            <ApresentactionSection />
            <Separator />
            <SourcesSection />
        </div>
    )
}


function ApresentactionSection() {
    return (
        <Sectioner flex="row" justify="between" isLanding spacing="md" middle>
            <Sectioner className="max-w-140" middle gap="md" flex="col">
                <Sectioner flex="col" gap="md">
                    <h1 className="font-light text-accent">Controle financeiro pessoal</h1>
                    <h1 className="text-6xl font-fraunces">Todo real que entra e sai tem um destino.</h1>
                    <h1 className="text-4xl italic font-fraunces text-accent">Acompanhe o dele.</h1>
                </Sectioner>
                <div>
                    <p className="font-light">
                        CashFlow reúne contas, metas e investimentos num extrato único e vivo para você ver, todo mês, exatamente para onde seu dinheiro está indo.
                    </p>
                    <div className="flex flex-row justify-between">
                        <div className="border-l-2 px-2 my-6 border-accent flex flex-col gap-1">
                            <h1 className="border-l-2 p-2 border-accent font-bold">100%</h1>
                            <p className="border-l-2 p-2 border-accent font-light text-sm">Gratuito</p>
                        </div>
                        <div className="border-l-2 px-2 my-6 border-accent flex flex-col gap-1">
                            <h1 className="border-l-2 p-2 border-accent font-bold">3 min</h1>
                            <p className="border-l-2 p-2 border-accent font-light text-sm">Para o primeiro extrato</p>
                        </div>
                        <div className="border-l-2 px-2 my-6 border-accent flex flex-col gap-1">
                            <h1 className="border-l-2 p-2 border-accent font-bold">100%</h1>
                            <p className="border-l-2 p-2 border-accent font-light text-sm">Compativel com qualquer moeda</p>
                        </div>
                    </div>
                </div>
            </Sectioner>
            <CardInvoice />
        </Sectioner>
    )
}

function SourcesSection() {
    return (
        <Sectioner flex="row" gap="sm" justify="around" isLanding>
            <div>
                <h1 className="">Recursos</h1>
            </div>
            <div>
                <h1> ola!</h1>
            </div>
        </Sectioner>
    )
}
