"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "../Container";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "О сервисе", href: "#about" },
  { label: "Концепции", href: "#concepts" },
  { label: "Пакеты", href: "#packages" },
  { label: "Кейсы", href: "#cases" },
  { label: "Метод ремонта", href: "#method" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-50",
        "transition",
        scrolled ? "bg-black/35 backdrop-blur-md" : "bg-transparent",
      ].join(" ")}
    >
      {/* bottom white line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/35" />

      <Container>
        <div className="flex items-center justify-between py-[31px]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="SOVE Group"
            className="select-none text-[18px] tracking-[0.25em] text-white/90 hover:text-white transition"
          >
            SOVE<span className="mx-1 text-white/40">·</span>GROUP
          </Link>

          {/* Right block: menu + burger */}
          <div className="flex items-center gap-6">
            <nav
              className="hidden items-center md:flex"
              aria-label="Главная навигация"
            >
              <ul className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[18px] text-white/80 hover:text-white transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Burger (пока без меню) */}
            <button
              type="button"
              aria-label="Открыть меню"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/85 hover:text-white hover:bg-white/10 transition"
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-4 w-5">
                <span className="absolute left-0 top-0 h-[2px] w-full rounded bg-current" />
                <span className="absolute left-0 top-[7px] h-[2px] w-full rounded bg-current" />
                <span className="absolute left-0 bottom-0 h-[2px] w-full rounded bg-current" />
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
