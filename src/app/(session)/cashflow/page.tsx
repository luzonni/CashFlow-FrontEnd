import CategorySection from "./(categorySection)/CategorySection";
import { Tabs } from "@heroui/react";
import TransactionSection from "./(transactionSection)/TransactionSection";
import PaymentMethodSection from "./(paymentMethodSection)/PaymentMethodSection";
import RecurrencesSection from "./(recurrencesSection)/RecurrencesSection";
import { CashflowProvider } from "@components/providers/CashflowProvider";

export default function Page() {
    return (
        <CashflowProvider>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 items-start">
                <div className="w-full flex flex-row justify-center p-4 bg-surface rounded-2xl">
                    <Tabs className="w-full">
                        <Tabs.ListContainer>
                            <Tabs.List aria-label="Pages">
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
                        <Tabs.Panel className="pt-4 h-120" id="categories">
                            <CategorySection />
                        </Tabs.Panel>
                        <Tabs.Panel className="pt-4 h-120" id="payment_methods">
                            <PaymentMethodSection />
                        </Tabs.Panel>
                        <Tabs.Panel className="pt-4 h-120" id="recurrences">
                            <RecurrencesSection />
                        </Tabs.Panel>
                    </Tabs>
                </div>
                <div className="col-start-1 lg:row-start-2 bg-surface rounded-2xl p-4">
                    ...
                </div>
                <div className="flex flex-col items-center lg:col-span-2 lg:row-span-2 lg:col-start-2 row-start-1 bg-surface rounded-2xl p-4 gap-4">
                    <TransactionSection />
                </div>
            </div>
        </CashflowProvider>
    )
}