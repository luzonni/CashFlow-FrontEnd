import { Icon } from "@components/Icon";
import { Button } from "@heroui/react";
import RecurrencesTable from "./RecurrencesTable";
import RecurrencesModal from "./RecurrencesModal";

export default function RecurrencesSection() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex bg-surface-secondary p-2 rounded-2xl flex-row justify-between gap-2 items-center">
                <div className="flex gap-2 items-center">
                    <Icon name="ChartColumn" />
                    <h1>Recurrences</h1>
                </div>
                <div>
                    <RecurrencesModal>
                        <Button>
                            <Icon name="Plus" />
                            New
                        </Button>
                    </RecurrencesModal>
                </div>
            </div>
            <div>
                <RecurrencesTable />
            </div>
        </div>
    )
}