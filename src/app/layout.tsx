import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";

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
          <header></header>

          <main className="container mx-auto py-16">
            {children}
          </main>

          <footer></footer>
      </body>
    </html>
  );
}
