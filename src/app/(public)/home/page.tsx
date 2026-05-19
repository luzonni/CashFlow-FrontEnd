

export default function Home() {
    return (
        <div className="min-h-screen bg-[#F5EBDD] text-[#1F2B24] font-serif">
            {/* HERO */}
            <section className="relative h-screen overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1800&auto=format&fit=crop"
                    alt="Vista da serra"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />

                <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10 md:px-16">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-light tracking-[0.2em] text-[#E8C78F] md:text-7xl">
                                HYGGE
                            </h1>
                            <p className="mt-2 text-lg tracking-[0.5em] text-[#E8C78F]">
                                POUSADA
                            </p>
                        </div>

                        <button className="rounded-full border border-[#E8C78F] px-6 py-3 text-sm uppercase tracking-[0.25em] text-[#F5EBDD] transition hover:bg-[#E8C78F] hover:text-[#1F2B24]">
                            Reservar
                        </button>
                    </div>

                    <div className="max-w-3xl pb-16">
                        <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#E8C78F]">
                            Seu refúgio no alto da serra
                        </p>

                        <h2 className="text-5xl leading-tight text-[#F8F1E7] md:text-7xl">
                            Desacelere. Respire. Viva Hygge.
                        </h2>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#EFE6D7] md:text-xl">
                            Uma experiência acolhedora em meio à natureza, com clima serrano,
                            silêncio tranquilo, gastronomia especial e uma vista de cinema.
                        </p>
                    </div>
                </div>
            </section>

            {/* FILOSOFIA */}
            <section className="grid gap-12 bg-[#12372B] px-6 py-24 text-[#F5EBDD] md:grid-cols-2 md:px-16">
                <div>
                    <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#E8C78F]">
                        O que é Hygge?
                    </p>

                    <h3 className="text-4xl leading-tight md:text-5xl">
                        O prazer das coisas simples.
                    </h3>
                </div>

                <div className="space-y-6 text-lg leading-9 text-[#E9DDCC]">
                    <p>
                        O Hygge é uma filosofia da Dinamarca que representa o prazer das
                        coisas simples: um ambiente acolhedor, conversas sinceras,
                        silêncio tranquilo, luz baixa, chuva na janela, café quente e a
                        sensação de estar em paz no momento presente.
                    </p>

                    <p className="text-2xl italic text-[#E8C78F]">
                        “Mais do que conforto, Hygge é sentir que a vida, mesmo simples,
                        já pode ser bonita.”
                    </p>
                </div>
            </section>

            {/* GALERIA */}
            <section className="px-6 py-24 md:px-16">
                <div className="mb-14 flex items-end justify-between gap-6">
                    <div>
                        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#9C6B3E]">
                            A pousada
                        </p>

                        <h3 className="text-4xl md:text-5xl">
                            Natureza, exclusividade e aconchego.
                        </h3>
                    </div>

                    <p className="hidden max-w-xl text-lg leading-8 text-[#5B544C] md:block">
                        São 10 quartos super confortáveis em um ambiente totalmente
                        exclusivo e diferenciado, localizado no alto de uma serra com uma
                        vista inesquecível.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="overflow-hidden rounded-[2rem] shadow-2xl md:col-span-2">
                        <img
                            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                            alt="Pousada"
                            className="h-full w-full object-cover transition duration-700 hover:scale-105"
                        />
                    </div>

                    <div className="grid gap-6">
                        <div className="overflow-hidden rounded-[2rem] shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                                alt="Quarto"
                                className="h-full w-full object-cover transition duration-700 hover:scale-105"
                            />
                        </div>

                        <div className="rounded-[2rem] bg-[#E8D8C0] p-8 shadow-xl">
                            <p className="text-sm uppercase tracking-[0.35em] text-[#9C6B3E]">
                                Experiência
                            </p>

                            <h4 className="mt-4 text-3xl leading-tight">
                                O lugar perfeito para desacelerar e respirar.
                            </h4>

                            <p className="mt-6 text-lg leading-8 text-[#5B544C]">
                                Frio aconchegante, silêncio acolhedor, redes na varanda,
                                natureza ao redor e uma atmosfera pensada para reconectar você
                                ao momento presente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NUBLÀ */}
            <section className="grid gap-0 bg-[#1C1A18] text-[#F5EBDD] md:grid-cols-2">
                <div className="flex flex-col justify-center px-6 py-20 md:px-16">
                    <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#DFA34F]">
                        Nublà Ristorante
                    </p>

                    <h3 className="text-4xl leading-tight md:text-5xl">
                        A experiência também acontece à mesa.
                    </h3>

                    <p className="mt-8 text-lg leading-8 text-[#D8CEC0]">
                        Aqui, o café da manhã já está incluso na diária. Além disso,
                        almoço e jantar são servidos no Nublà, em um ambiente elegante,
                        acolhedor e cheio de personalidade.
                    </p>

                    <div className="mt-10 space-y-5 text-lg">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFA34F] text-black">
                                ☕
                            </div>
                            <span>Café da manhã incluso na diária</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFA34F] text-black">
                                🍽️
                            </div>
                            <span>Almoço e jantar com sabores especiais</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFA34F] text-black">
                                ✨
                            </div>
                            <span>Experiência intimista e acolhedora</span>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-125">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop"
                        alt="Restaurante"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/35" />
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#EADCC8] px-6 py-24 text-center md:px-16">
                <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#9C6B3E]">
                    Faça sua reserva
                </p>

                <h3 className="mx-auto max-w-4xl text-4xl leading-tight md:text-6xl">
                    Um lugar para viver o silêncio, o frio da serra e o conforto das
                    coisas simples.
                </h3>

                <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
                    <a
                        href="https://wa.me/5582993711135"
                        className="rounded-full bg-[#12372B] px-10 py-5 text-lg text-[#F5EBDD] shadow-xl transition hover:scale-105"
                    >
                        (82) 9-9371-1135
                    </a>

                    <button className="rounded-full border border-[#12372B] px-10 py-5 text-lg transition hover:bg-[#12372B] hover:text-[#F5EBDD]">
                        Conhecer a pousada
                    </button>
                </div>
            </section>
        </div>
    );
}