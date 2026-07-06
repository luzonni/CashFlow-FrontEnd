
const PATH = "https://cashflow-service.onrender.com"; ////http://localhost:8080

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
        fing: (id: string) => `${PATH}/transaction/${id}`,
        byId: (id: string) => `${PATH}/transaction/${id}`
    },
    USER: {
        SETTINGS: {
            main: () => `${PATH}/user/settings`
        },
        main: () => `${PATH}/user`
    },
    RECURRENCE: {
        main: () => `${PATH}/recurrences`,
        byId: (id: string) => `${PATH}/recurrences/${id}`
    },
    MAIL: {
        main: () => `${PATH}/mail`,
    }
} as const;