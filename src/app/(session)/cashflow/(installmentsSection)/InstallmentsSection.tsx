import { Icon } from "@components/Icon"
import { Button, Tabs } from "@heroui/react"
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
                <Tabs className="w-full" variant="secondary">
                    <Tabs.ListContainer>
                        <Tabs.List aria-label="Options">
                            <Tabs.Tab id="inProgress">
                                In Progress
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="finalized">
                                Finalized
                                <Tabs.Indicator />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs.ListContainer>
                    <Tabs.Panel id="inProgress">
                        <InstallmentsTable completed={false} />
                    </Tabs.Panel>
                    <Tabs.Panel id="finalized">
                        <InstallmentsTable completed={true} />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}