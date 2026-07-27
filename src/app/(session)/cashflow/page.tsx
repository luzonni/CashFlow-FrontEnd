import CategorySection from "./(categorySection)/CategorySection";
import { Tabs } from "@heroui/react";
import TransactionSection from "./(transactionSection)/TransactionSection";
import PaymentMethodSection from "./(paymentMethodSection)/PaymentMethodSection";
import RecurrencesSection from "./(recurrencesSection)/RecurrencesSection";
import ResumeSection from "./(resume)/ResumeSection";
import InstallmentsSection from "./(installmentsSection)/InstallmentsSection";

export default function Page() {
    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <div className="w-full lg:w-200 bg-surface rounded-2xl p-4">
                <Tabs>
                    <Tabs.ListContainer>
                        <Tabs.List aria-label="Pages">
                            <Tabs.Tab id="resume">
                                Resume
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="categories">
                                Sets
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="recurrences">
                                Recurrences
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="installments">
                                Installments
                                <Tabs.Indicator />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs.ListContainer>
                    <Tabs.Panel className="pt-4 h-120" id="resume">
                        <ResumeSection />
                    </Tabs.Panel>
                    <Tabs.Panel className="flex flex-row" id="categories">
                        <Tabs className="w-full" variant="secondary">
                            <Tabs.ListContainer>
                                <Tabs.List aria-label="Options">
                                    <Tabs.Tab id="cat">
                                        Category
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                    <Tabs.Tab id="pm">
                                        Payment Method
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Tabs.ListContainer>
                            <Tabs.Panel className="pt-4" id="cat">
                                <CategorySection />
                            </Tabs.Panel>
                            <Tabs.Panel className="pt-4" id="pm">
                                <PaymentMethodSection />
                            </Tabs.Panel>
                        </Tabs>
                    </Tabs.Panel>
                    <Tabs.Panel className="pt-4 h-120" id="recurrences">
                        <RecurrencesSection />
                    </Tabs.Panel>
                    <Tabs.Panel className="pt-4 h-120" id="installments">
                        <InstallmentsSection />
                    </Tabs.Panel>
                </Tabs>
            </div>
            <div className="w-full bg-surface rounded-2xl p-4 gap-4">
                <TransactionSection />
            </div>
        </div>
    )
}