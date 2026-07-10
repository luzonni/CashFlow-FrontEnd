"use client";

import { Separator } from "@heroui/react"
import Sectioner from "@components/Sectioner"
import Banner from "@components/Banner";
import SourcesSection from "./(sections)/SourceSection";
import HowItWorks from "./(sections)/HowItWorkSection";
import ApresentactionSection from "./(sections)/ApresentationSection";

export default function Home() {
    return (
        <Sectioner isLanding flex="col" gap="md">
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
        </Sectioner>
    )
}




