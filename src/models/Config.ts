
type Settings = {
    locale: string;
    theme: string;
    currency: string;
}

export type CODE = "currency" | "theme" | "locale";

export const CONFIG_DEFINITIONS = {
    CURRENCY: {
        label: "Currency",
        values: [
            "BRL",
            "USD",
            "EUR",
            "GBP",
            "JPY"
        ]
    },
    LOCALE: {
        label: "Locale",
        values: [
            "pt-BR",
            "en-US",
            "es-ES",
            "fr-FR"
        ]
    },
    THEME: {
        label: "Theme",
        values: [
            "dark",
            "light",
            "system"
        ]
    }
} as const;

export default Settings;