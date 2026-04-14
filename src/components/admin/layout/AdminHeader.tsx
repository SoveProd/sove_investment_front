"use client";

import { usePathname } from "next/navigation";

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/admin/content-tools/home")) {
    return "Content Tools / Главная";
  }

  if (pathname.startsWith("/admin/projects")) {
    return "Проекты";
  }

  if (pathname.startsWith("/admin/requests")) {
    return "Заявки";
  }

  if (pathname.startsWith("/admin/clients")) {
    return "База клиентов";
  }

  if (pathname.startsWith("/admin/management")) {
    return "Управление";
  }

  if (pathname.startsWith("/admin/profile")) {
    return "Профиль";
  }

  return "Admin Panel";
}

export function AdminHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="border-b border-border px-8 py-6 max-lg:px-5">
      <p className="text-[20px] font-normal text-graphite">{title}</p>
    </header>
  );
}
