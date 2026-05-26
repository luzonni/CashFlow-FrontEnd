"use client";

import { useCashflow } from "@components/hooks/useCashflow";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Button, ProgressBar, Table } from "@heroui/react";
import { currencyFormat } from "@utils/Currency";

export default function RecurrencesTable() {
    const { recurrences } = useCashflow();
    const { user } = useUser();

    if(!user) {
        return;
    }

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Example table">
                    <Table.Header>
                        <Table.Column isRowHeader>Name</Table.Column>
                        <Table.Column>State</Table.Column>
                        <Table.Column>Amount</Table.Column>
                        <Table.Column>Acrion</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            recurrences.map((r) => (
                                <Table.Row key={r.id}>
                                    <Table.Cell>{r.name}</Table.Cell>
                                    <Table.Cell>
                                        <ProgressBar value={r.maxOccurrences}>
                                            <ProgressBar.Output />
                                            <ProgressBar.Track>
                                                <ProgressBar.Fill />
                                            </ProgressBar.Track>
                                        </ProgressBar>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            currencyFormat(r.currency, r.amount, user.settings.locale)
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button isIconOnly variant="secondary">
                                            <Icon name="Eye" />
                                        </Button>
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