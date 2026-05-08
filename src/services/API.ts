
const PATH = "http://localhost:8080";

export const API = {
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
        byId: (id: number) => `${PATH}/transaction/${id}`
    }
} as const;