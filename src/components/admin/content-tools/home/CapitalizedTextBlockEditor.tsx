"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import type { TextButtonBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type Props = {
  value: TextButtonBlockData;
  onChange: (value: TextButtonBlockData) => void;
  onTextBlur?: () => void;
  onButtonBlur?: () => void;
  isSaving?: boolean;
};

export function CapitalizedTextBlockEditor({
  value,
  onChange,
  onTextBlur,
  onButtonBlur,
  isSaving = false,
}: Props) {
  return (
    <AdminSectionCard title='Блок "текст"'>
      <div className="grid gap-4 xl:grid-cols-2">
        <AdminTextareaField
          label="Текст"
          value={value.text}
          onChange={(fieldValue) =>
            onChange({
              ...value,
              text: fieldValue,
            })
          }
          onBlur={onTextBlur}
        />

        <AdminSmallTextField
          label="Кнопка"
          value={value.buttonLabel}
          placeholder="Посмотри наши кейсы"
          onChange={(fieldValue) =>
            onChange({
              ...value,
              buttonLabel: fieldValue,
            })
          }
          onBlur={onButtonBlur}
        />
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-[#8D8D8D]">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}
