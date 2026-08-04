
const PATH = "/api";

export const API = {
    HI: () => `${PATH}/hi`,
    AUTH: {
        login: () => `${PATH}/auth/login`,
        register: () => `${PATH}/auth/register`,
        refresh: () => `${PATH}/auth/refresh`,
        me: () => `${PATH}/auth/me`,
        logout: () => `${PATH}/auth/logout`
    },
    GROUP_CATEGORY: {
        main: () => `${PATH}/category_group`,
        byId: (id: number) => `${PATH}/category_group/${id}`
    },
    CATEGORY: {
        main: () => `${PATH}/category`,
        byId: (id: number) => `${PATH}/category/${id}`
    },
    PAYMENT_METHOD: {
        main: () => `${PATH}/payment_method`,
        byId: (id: number) => `${PATH}/payment_method/${id}`
    },
    TRANSACTION: {
        main: () => `${PATH}/transaction`,
        between: (start: string, end: string) => `${PATH}/transaction/between?start=${start}&end=${end}`,
        filter: (start: string, end: string, category?: number, payment_method?: number) => 
            `${PATH}/transaction/between?start=${start}&end=${end}&category=${category}&payment_method=${payment_method}`,
        byId: (id: string) => `${PATH}/transaction/${id}`
    },
    USER: {
        SETTINGS: {
            main: () => `${PATH}/user/settings`
        },
        main: () => `${PATH}/user`,
        amount: () => `${PATH}/user/amount`
    },
    RECURRENCE: {
        main: () => `${PATH}/recurrences`,
        byId: (id: string) => `${PATH}/recurrences/${id}`
    },
    MAIL: {
        main: () => `${PATH}/mail`,
    },
    EXCHANGE: {
        currency: () => `${PATH}/exchange/currency`
    },
    INSTALLMENT: {
        main: () => `${PATH}/installment`,
        percent: (id: number) => `${PATH}/installment/percent/${id}`
    },
    CASHIER: {
        balance: () => `${PATH}/cashier/balance`,
        confirmList: (start: string, end: string) => `${PATH}/cashier/balances/confirm?start=${start}&end=${end}`,
        pendingList: (start: string, end: string) => `${PATH}/cashier/balances/pending?start=${start}&end=${end}`,
        byCategory: (period: string) => `${PATH}/cashier/balances/by/category?period=${period}`
    }
} as const;