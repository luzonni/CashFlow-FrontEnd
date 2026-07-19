"use client";

import { Icon } from "@components/Icon";
import {
    Button,
    Chip,
    ColorSwatch,
    Dropdown,
    EmptyState,
    Pagination,
    Table
} from "@heroui/react";
import Transaction from "@models/Transaction";
import { copyToClipboard } from "@utils/Copy";
import { formatDate } from "@utils/DateUtils";
import { useMemo, useState } from "react";
import TransactionDisplayModal from "./TransactionDisplayModal";
import { TransactionRequest } from "@services/TransactionService";
import { useUser } from "@components/hooks/useUser";
import CashShow from "@components/CashShow";

type TransactionTableProps = {
    transactions: Transaction[];
    updateTransaction: (
        id: string,
        request: TransactionRequest
    ) => void;
};

const columns = [
    { id: "id", name: "ID" },
    { id: "category", name: "Category" },
    { id: "payMethod", name: "Payment Method" },
    { id: "date", name: "Date" },
    { id: "state", name: "State" },
    { id: "value", name: "Value" },
    { id: "display", name: "Display" }
];

const columns_mobile = [
    { id: "date", name: "Date" },
    { id: "value", name: "Value" },
    { id: "display", name: "Display" }
];

const MAX_ITEMS = 10;

export default function TransactionTable({
    transactions,
    updateTransaction
}: TransactionTableProps) {
    const { user } = useUser();
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(transactions.length / MAX_ITEMS);
    const rows = useMemo(() => {
        const start = (page - 1) * MAX_ITEMS;
        const end = start + MAX_ITEMS;
        return transactions.slice(start, end);
    }, [transactions, page]);

    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (page > 3) {
                pages.push("ellipsis");
            }
            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (page < totalPages - 2) {
                pages.push("ellipsis");
            }
            pages.push(totalPages);
        }
        return pages;
    };

    const startItem = (page - 1) * MAX_ITEMS + 1;

    const endItem = Math.min(
        page * MAX_ITEMS,
        transactions.length
    );

    return (
        <Table>
            <Table.ScrollContainer>
                {/* Desktop */}
                <div className="hidden xl:flex">
                    <Table.Content aria-label="Transactions table">
                        <Table.Header columns={columns}>
                            {(column) => (
                                <Table.Column isRowHeader={column.id === "id"}>
                                    {column.name}
                                </Table.Column>
                            )}
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={() => (
                                <EmptyState className="flex h-50 w-full flex-col items-center justify-center gap-2 text-center">
                                    <Icon name="Inbox" />
                                    <span className="text-sm text-muted">No results found</span>
                                </EmptyState>
                            )}
                        >
                            {rows.map((transaction) => (
                                <Table.Row key={transaction.id}>
                                    <Table.Cell>
                                        <Dropdown>
                                            <Button aria-label="Menu" variant="secondary" isIconOnly>
                                                <Icon name="IdCard" />
                                            </Button>
                                            <Dropdown.Popover>
                                                <Dropdown.Menu onAction={(key) => {
                                                    switch (key) {
                                                        case "copy": {
                                                            copyToClipboard(transaction.id.toString())
                                                        }
                                                    }
                                                }}>
                                                    <Dropdown.Item id="copy" textValue="Copy ID">
                                                        Copy ID <Icon name="Copy" />
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown.Popover>
                                        </Dropdown>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <ColorSwatch
                                                className="w-2"
                                                shape="square"
                                                color={transaction.category.color}
                                            />
                                            {transaction.category.name}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <ColorSwatch
                                                className="w-2"
                                                shape="square"
                                                color={transaction.paymentMethod.color}
                                            />
                                            {transaction.paymentMethod.name}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {formatDate(
                                            transaction.date,
                                            user.settings.locale
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {transaction.state === "CONFIRM" ? (
                                            <Chip color="success" variant="soft">
                                                Confirm
                                            </Chip>
                                        ) : transaction.state === "CANCELLED" ? (
                                            <Chip color="danger" variant="soft">
                                                Cancelled
                                            </Chip>
                                        ) : (
                                            <Chip color="warning" variant="soft">
                                                Pending
                                            </Chip>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div>
                                            <CashShow type={transaction.type} value={transaction.amount} />
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <TransactionDisplayModal
                                            transaction={transaction}
                                            updateTransaction={updateTransaction}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </div>
                {/* Mobile */}
                <div className="xl:hidden">
                    <Table.Content >
                        <Table.Header columns={columns_mobile}>
                            {(column) => (
                                <Table.Column isRowHeader={column.id === "date"}>
                                    {column.name}
                                </Table.Column>
                            )}
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={() => (
                                <EmptyState className="flex h-50 w-full flex-col items-center justify-center gap-2 text-center">
                                    <Icon name="Inbox" />
                                    <span className="text-sm text-muted">No results found</span>
                                </EmptyState>
                            )}
                        >
                            {rows.map((transaction) => (
                                <Table.Row key={transaction.id}>
                                    <Table.Cell>
                                        {formatDate(
                                            transaction.date,
                                            user.settings.locale
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <CashShow type={transaction.type} value={transaction.amount} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <TransactionDisplayModal
                                            transaction={transaction}
                                            updateTransaction={updateTransaction}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </div>
            </Table.ScrollContainer>
            <Table.Footer>
                <Pagination>
                    <Pagination.Summary>
                        Showing {startItem}-{endItem} of {transactions.length} results
                    </Pagination.Summary>
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={page === 1}
                                onPress={() => setPage((p) => p - 1)}
                            >
                                <Pagination.PreviousIcon />
                                <span>Previous</span>
                            </Pagination.Previous>
                        </Pagination.Item>
                        {getPageNumbers().map((p, i) =>
                            p === "ellipsis" ? (
                                <Pagination.Item key={`ellipsis-${i}`}>
                                    <Pagination.Ellipsis />
                                </Pagination.Item>
                            ) : (
                                <Pagination.Item key={p}>
                                    <Pagination.Link
                                        isActive={p === page}
                                        onPress={() => setPage(p)}
                                    >
                                        {p}
                                    </Pagination.Link>
                                </Pagination.Item>
                            )
                        )}
                        <Pagination.Item>
                            <Pagination.Next
                                isDisabled={page >= totalPages}
                                onPress={() => setPage((p) => p + 1)}
                            >
                                <span>Next</span>
                                <Pagination.NextIcon />
                            </Pagination.Next>
                        </Pagination.Item>
                    </Pagination.Content>
                </Pagination>
            </Table.Footer>
        </Table>
    );
}