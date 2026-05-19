"use client";

import SectionCategory from "./(categorySection)/SectionCategory";
import { Skeleton, Tabs } from "@heroui/react";
import TransactionSection from "./(transactionSection)/TransactionSection";
import PaymentMethodSection from "./(paymentMethodSection)/PaymentMethodSection";
import { useEffect, useState } from "react";
import PaymentMethod from "@models/PaymentMethod";
import GroupCategory from "@models/GroupCategory";
import RulesSection from "./(rulesSection)/RulesSection";
import CategoryService from "@services/CategoryService";
import PaymentMethodService from "@services/PaymentMethodService";
import apiAction from "@services/ApiAction";

type StateContainer = {
    loading: boolean;
    groupsCategory: GroupCategory[];
    paymentMethods: PaymentMethod[];
}

export default function Page() {
    const [state, setState] = useState<StateContainer>({
        loading: true,
        groupsCategory: [],
        paymentMethods: []
    });

    useEffect(() => {
        async function load() {
            apiAction(async () => {
                const groupsCategoryList: GroupCategory[] = await CategoryService.list.group();
                const pmList: PaymentMethod[] = await PaymentMethodService.list();

                setState({
                    loading: false,
                    groupsCategory: groupsCategoryList,
                    paymentMethods: pmList
                })
            }, "Something was wrong while fetch data");
        }
        load();
    }, []);

    if (state.loading) {
        return (
            <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div ><Skeleton className="w-full h-50" /></div>
                <div className="col-start-1 row-start-2"><Skeleton className="w-full h-50" /></div>
                <div className="col-span-2 row-span-2 col-start-2 row-start-1"><Skeleton className="w-full h-102" /></div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-start">
            <div className="w-full flex flex-row justify-center p-4 bg-surface rounded-2xl">
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
                        <SectionCategory
                            groups={state.groupsCategory}
                            setGroups={(group: GroupCategory[]) => {
                                setState({
                                    ...state,
                                    groupsCategory: group
                                })
                            }}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel className="pt-4" id="payment_methods">
                        <PaymentMethodSection
                            paymentMethods={state.paymentMethods}
                            setPaymentMethods={(pm: PaymentMethod[]) => {
                                setState({
                                    ...state,
                                    paymentMethods: pm
                                })
                            }}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel className="pt-4" id="recurrences">
                        <p>Controle de recorrências.</p>
                    </Tabs.Panel>
                </Tabs>
            </div>
            <div className="col-start-1 lg:row-start-2 bg-surface rounded-2xl p-4">
                <RulesSection />
            </div>
            <div className="flex flex-col items-center lg:col-span-2 lg:row-span-2 lg:col-start-2 row-start-1 bg-surface rounded-2xl p-4 gap-4">
                <TransactionSection
                    groupsCategory={state.groupsCategory}
                    paymentMethods={state.paymentMethods}
                />
            </div>
        </div>
    )
}