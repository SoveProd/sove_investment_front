"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type { RequestsBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type Props = {
  value: RequestsBlockData;
  onChange: (value: RequestsBlockData) => void;
  onBlur?: () => void;
  onMediaUpload?: (file: File) => void | Promise<void>;
  onMediaRemove?: () => void | Promise<void>;
  isSaving?: boolean;
};

export function RequestsBlockEditor({
  value,
  onChange,
  onBlur,
  onMediaUpload,
  onMediaRemove,
  isSaving = false,
}: Props) {
  const handleFieldChange = (
    key: "title" | "primaryButtonLabel" | "secondaryButtonLabel",
    fieldValue: string,
  ) => {
    onChange({ ...value, [key]: fieldValue });
  };

  const handleFileChange = async (file: File) => {
    onChange({
      ...value,
      fileName: file.name,
      preview: URL.createObjectURL(file),
    });

    await onMediaUpload?.(file);
  };

  const handleRemoveFile = async () => {
    onChange({
      ...value,
      mediaId: undefined,
      fileName: "",
      preview: undefined,
    });

    await onMediaRemove?.();
  };

  return (
    <AdminSectionCard title='Блок "Заявки"'>
      <div className="rounded-[18px] bg-surface p-4">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr_420px]">
          <AdminTextareaField
            label="Заголовок"
            value={value.title}
            placeholder="НАЧНИ СВОЙ ИНВЕСТ&#10;РЕМОНТ С SOVE"
            onChange={(fieldValue) => handleFieldChange("title", fieldValue)}
            onBlur={onBlur}
          />

          <div className="space-y-4">
            <AdminSmallTextField
              label="Кнопка"
              value={value.primaryButtonLabel}
              placeholder="Попробовать"
              onChange={(fieldValue) =>
                handleFieldChange("primaryButtonLabel", fieldValue)
              }
              onBlur={onBlur}
            />

            <AdminSmallTextField
              label="Кнопка"
              value={value.secondaryButtonLabel}
              placeholder="Попробовать"
              onChange={(fieldValue) =>
                handleFieldChange("secondaryButtonLabel", fieldValue)
              }
              onBlur={onBlur}
            />
          </div>

          <div className="pt-[30px]">
            <AdminMediaField
              label="Фото"
              fileName={value.fileName}
              preview={value.preview}
              onUpload={handleFileChange}
              onRemove={handleRemoveFile}
              compact
            />
          </div>
        </div>

        {isSaving ? (
          <p className="mt-3 text-[13px] text-adminMuted">Сохраняем...</p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
}

