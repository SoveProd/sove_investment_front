"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  PenSquare,
  UserCog,
  Settings,
  ChevronDown,
} from "lucide-react";

const navItems = [
  {
    label: "Проекты",
    href: "/admin/projects",
    icon: BriefcaseBusiness,
    active: true,
  },
  {
    label: "Заявки",
    href: "/admin/requests",
    icon: ClipboardList,
  },
  {
    label: "База клиентов",
    href: "/admin/clients",
    icon: FileText,
  },
  {
    label: "Content Tools",
    href: "/admin/content-tools/home",
    icon: PenSquare,
    withArrow: true,
  },
  {
    label: "Управление",
    href: "/admin/management",
    icon: UserCog,
  },
  {
    label: "Профиль",
    href: "/admin/profile",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[367px] shrink-0 max-xl:w-[300px] max-lg:hidden">
      <div className="min-h-[calc(100vh-40px)] overflow-hidden rounded-[34px] bg-white px-[22px] py-8">
        <Link
          href="/admin/content-tools/home"
          className="mb-14 inline-flex px-[10px] text-[56px] font-bold leading-none text-[#A05035]"
        >
          SG
        </Link>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex min-h-[62px] items-center justify-between rounded-[10px] px-[15px] transition-colors",
                  isActive ? "bg-[#FFEEE9]" : "hover:bg-[#F8F5F3]",
                )}
              >
                <span className="flex items-center gap-[17px]">
                  <Icon
                    size={28}
                    strokeWidth={2}
                    className={clsx(
                      isActive ? "text-[#A05035]" : "text-[#5B5B5B]",
                    )}
                  />

                  <span
                    className={clsx(
                      "text-[22px] leading-[22px]",
                      isActive
                        ? "font-semibold text-[#A05035]"
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
