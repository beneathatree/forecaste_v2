import "./globals.css";
import { Metadata, Viewport } from "next";
import BasicButton from "./components/functions/basicButton";

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
            className="font-sans text-blue-500">
            forecaste
          </h1>
          <div 
          id="game-container" 
          className="w-full h-[650px] flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
        <BasicButton href="/" id="reset-btn" text="Reset Game" className="hover:bg-red-500"/>
      </body>
    </html>
  );
}