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
      <div className="w-full max-w-4xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <AdminTextareaField
              label="Текст (серый сверху)"
              value={value.grayTextTop}
              onChange={(fieldValue) =>
                onChange({
                  ...value,
                  grayTextTop: fieldValue,
                })
              }
              onBlur={onTextBlur}
            />
          </div>

          <div className="md:col-span-2">
            <AdminTextareaField
              label="Текст (чёрный основной)"
              value={value.blackTextMain}
              onChange={(fieldValue) =>
                onChange({
                  ...value,
                  blackTextMain: fieldValue,
                })
              }
              onBlur={onTextBlur}
            />
          </div>

          <div className="md:col-span-2">
            <AdminTextareaField
              label="Текст (серый снизу)"
              value={value.grayTextBottom}
              onChange={(fieldValue) =>
                onChange({
                  ...value,
                  grayTextBottom: fieldValue,
                })
              }
              onBlur={onTextBlur}
            />
          </div>

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
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-adminMuted">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}
