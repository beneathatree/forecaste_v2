import "./globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>forecaste</title>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <body>
        <div 
          id="app" 
          className="w-[400px] flex relative justify-center items-center flex-col bg-white border border-black">
          <h1 
            id="title"
            className="font-sans text-blue-500">forecaste
          </h1>
          <div id="game-container">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
