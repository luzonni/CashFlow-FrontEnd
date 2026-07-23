import { Icon } from "@components/Icon"
import { Button } from "@heroui/react"
import InstallmentsModal from "./InstallmentsModal"
import InstallmentsTable from "./InstallmentsTable"

export default function InstallmentsSection() {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full bg-surface-secondary p-2 rounded-2xl pl-4 flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-1">
                    <Icon name="CreditCard" />
                    <h1>Installments</h1>
                </div>
                <InstallmentsModal>
                    <Button>
                        <Icon name="Plus" />
                        New
                    </Button>
                </InstallmentsModal>
            </div>
            <div>
                <InstallmentsTable />
            </div>
        </div>
    )
}