import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/conponents/QueryProvider/QueryProvider";
import "./globals.scss";
import Header from "@/conponents/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS as Full-Stack",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header />

          <main className="container mx-auto py-8">
            <QueryProvider>{children}</QueryProvider>
          </main>

          <footer></footer>
      </body>
    </html>
  );
}
