"use client";

import { AdminSectionCard } from "@/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/components/admin/fields/AdminTextareaField";
import { AdminMediaField } from "@/components/admin/fields/AdminMediaField";
import type { HeroBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type HeroBlockEditorProps = {
  value: HeroBlockData;
  onChange: (value: HeroBlockData) => void;
  onTitleBlur?: () => void;
  onDescriptionBlur?: () => void;
  isSaving?: boolean;
};

export function HeroBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onDescriptionBlur,
  isSaving = false,
}: HeroBlockEditorProps) {
  return (
    <AdminSectionCard title='Блок "шапка"'>
      <div className="grid gap-4 xl:grid-cols-3">
        <AdminTextareaField
          label="Основной заголовок"
          value={value.title}
          onChange={(fieldValue) =>
            onChange({
              ...value,
              title: fieldValue,
            })
          }
          onBlur={onTitleBlur}
        />

        <AdminTextareaField
          label="Описание краткое"
          value={value.description}
          onChange={(fieldValue) =>
            onChange({
              ...value,
              description: fieldValue,
            })
          }
          onBlur={onDescriptionBlur}
        />

        <AdminMediaField
          label="Видео"
          fileName={value.videoName}
          preview={value.videoPreview}
        />
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-[#8D8D8D]">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}
