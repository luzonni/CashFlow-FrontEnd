"use client";

import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import ModalSearch from "@components/modals/ModalSearch";
import MonthPicker from "@components/MonthPicker";
import { Button } from "@heroui/react";
import Balance from "@models/Balance";
import DateRange from "@models/DateRange";
import apiAction from "@services/ApiAction";
import { useEffect, useState } from "react";
import { Label } from "react-aria-components";
import CashShower from "@components/CashShower";
import CashierService from "@services/CashierService";
import { useCashflow } from "@components/hooks/useCashflow";

type HeaderBarProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    dateRange: DateRange;
    setDateRange: (value: DateRange) => void;
}

export default function HeaderBar({ open, setOpen, dateRange, setDateRange }: HeaderBarProps) {
    const { user } = useUser();
    const [amount, setAmount] = useState<Balance>({amount: 0, currency: user.settings.currency});

    async function getBalance() {
        apiAction(async () => {
            const balance: Balance = await CashierService.balance(dateRange);
            setAmount(balance);
        }, "Error while get amount of user.")
    }

    useEffect(() => {
        getBalance();
    }, [user.settings.currency, dateRange])

    return (
        <div className="flex flex-row  items-center justify-between bg-surface rounded-xl p-2 px-4">
            {/* Left */}
            <div className="flex flex-row gap-2 items-center">
                <Button
                    onClick={() => setOpen(!open)}
                    variant="tertiary"
                    isIconOnly
                >
                    <Icon name="Menu" />
                </Button>
                <ModalSearch>
                    <div className="flex flex-row items-center gap-1 bg-surface-secondary rounded-full md:pr-4">
                        <Button isIconOnly aria-label="Search" variant="secondary">
                            <Icon name="Search" />
                        </Button>
                        <Label className="hidden md:flex">Search</Label>
                    </div>
                </ModalSearch>
            </div>
            {/* Middle */}
            <div className="flex flex-row gap-4 items-center">
                <div className="hidden sm:flex flex-row ">
                    <CashShower value={amount.amount} currency={amount.currency} negative={amount.amount < 0} className="font-bold text-2xl"/>
                </div>
            </div>
            {/* Rigth */}
            <div className="flex flex-row gap-4 items-center">
                <MonthPicker value={dateRange} setValue={setDateRange} />
            </div>
        </div>
    )
}