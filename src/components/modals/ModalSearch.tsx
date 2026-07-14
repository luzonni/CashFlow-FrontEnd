"use client";

import CashShow from "@components/CashShow";
import { useUser } from "@components/hooks/useUser";
import { Icon } from "@components/Icon";
import { Button, Description, EmptyState, Label, Modal, SearchField, Separator, Skeleton } from "@heroui/react";
import Transaction from "@models/Transaction";
import apiAction from "@services/ApiAction";
import TransactionService from "@services/TransactionService";
import { formatDate } from "@utils/DateUtils";
import { ReactNode, useEffect, useState } from "react";

type ModalSearchProps = {
    id?: string;
    children: ReactNode;
}

export default function ModalSearch({ id, children }: ModalSearchProps) {
    const { user } = useUser();
    const [search, setSearch] = useState<string>(id ?? "");
    const [transaction, setTransaction] = useState<Transaction>();

    useEffect(() => {
        async function getClickBoard() {
            if (id) {
                return;
            }
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    setSearch(text);
                }
            } catch (err) { }
        }
        getClickBoard();
    }, []);

    async function getTransaction() {
        if (!search) {
            setTransaction(undefined);
            return;
        }
        apiAction(async () => {
            const tran: Transaction = await TransactionService.byId(search);
            setTransaction(tran);
        }, "Error while get transaction: " + search);
    }

    useEffect(() => {
        getTransaction();
    }, [search]);

    return (
        <Modal>
            {children}
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog className="flex flex-col gap-4">
                        <Modal.CloseTrigger />
                        <Modal.Header className="flex flex-col justify-between">
                            <Modal.Icon className="bg-default">
                                <Icon name="Search" />
                            </Modal.Icon>
                            <Modal.Heading className="flex flex-row items-center justify-center">
                                <div className="w-full flex flex-row items-center gap-2">
                                    <SearchField name="search" className="w-full" value={search} onChange={setSearch}>
                                        <Label>Search</Label>
                                        <SearchField.Group>
                                            <SearchField.SearchIcon />
                                            <SearchField.Input className="w-full" placeholder="Transaction ID" />
                                            <SearchField.ClearButton />
                                        </SearchField.Group>
                                    </SearchField>
                                </div>
                            </Modal.Heading>
                        </Modal.Header>
                        <Separator variant="secondary" />
                        <Modal.Body className="w-full">
                            {
                                transaction ? (
                                    <div className="w-full flex flex-col gap-2">
                                        <div className="w-full flex flex-row justify-center items-center">
                                            <CashShow type={transaction.type} value={transaction.amount} />
                                        </div>
                                        <Description>
                                            {transaction.description}
                                        </Description>
                                    </div>
                                ) : (
                                    <div className="w-full h-25 flex flex-row justify-center items-center">
                                        <EmptyState className="flex w-full flex-col items-center justify-center gap-2 text-center">
                                            <Icon name="Inbox" />
                                            <span className="text-sm text-muted">No results found</span>
                                        </EmptyState>
                                    </div>
                                )
                            }
                        </Modal.Body>
                        <Separator variant="secondary" />
                        <Modal.Footer className="w-full flex-col gap-4">
                            {
                                transaction ? (
                                    <div className="w-full flex flex-row justify-between">
                                        <div className="flex flex-row gap-2 items-baseline">
                                            <h1 className="text-sm">
                                                Released for:
                                            </h1>
                                            <Description>
                                                {formatDate(
                                                    transaction.date,
                                                    user.settings.locale
                                                )}
                                            </Description>
                                        </div>
                                        <div className="flex flex-row gap-2 items-baseline">
                                            <h1 className="text-sm">
                                                Created at:
                                            </h1>
                                            <Description>
                                                {formatDate(
                                                    transaction.createdAt,
                                                    user.settings.locale
                                                )}
                                            </Description>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full flex flex-row justify-between">
                                        <Skeleton className="w-26 h-6" />
                                        <Skeleton className="w-26 h-6" />
                                    </div>
                                )
                            }
                            <div className="w-full flex flex-row justify-end">
                                <Button variant="secondary" slot="close">Done</Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}