"use client";

import { Separator } from "@heroui/react"
import Sectioner from "@components/Sectioner"
import Banner from "@components/Banner";
import SourcesSection from "./(sections)/SourceSection";
import HowItWorks from "./(sections)/HowItWorkSection";
import ApresentactionSection from "./(sections)/ApresentationSection";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
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
                    bg="primary"
                    label="Cirar minha conta grátis."
                    description="Crie agora sua conta e melhore sua organização financeira!"
                    action={() => { router.push("/register") }}
                />
            </Sectioner>
        </Sectioner>
    )
}




