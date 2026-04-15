"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type { ServicePackagesHeaderBlockData } from "@/app/(admin)/admin/content-tools/service-packages/types";

type Props = {
  value: ServicePackagesHeaderBlockData;
  onChange: (value: ServicePackagesHeaderBlockData) => void;
  onBlur?: () => void;
  onMediaUpload?: (file: File) => void | Promise<void>;
  onMediaRemove?: () => void | Promise<void>;
  isSaving?: boolean;
};

export function ServicePackagesHeaderBlockEditor({
  value,
  onChange,
  onBlur,
  onMediaUpload,
  onMediaRemove,
  isSaving = false,
}: Props) {
  return (
    <AdminSectionCard title='Блок "шапка" (service_packages)'>
      <div className="grid gap-4 xl:grid-cols-3">
        <AdminTextareaField
          label="Заголовок"
          value={value.title}
          onChange={(fieldValue) => onChange({ ...value, title: fieldValue })}
          onBlur={onBlur}
        />

        <AdminTextareaField
          label="Подзаголовок"
          value={value.subtitle}
          onChange={(fieldValue) =>
            onChange({ ...value, subtitle: fieldValue })
          }
          onBlur={onBlur}
        />

        <AdminMediaField
          label="Картинка/медиа (первое в media[])"
          fileName={value.fileName}
          preview={value.preview}
          accept="image/*,video/*"
          onUpload={onMediaUpload}
          onRemove={onMediaRemove}
        />
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-adminMuted">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}

