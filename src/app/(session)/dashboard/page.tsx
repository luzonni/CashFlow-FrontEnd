"use client";

import { useEffect, useState } from "react";
import CalendarSection from "./(calendarSection)/CalendarSection";
import SectionCategory from "./(categorySection)/SectionCategory";
import DateRange from "@models/DateRange";
import {
    DateValue,
    getLocalTimeZone,
    today,
} from "@internationalized/date";
import { Tabs } from "@heroui/react";
import TransactionSection from "./(transactionSection)/TransactionSection";
import PaymentMethodSection from "./(paymentMethodSection)/PaymentMethodSection";

export default function Page() {
    const [data, setData] = useState<DateRange | undefined>();

    function dataPattern(data: DateValue): string {
        const date = data.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone);
        return new Intl.DateTimeFormat(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    }

    useEffect(() => {
        const currentDate = today(getLocalTimeZone());
        setData({
            start: currentDate,
            end: currentDate
        });
    }, []);

    return (
        <div className="grid grid-cols-3 gap-2 items-start">
            <div className="w-full flex flex-row justify-center p-4 bg-white rounded-2xl">
                <CalendarSection value={data} setValue={setData} />
            </div>
            <div className="col-start-1 row-start-2 bg-white rounded-2xl p-4">
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
            <div className="flex flex-col items-center col-span-2 row-span-2 col-start-2 row-start-1 bg-white rounded-2xl p-4">
                <div className="flex flex-row bg-accent py-3 px-4 rounded-2xl shadow-xl">
                    <h1 className="text-center text-white font-bold">
                        {
                            data ?
                                (data.start.toString() === data.end.toString() ?
                                    dataPattern(data.start) :
                                    `${dataPattern(data.start)} -> ${dataPattern(data.end)}`)
                                :
                                "(None)"
                        }
                    </h1>
                </div>
                <TransactionSection />
            </div>
        </div>
    )
}