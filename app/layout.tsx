import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import GamezProvider from "@/components/GamezProvider";
import "./globals.css";

const interFont = Inter({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gamez",
  description: "Gamez AI search and game log",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="container mx-auto mt-10">
          <GamezProvider>
            {children}
          </GamezProvider>
        </main>
        </body>
    </html>
  );
}
