"use client";

import CashShower from "@components/CashShower";
import CategoryShower from "@components/CategoryShower";
import { useCashflow } from "@components/hooks/useCashflow";
import { Icon } from "@components/Icon";
import { Button, Label, ProgressBar, Table } from "@heroui/react";
import apiAction from "@services/ApiAction";
import InstallmentService from "@services/InstallmentService";
import { useEffect } from "react";
import InstallmentDisplayModal from "./InstallmentDisplayModal";

const coluns = [
    "Category",
    "Percent",
    "Amount",
    "Actions"
]


export default function InstallmentsTable() {
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
                            installments.map((i) => (
                                <Table.Row key={i.id}>
                                    <Table.Cell>
                                        <CategoryShower category={i.category} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ProgressBar aria-label="Loading" value={i.conclusions / i.installments * 100}>
                                            <ProgressBar.Output />
                                            <ProgressBar.Track>
                                                <ProgressBar.Fill />
                                            </ProgressBar.Track>
                                        </ProgressBar>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-row gap-1.5">
                                            <CashShower value={i.amount} className="text-foreground" />
                                            <span>in</span>
                                            <h1>{i.installments}x</h1>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <InstallmentDisplayModal>
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
        </Table>
    )
}