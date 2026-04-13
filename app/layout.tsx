import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Header } from "@/src/components/layout/Header/Header";
import { Footer } from "@/src/components/layout/Footer/Footer";
import { TransitionProvider } from "./TransitionProvider";
import { StoreProvider } from "@/src/store/StoreProvider";

const montserrat = localFont({
  src: [
    {
      path: "../public/fonts/montserrat/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOVE Group",
  description: "Инвестиции в недвижимость с дизайном под ключ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} font-main antialiased bg-white text-black overflow-x-hidden`}
      >
        <StoreProvider>
          <Header />

          <main className="min-h-screen">
            <TransitionProvider>{children}</TransitionProvider>
          </main>

          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
