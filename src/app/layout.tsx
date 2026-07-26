import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Chip, Toast } from "@heroui/react";
import { ConfirmActionProvider } from "@components/providers/ConfirmActionProvider";
import { AppThemeProvider } from "@components/providers/AppThemeProvider";
import Refresher from "@components/BackRefresher";
import { SpeedInsights } from "@vercel/speed-insights/next"
import ReactScan from "@components/ReactScan";
import { Icon } from "@components/Icon";

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const fraunces = Fraunces({
    variable: "--font-fraunces-sans",
    subsets: ["latin"],
    display: 'swap',
});

const ibm = IBM_Plex_Mono({
    variable: "--font-IBMPlexMono",
    subsets: ["latin"],
    display: "swap",
    weight: "100"
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CashFlow",
    description: "Created by @Luzonni",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const originalWarn = console.warn;
    console.warn = (...args) => {
        if (args[0]?.includes?.('aria-label')) {
            console.trace('Aria warning trace:', ...args);
        }
        originalWarn(...args);
    };
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${fraunces.variable} ${ibm.variable} h-full antialiased scroll-smooth`}
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <body className={`${inter.className} min-h-screen h-full flex flex-col`}>
                {/* <div className="fixed z-100 p-4 bottom-0 right-0 animate-pulse-opacity">
                    <Chip color="warning">
                        <Icon name="TriangleAlert" size={12} />
                        <Chip.Label>Beta</Chip.Label>
                    </Chip>
                </div> */}
                <AppThemeProvider>
                    <Toast.Provider />
                    <ConfirmActionProvider>
                        <Refresher>
                            {children}
                        </Refresher>
                    </ConfirmActionProvider>
                </AppThemeProvider>
            </body>
            <SpeedInsights />
        </html >
    );
}
