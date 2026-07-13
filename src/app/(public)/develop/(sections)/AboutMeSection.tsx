import { Icon } from "@components/Icon";
import Sectioner from "@components/Sectioner";
import { Link, Separator, Typography } from "@heroui/react";


export default function AboutMeSection() {
    type Item = {
        label: string;
        link?: string;
        description: string;
    }
    const stack: Item[] = [
        {
            label: "Frontend",
            link: "https://github.com/luzonni/CashFlow-FrontEnd",
            description: "Next.js e TypeScript, com componentização orientada a tipos (discriminated unions) e animações via Framer Motion"
        },
        {
            label: "Backend",
            link: "https://github.com/luzonni/CashFlow-BackEnd",
            description: "Java com Quarkus, seguindo princípios de API REST, autenticação JWT e testes de integração com JUnit 5 e RestAssured"
        },
        {
            label: "Infraestrutura",
            link: "",
            description: "Supabase para persistência, deploy em Render (backend) e Vercel (frontend), com Docker multi-stage e migrações versionadas via Flyway"
        }
    ]

    return (
        <Sectioner el="section" flex="col" gap="md">
            {/* About the project */}
            <Sectioner flex="col" gap="sm">
                <Typography type="h2">
                    Sobre este projeto
                </Typography>
                <div className="flex flex-col gap-2">
                    <Typography type="body">
                        O CashFlow nasceu como resposta a um problema recorrente: a maioria das
                        ferramentas de controle financeiro peca ou pela simplicidade excessiva
                        (planilhas) ou pela complexidade desnecessária (softwares corporativos).
                        Construí este projeto para explorar como resolver esse equilíbrio e, ao
                        mesmo tempo, para aplicar na prática um conjunto de decisões técnicas que
                        considero relevantes para desenvolvimento full-stack moderno.
                    </Typography>
                    <Typography type="body">
                        O sistema cobre o ciclo completo de gestão financeira pessoal: autenticação
                        segura, transações recorrentes, verificação de e-mail, e uma interface
                        pensada para uso real, não apenas para demonstração.
                    </Typography>
                </div>
            </Sectioner>

            <Separator variant="secondary" />

            {/* Stack */}
            <Sectioner flex="col" gap="sm">
                <Typography type="h2">
                    Stack e decisões técnicas
                </Typography>
                <div className="flex flex-col gap-2 px-4">
                    {
                        stack.map((i) => (
                            <div key={i.label} className="flex flex-col lg:flex-row gap-2 lg:items-baseline border-l-4 px-2 border-accent">
                                {
                                    i.link ? (
                                        <Link href={i.link} >
                                            <Typography type="h4">
                                                {i.label}:
                                            </Typography>
                                            <Link.Icon />
                                        </Link>
                                    ) : (
                                        <Typography type="h4">
                                            {i.label}:
                                        </Typography>
                                    )
                                }
                                <Typography type="body-sm">
                                    {i.description}
                                </Typography>
                            </div>
                        ))
                    }
                </div>
                <Typography type="body">
                    Cada escolha aqui foi deliberada, do scheduler de tarefas recorrentes (Quartz) à
                    forma como a autenticação é tratada entre frontend e backend. Este não é um projeto
                    de tutorial: é uma tentativa de construir algo com os mesmos padrões que eu aplicaria
                    em produção.
                </Typography>
            </Sectioner>

            <Separator variant="secondary" />

            {/* Why it's exists? */}
            <Sectioner flex="col" gap="sm">
                <Typography type="h2">
                    Por que este site existe
                </Typography>
                <Typography type="body">
                    Este portfólio serve a um propósito específico: demonstrar, de forma verificável, como
                    eu penso e trabalho como desenvolvedor full-stack com foco em backend. Estou buscando
                    oportunidades remotas nessa área, e prefiro que meu trabalho fale por mim antes de
                    qualquer entrevista.
                </Typography>
            </Sectioner>

            <Separator />

            {/* Me */}
            <Sectioner flex="col" gap="sm">
                <Typography type="h2">
                    Me
                </Typography>
                <div className="flex flex-col gap-2 p-2">
                    <Link href="https://www.linkedin.com/in/luzonni/">
                        <Typography type="h4">
                            Linkedin
                        </Typography>
                        <Link.Icon />
                    </Link>
                    <Link href="https://github.com/luzonni">
                        <Typography type="h4">
                            Github
                        </Typography>
                        <Link.Icon />
                    </Link>
                </div>
            </Sectioner>
        </Sectioner>
    )
}