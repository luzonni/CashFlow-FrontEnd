import CashShower from "@components/CashShower";
import { useCashflow } from "@components/hooks/useCashflow";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { ColorSwatch, Description, Label } from "@heroui/react";
import { equalPeriod } from "@models/LocalDate";
import { formatDate } from "@utils/DateUtils";
import { useEffect, useState } from "react";

type UpcomingItem = {
    id: string;
    description: string;
    amount: number;
    type: string;
    progress: number;
    date: string;
    color: string;
}


export default function UpcomingReleasesContainer() {
    const { user } = useUser();
    const { recurrence, transaction, period } = useCashflow();
    const [list, setList] = useState<UpcomingItem[]>([]);
    //Aqui existe duas
    function fetchList() {
        const listRec: UpcomingItem[] = recurrence.values.flatMap((rec) => {
            const r = rec.records.find((r) =>
                equalPeriod(r.scheduledTo, period) && new Date(r.scheduledTo).getTime() >= Date.now()
            );

            if (!r) return [];

            return [{
                id: "rec:"+rec.id,
                description: rec.description,
                amount: r.amount,
                type: String(rec.frequency).toLowerCase(),
                progress: rec.releases,
                date: r.scheduledTo,
                color: rec.category.color
            }];
        });

        const listTrans: UpcomingItem[] = transaction.values.flatMap((tr) => {
            if (tr.state === "PENDING" && equalPeriod(tr.date, period)) {
                return [{
                    id: "tr:"+tr.id,
                    description: tr.description,
                    amount: tr.amount,
                    type: "pending transfer",
                    progress: 1,
                    date: tr.date,
                    color: tr.category.color
                }]
            }
            return [];
        });

        setList([...listRec, ...listTrans].sort((a, b) =>
            a.date.localeCompare(b.date)
        ));
    }

    useEffect(() => {
        fetchList();
    }, [period]);

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2">
                    <Icon name="Clock" />
                    <Label>Upcoming releases</Label>
                </div>
                <Description>Installments and Recurrences</Description>
            </div>
            <div className="w-full flex flex-col gap-2 p-3">
                {
                    list.map((i) => (
                        <div key={i.id} className="flex flex-row justify-between p-2">
                            <div className="flex flex-row gap-2">
                                <ColorSwatch color={i.color} shape="square" className="w-2 h-full" />
                                <div className="flex flex-col gap-1">
                                    <h1>{i.description}</h1>
                                    <Description>{i.type}</Description>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <CashShower value={i.amount} className="text-foreground" />
                                <Description>{formatDate(i.date, user.settings.locale)}</Description>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}