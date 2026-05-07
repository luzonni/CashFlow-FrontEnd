import { ValidLucideIcons } from "@components/Icon";

export type Page = {
    pageKey: string;
    pageName: string;
    pageHref: string;
    pageIcon: ValidLucideIcons;
    category?: string;
    isDesabled?: boolean;
};

export type PagesMap = {
    [key: string]: Page;
};

export const pages: PagesMap = {
    dashboard: {
        pageKey: "dash",
        pageHref: "/dashboard",
        pageName: "Dashboard",
        pageIcon: "LayoutDashboard"
    },
    cashflow: {
        pageKey: "cashflow",
        pageHref: "/cashflow",
        pageName: "CashFlow",
        pageIcon: "BanknoteArrowUp"
    },
    profile: {
        pageKey: "prof",
        pageName: "Profile",
        pageIcon: "User",
        pageHref: "/profile",
    },
    report: {
        pageKey: "rep",
        pageName: "Reports",
        pageIcon: "Bug",
        pageHref: "/reports",
        isDesabled: true
    }
}