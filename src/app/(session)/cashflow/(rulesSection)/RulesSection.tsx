"use client";

import { Icon } from "@components/Icon"
import { Button, Chip, Table } from "@heroui/react"
import PaymentRule from "@models/PaymentRule"
import RuleType from "@models/RuleType"
import apiAction from "@services/ApiAction"
import ErrorHandler from "@services/ErrorHandler"
import RuleService from "@services/RuleService"
import { ApiError } from "next/dist/server/api-utils"
import { useEffect, useState } from "react"
import RuleModal from "./RuleModal";



export default function RulesSection() {
    const [rules, setRules] = useState<PaymentRule[]>([]);

    function fetchRules() {
        apiAction(async () => {
            const list: PaymentRule[] = await RuleService.list();
            setRules(list);
        }, "")
    }

    function handlerCreateRule(parent: "category" | "paymentMethod", categoryId: number, paymentMethodId: number, type: RuleType, config: string) {
        apiAction(async () => {
            let rule: PaymentRule;
            if (parent === "category") {
                rule = await RuleService.create.byCategory(categoryId, type, config);
            } else if (parent == "paymentMethod") {
                rule = await RuleService.create.byPaymentMethid(paymentMethodId, type, config);
            }

        }, "Error while create this rule")
    }

    useEffect(() => {
        fetchRules();
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <div className="bg-surface-secondary p-2 rounded-2xl flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                    <Icon name="FileCog" />
                    <h1>Rules</h1>
                </div>
                <RuleModal>
                    <Button>
                        <Icon name="Plus" />
                        New Rule
                    </Button>
                </RuleModal>
            </div>
            <Table >
                <Table.ScrollContainer>
                    <Table.Content aria-label="Example table">
                        <Table.Header>
                            <Table.Column isRowHeader>Association</Table.Column>
                            <Table.Column>Code</Table.Column>
                            <Table.Column>Rule</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                rules.map((r) => (
                                    <Table.Row>
                                        <Table.Cell>Consumo (Restaurante)</Table.Cell>
                                        <Table.Cell><Chip>FIXED RATE</Chip></Table.Cell>
                                        <Table.Cell><Button isIconOnly variant="secondary"><Icon name="Eye" /></Button></Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    )
}