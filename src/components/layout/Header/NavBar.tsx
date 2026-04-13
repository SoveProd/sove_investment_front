"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "../Container";

type NavItem = { label: string; href: string };

type Props = {
  variant?: "transparent" | "dark" | "light";
};

const NAV_ITEMS: NavItem[] = [
  { label: "О сервисе", href: "/about" },
  { label: "Концепции", href: "/concepts" },
  { label: "Пакеты", href: "/packages" },
  { label: "Кейсы", href: "/cases" },
  { label: "Метод ремонта", href: "/method" },
];

export function NavBar({ variant = "transparent" }: Props) {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = variant === "light";
  const isDark = variant === "dark";

  const headerBg = isLight
    ? "bg-[#EFEFEF]"
    : isDark
      ? "bg-[#1f1f1f]"
      : scrolled
        ? "bg-black/35 backdrop-blur-md"
        : "bg-transparent";

  const lineColor = isLight ? "bg-black/20" : "bg-white/35";

  const linkBase = isLight
    ? "text-black/70 hover:text-black"
    : "text-white/80 hover:text-white";

  const activeLink = isLight ? "text-black" : "text-white";

  const iconColor = isLight
    ? "text-black/80 hover:text-black"
    : "text-white/85 hover:text-white";

  const burgerHover = isLight ? "hover:bg-black/5" : "hover:bg-white/10";

  const logoSrc = isLight ? "/logo.svg" : "/logo.svg";

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-50",
        "transition-colors duration-200",
        headerBg,
      ].join(" ")}
    >
      <div className={`absolute inset-x-0 bottom-0 h-px ${lineColor}`} />

      <Container>
        <div className="flex items-center justify-between py-[22px] md:py-[28px]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="SOVE Group"
            className="inline-flex items-center select-none"
          >
            <Image
              src={logoSrc}
              alt="SOVE Group"
              width={300}
              height={100}
              priority
            />
          </Link>

          <div className="flex items-center gap-6">
            {/* Navigation */}
            <nav
              className="hidden items-center md:flex"
              aria-label="Главная навигация"
            >
              <ul className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={[
                          "text-[18px] transition-colors",
                          isActive ? activeLink : linkBase,
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Burger */}
            <button
              type="button"
              aria-label="Открыть меню"
              className={[
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
                iconColor,
                burgerHover,
              ].join(" ")}
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
