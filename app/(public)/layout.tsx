"use client";

import type { ReactNode } from "react";
import { Header } from "@/src/components/layout/Header/Header";
import { Footer } from "@/src/components/layout/Footer/Footer";
import { TransitionProvider } from "@/app/TransitionProvider";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <TransitionProvider>{children}</TransitionProvider>
      </main>
      <Footer />
    </>
  );
}

