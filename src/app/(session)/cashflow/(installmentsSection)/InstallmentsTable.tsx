"use client";

import CashShower from "@components/CashShower";
import { useCashflow } from "@components/hooks/useCashflow";
import { Icon } from "@components/Icon";
import { Button, ProgressBar, Table } from "@heroui/react";
import apiAction from "@services/ApiAction";
import InstallmentService from "@services/InstallmentService";
import { useEffect } from "react";
import InstallmentDisplayModal from "./InstallmentDisplayModal";
import TrComponent from "@components/TrComponent";

const coluns = [
    "Category",
    "Percent",
    "Actions"
]

export default function InstallmentsTable({ completed }: { completed: boolean }) {
    const { installments } = useCashflow();

    useEffect(() => {
        const mockId = 1;
        apiAction(async () => {
            const res: Map<number, boolean> = await InstallmentService.percent(mockId);
            console.log(res);
        }, "Error while get percent")
    }, []);

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Team members">
                    <Table.Header>
                        {
                            coluns.map((c) => (
                                <Table.Column key={c} isRowHeader={c === coluns[0]}>{c}</Table.Column>
                            ))
                        }
                    </Table.Header>
                    <Table.Body>
                        {
                            installments.filter((i) => i.concluded === completed).map((i) => (
                                <Table.Row key={i.id}>
                                    <Table.Cell>
                                        <TrComponent.Category category={i.category} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            completed ? (
                                                <div className="flex flex-row p-2 rounded-full bg-success-soft w-fit">
                                                    <Icon name="Check"/>
                                                </div>
                                            ) : (
                                                <ProgressBar aria-label="Loading" value={i.conclusions / i.installments * 100}>
                                                    <ProgressBar.Output />
                                                    <ProgressBar.Track>
                                                        <ProgressBar.Fill />
                                                    </ProgressBar.Track>
                                                </ProgressBar>
                                            )
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <InstallmentDisplayModal installment={i}>
                                            <Button isIconOnly variant="secondary">
                                                <Icon name="Eye" />
                                            </Button>
                                        </InstallmentDisplayModal>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table >
    )
}