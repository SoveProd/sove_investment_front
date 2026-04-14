"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  iconSrc: string;
  withArrow?: boolean;
};

const navItems: NavItem[] = [
  {
    label: "Проекты",
    href: "/admin/projects",
    iconSrc: "/admin/icons/Group 1.svg",
  },
  {
    label: "Заявки",
    href: "/admin/requests",
    iconSrc: "/admin/icons/Calendar Checked.svg",
  },
  {
    label: "База клиентов",
    href: "/admin/clients",
    iconSrc: "/admin/icons/Document Align Center 1.svg",
  },
  {
    label: "Content Tools",
    href: "/admin/content-tools/home",
    iconSrc: "/admin/icons/Edit.svg",
    withArrow: true,
  },
  {
    label: "Управление",
    href: "/admin/management",
    iconSrc: "/admin/icons/Other.svg",
  },
  {
    label: "Профиль",
    href: "/admin/profile",
    iconSrc: "/admin/icons/Settings.svg",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[367px] shrink-0 max-xl:w-[300px] max-lg:hidden">
      <div className="min-h-[calc(100vh-40px)] overflow-hidden rounded-[34px] bg-white px-[22px] py-8">
        <Link
          href="/admin/content-tools/home"
          className="mb-14 inline-flex px-[10px]"
          aria-label="Sove Group admin"
        >
          <Image
            src="/footerLogo.svg"
            alt="Sove Group"
            width={104}
            height={58}
            className="h-auto w-[104px]"
            priority
          />
        </Link>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex min-h-[62px] items-center justify-between rounded-[10px] px-[15px] transition-colors",
                  isActive ? "bg-adminActiveBg" : "hover:bg-adminHoverBg",
                )}
              >
                <span className="flex items-center gap-[17px]">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 object-contain"
                  />

                  <span
                    className={clsx(
                      "text-[22px] leading-[22px]",
                      isActive
                        ? "font-semibold text-primary"
                        : "font-normal text-[#5B5B5B]",
                    )}
                  >
                    {item.label}
                  </span>
                </span>

                {item.withArrow ? (
                  <ChevronDown size={16} className="shrink-0 text-[#5B5B5B]" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
