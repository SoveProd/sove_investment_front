"use client";

import { usePathname } from "next/navigation";
import { useAdminHeaderActions } from "./AdminHeaderActionsContext";

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/admin/content-tools/home")) {
    return "Content Tools / Главная";
  }

  if (pathname.startsWith("/admin/content-tools/service-packages")) {
    return "Content Tools / Пакеты";
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

export function AdminHeader({
}: {
}) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const headerActions = useAdminHeaderActions();

  const isContentTools = pathname.startsWith("/admin/content-tools");
  const canSave = Boolean(headerActions.onSave);
  const canPublish = Boolean(headerActions.onPublish);
  const publishing = Boolean(headerActions.isPublishing);

  return (
    <header className="border-b border-border px-8 py-6 max-lg:px-5">
      <div className="flex items-center justify-between">
        <p className="text-[20px] font-normal text-graphite">{title}</p>

        {isContentTools && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={headerActions.onSave}
              disabled={!canSave}
              className="h-[44px] rounded-[8px] bg-[#AE613D] px-6 text-[16px] font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
              Сохранить изменения
            </button>

            <button
              type="button"
              onClick={headerActions.onPublish}
              disabled={!canPublish || publishing}
              className="h-[44px] rounded-[8px] bg-[#2F2F2F] px-6 text-[16px] font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {publishing ? "Публикуем..." : "Опубликовать"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
