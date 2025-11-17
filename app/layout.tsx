import "./globals.css";
import { Metadata, Viewport } from "next";
import BasicButton from "./components/functions/basicButton";
import AudioManager from "./components/functions/audioManager";
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
            <body className="flex flex-col h-screen w-screen gap-5 items-center justify-center">
                <div
                    id="app"
                    className="w-full h-full flex relative justify-center items-start flex-col bg-amber-100 border border-black"
                >
                    <h1
                        id="title"
                        className={`${primaryFont.className} text-lg text-blue-500 p-5 pb-0 mt-1 z-50`}
                    >
                        <strong>forecaste</strong>
                    </h1>
                    <div
                        id="game-container"
                        className={`${primaryFont.className} w-full h-[650px] flex flex-col items-center justify-center`}
                    >
                        <Suspense fallback={null}>{children}</Suspense>
                    </div>
                </div>
                {/* TODO: Add reset button and audio manager */}
                {/* <div className="flex gap-2">
                    <BasicButton
                        href="/"
                        id="reset-btn"
                        text="Reset Game"
                        className="hover:bg-red-500"
                    />
                    <Suspense fallback={null}>
                        <AudioManager />
                    </Suspense>
                </div> */}
            </body>
        </html>
    );
}
