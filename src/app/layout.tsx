import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./variables.css";
import { Toast } from "@heroui/react";
import { ConfirmActionProvider } from "@components/providers/ConfirmActionProvider";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

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
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <head>
                <Script
                    src="//unpkg.com/react-scan/dist/auto.global.js"
                    crossOrigin="anonymous"
                    strategy="beforeInteractive"
                />
            </head>
            <body className={`${inter.className} min-h-full flex flex-col`}>
                <ThemeProvider>
                    <Toast.Provider />
                    <ConfirmActionProvider>
                        {children}
                    </ConfirmActionProvider>
                </ThemeProvider>
            </body>
        </html >
    );
}
