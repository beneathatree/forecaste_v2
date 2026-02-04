import "./globals.css";
import { Metadata, Viewport } from "next";
import React, { Suspense } from "react";
import { Special_Elite } from "next/font/google";

const primaryFont = Special_Elite({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "forecaste",
    description: "Your app description",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${primaryFont.className}`}>{children}</body>
        </html>
    );
}
