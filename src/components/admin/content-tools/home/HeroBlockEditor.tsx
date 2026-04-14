"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import type { HeroBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type HeroBlockEditorProps = {
  value: HeroBlockData;
  onChange: (value: HeroBlockData) => void;
  onMediaUpload?: (file: File) => void | Promise<void>;
  onMediaRemove?: () => void | Promise<void>;
  onTitleBlur?: () => void;
  onDescriptionBlur?: () => void;
  onPrimaryButtonBlur?: () => void;
  onSecondaryButtonBlur?: () => void;
  isSaving?: boolean;
};

export function HeroBlockEditor({
  value,
  onChange,
  onMediaUpload,
  onMediaRemove,
  onTitleBlur,
  onDescriptionBlur,
  onPrimaryButtonBlur,
  onSecondaryButtonBlur,
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
          accept="image/*,video/*"
          onUpload={onMediaUpload}
          onRemove={onMediaRemove}
        />

        <AdminSmallTextField
          label="Кнопка на инвест-ремонт"
          value={value.primaryButtonLabel}
          placeholder="Начать инвест ремонт"
          onChange={(fieldValue) =>
            onChange({
              ...value,
              primaryButtonLabel: fieldValue,
            })
          }
          onBlur={onPrimaryButtonBlur}
        />

        <AdminSmallTextField
          label="Кнопка на концепции"
          value={value.secondaryButtonLabel}
          placeholder="Посмотреть концепции"
          onChange={(fieldValue) =>
            onChange({
              ...value,
              secondaryButtonLabel: fieldValue,
            })
          }
          onBlur={onSecondaryButtonBlur}
        />

        <div />
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-adminMuted">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}
