import Header from "./ui/layout/header";
import Footer from "./ui/layout/footer";
import { Merriweather } from "next/font/google";
import { ReactNode } from "react";
import Head from "next/head";
import "./globals.css";

const merri = Merriweather({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <html lang="en" className={merri.className}>
        <body className="overflow-hidden w-screen h-[100svh] flex flex-col">
          <Header />
          <main className="w-full h-full overflow-hidden">{children}</main>
          <Footer />
        </body>
      </html>
    </>
  );
}
