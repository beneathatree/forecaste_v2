import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'forecaste',
  description: 'Your app description',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div 
          id="app" 
          className="w-[400px] flex relative justify-center items-center flex-col bg-white border border-black">
          <h1 
            id="title"
            className="font-sans text-blue-500">forecaste
          </h1>
          <div id="game-container" className="w-full h-[650px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}