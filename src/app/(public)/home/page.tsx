"use client";

import LinkButton from "@components/LinkButton"
import CardInvoice from "./cardInvoice"
import { Button, Link, Separator } from "@heroui/react"
import Sectioner from "@components/Sectioner"
import Banner from "@components/Banner";

export default function Home() {
    return (
        <Sectioner flex="col" gap="md">
            <Sectioner isLanding justify="between" spacing="sm" landingClassName="w-full fixed top-0 backdrop-blur-xs bg-background/80 border-b-2">
                <div className="flex flex-row gap-2 items-center">
                    <img src="/logo.svg" className="h-8" />
                    <h1 className="font-fraunces text-xl font-bold">CashFlow</h1>
                </div>
                <Sectioner flex="row" gap="md" justify="center">
                    <Link href="#resources" >Recursos<Link.Icon /></Link>
                    <Link href="#howitwork" >Como Funciona<Link.Icon /></Link>
                    <Link href="/contact" >Contato<Link.Icon /></Link>
                </Sectioner>
                <div className="flex flex-row gap-2">
                    <LinkButton href="/login" variant="primary">Login</LinkButton>
                    <LinkButton href="/register" variant="secondary">Register</LinkButton>
                </div>
            </Sectioner>
            <div className="h-10"></div>
            <ApresentactionSection />
            <Separator />
            <SourcesSection />
            <Separator />
            <HowItWorks />
            <Separator />
            <Sectioner isLanding>
                <Banner
                    title="Pare de adivinhar para onde seu dinheiro foi."
                    label="Cirar minha conta grátis."
                    description="Crie agora sua conta e melhore sua organização financeira!"
                    action={() => { alert("Opa!") }}
                />
            </Sectioner>
            <Footer />
        </Sectioner>
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
            <Sectioner flex="col" gap="md" className="max-w-1/2">
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
                            <Sectioner flex="row" justify="between" middle className="px-8 py-4">
                                <h1 className="text-accent font-bold">{index + 1}</h1>
                                <h1 className="text-xl font-fraunces">{source.label}</h1>
                                <h1 className="w-1/2 font-light text-sm">{source.description}</h1>
                            </Sectioner>
                            {index < sources.length - 1 && (<Separator />)}
                        </div>
                    ))
                }

            </Sectioner>
        </Sectioner>
    )
}

function HowItWorks() {
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
            <Sectioner flex="col" gap="md" className="w-1/2">
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

function Footer() {
    return (
        <Sectioner isLanding flex="row" justify="between" middle landingClassName="border-t-2" spacing="md">
            <Sectioner>
                <h1 className="text-accent-soft-foreground">© 2026 CASHFLOW</h1>
            </Sectioner>
            <Sectioner flex="row" gap="md" justify="end">
                <Link href="#resources" >Recursos<Link.Icon /></Link>
                <Link href="#howitwork" >Como Funciona<Link.Icon /></Link>
                <Link href="/contact" >Contato<Link.Icon /></Link>
            </Sectioner>
        </Sectioner>
    )
}