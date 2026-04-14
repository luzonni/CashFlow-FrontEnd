
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
} as const;

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATH" | "HEAD" | "OPTIONS";

export const CALL = {
    GET: (address: string) => {
        return fetch(address, {
            method: "GET",
            credentials: "include"
        });
    },
    POST: (address: string, body?: BodyInit) => {
        return fetch(address, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: body
        })
    },
    PUT: (address: string, body?: BodyInit) => {
        return fetch(address, {
            method: "PUT",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: body
        })
    },
    DELETE: (address: string) => {
        return fetch(address, {
            method: "DELETE",
            credentials: "include"
        })
    }
}