import "./globals.css";
import { Metadata, Viewport } from "next";
import BasicButton from "./components/functions/basicButton";
import AudioManager from "./components/functions/audioManager";
import React, { Suspense } from "react";
import { Special_Elite } from 'next/font/google'

const primaryFont = Special_Elite({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'forecaste',
  description: 'Your app description',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-5 items-center justify-center">
        <div 
          id="app" 
          className="w-[400px] flex relative justify-center items-center flex-col bg-white border border-black">
          <h1 
            id="title"
            className={`${primaryFont.className} font-sans text-blue-500 pt-4`}>
            forecaste
          </h1>
          <div 
          id="game-container" 
          className={`${primaryFont.className} w-full h-[650px] flex flex-col items-center justify-center`}>
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </div>
        </div>
        <div className="flex gap-2">
          <BasicButton href="/" id="reset-btn" text="Reset Game" className="hover:bg-red-500"/>
          <Suspense fallback={null}>
            <AudioManager />
          </Suspense>
        </div>
      </body>
    </html>
  );
}