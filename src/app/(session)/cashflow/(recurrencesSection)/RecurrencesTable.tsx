"use client";

import { Icon } from "@components/Icon";
import { Button, Chip, Label, ProgressBar, Table } from "@heroui/react";

export default function RecurrencesTable() {
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
                        <Table.Row>
                            <Table.Cell>Parcela Carro</Table.Cell>
                            <Table.Cell>
                                <ProgressBar value={11}>
                                    <ProgressBar.Output />
                                    <ProgressBar.Track>
                                        <ProgressBar.Fill />
                                    </ProgressBar.Track>
                                </ProgressBar>
                            </Table.Cell>
                            <Table.Cell>R$ 478,82</Table.Cell>
                            <Table.Cell>
                                <Button isIconOnly variant="secondary">
                                    <Icon name="Eye" />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                         <Table.Row>
                            <Table.Cell>Netflix</Table.Cell>
                            <Table.Cell>
                                <Chip>
                                    Fixed
                                </Chip>
                            </Table.Cell>
                            <Table.Cell>R$ 19,90</Table.Cell>
                            <Table.Cell>
                                <Button isIconOnly variant="secondary">
                                    <Icon name="Eye" />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    )
}