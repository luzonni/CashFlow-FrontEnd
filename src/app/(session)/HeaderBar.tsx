"use client";

import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import ModalSearch from "@components/modals/ModalSearch";
import MonthPicker from "@components/MonthPicker";
import { Button, toast } from "@heroui/react";
import apiAction from "@services/ApiAction";
import { useEffect, useState } from "react";
import { Label } from "react-aria-components";
import CashShower from "@components/CashShower";
import MonthPeriod from "@models/MonthPeriod";
import { BalanceItem } from "@models/Balance";
import CashierService from "@services/CashierService";
import { currencyFormat } from "@utils/Currency";

type HeaderBarProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    period: MonthPeriod;
    setPeriod: (value: MonthPeriod) => void;
}

export default function HeaderBar({ open, setOpen, period, setPeriod }: HeaderBarProps) {
    const { user } = useUser();
    const [amount, setAmount] = useState<BalanceItem>({ amount: 0, count: 0 });

    async function getBalance() {
        apiAction(async () => {
            const balance: BalanceItem = await CashierService.balance();
            setAmount(balance);
        }, "Error while get amount of user.");
    }

    useEffect(() => {
        getBalance();
    }, [user.settings.currency, period]);

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
                <div className="hidden sm:flex flex-row gap-2 ">
                    <CashShower value={amount.amount} negative={amount.amount < 0} className="font-bold text-2xl" />
                    <Button
                        size="sm"
                        isIconOnly
                        variant="secondary"
                        onPress={() => {
                            toast.promise(CashierService.balance(), {
                                error: "Failed to fetch amount",
                                loading: "Loading...",
                                success: (data) => `All Done! ${currencyFormat(user.settings.currency, data.amount, user.settings.locale, data.amount < 0)}`,
                            });
                        }}
                    >
                        <Icon name="RefreshCw" />
                        </Button>
                </div>
            </div>
            {/* Rigth */}
            <div className="flex flex-row gap-4 items-center">
                <MonthPicker value={period} setValue={setPeriod} />
            </div>
        </div >
    )
}