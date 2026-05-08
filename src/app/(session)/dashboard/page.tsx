"use client";

import SectionCategory from "./(categorySection)/SectionCategory";
import { Tabs } from "@heroui/react";
import TransactionSection from "./(transactionSection)/TransactionSection";
import PaymentMethodSection from "./(paymentMethodSection)/PaymentMethodSection";

export default function Page() {
    return (
        <div className="grid grid-cols-3 gap-2 items-start">
            <div className="w-full flex flex-row justify-center p-4 bg-white rounded-2xl">
                <Tabs className="w-full">
                    <Tabs.ListContainer>
                        <Tabs.List aria-label="Options">
                            <Tabs.Tab id="categories">
                                Categories
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="payment_methods">
                                Payment Methods
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="recurrences">
                                Recurrences
                                <Tabs.Indicator />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs.ListContainer>
                    <Tabs.Panel className="pt-4" id="categories">
                        <SectionCategory />
                    </Tabs.Panel>
                    <Tabs.Panel className="pt-4" id="payment_methods">
                        <PaymentMethodSection />
                    </Tabs.Panel>
                    <Tabs.Panel className="pt-4" id="recurrences">
                        <p>Controle de recorrências.</p>
                    </Tabs.Panel>
                </Tabs>
            </div>
            <div className="col-start-1 row-start-2 bg-white rounded-2xl p-4">
                okay
            </div>
            <div className="flex flex-col items-center col-span-2 row-span-2 col-start-2 row-start-1 bg-white rounded-2xl p-4 gap-4">
                <TransactionSection />
            </div>
        </div>
    )
}