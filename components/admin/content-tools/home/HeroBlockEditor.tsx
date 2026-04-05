"use client";

import { AdminSectionCard } from "@/components/admin/ui/AdminSectionCard";
import { AdminTextField } from "@/components/admin/fields/AdminTextField";
import { AdminTextareaField } from "@/components/admin/fields/AdminTextareaField";
import { AdminMediaField } from "@/components/admin/fields/AdminMediaField";

export function HeroBlockEditor() {
  return (
    <AdminSectionCard title='Блок "шапка"'>
      <div className="grid gap-4 xl:grid-cols-3">

        <AdminTextareaField
          label="Основной заголовок"
          value=""
          onChange={() => {}}
        />

        <AdminTextareaField
          label="Описание краткое"
          value=""
          onChange={() => {}}
        />

        <AdminMediaField label="Видео" fileName="Видео.mp4" />
      </div>
    </AdminSectionCard>
  );
}
