"use client";

import { useCashflow } from "@components/hooks/useCashflow";
import { useUser } from "@components/hooks/useUser";
import { ProgressBar, Table } from "@heroui/react";
import { currencyFormat } from "@utils/Currency";
import RecurrenceDisplay from "./RecurrenceDisplay";

export default function RecurrencesTable() {
    const { recurrences } = useCashflow();
    const { user } = useUser();

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
                            recurrences.map((recurrence) => (
                                <Table.Row key={recurrence.id}>
                                    <Table.Cell>{recurrence.name}</Table.Cell>
                                    <Table.Cell>
                                        <ProgressBar value={(recurrence.occurrencesProduced/recurrence.maxOccurrences)*100}>
                                            <ProgressBar.Output />
                                            <ProgressBar.Track>
                                                <ProgressBar.Fill />
                                            </ProgressBar.Track>
                                        </ProgressBar>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            currencyFormat(recurrence.currency, recurrence.amount, user.settings.locale)
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <RecurrenceDisplay {...{recurrence}} />
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