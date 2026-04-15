"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type { SoveGroupBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type Props = {
  value: SoveGroupBlockData;
  onChange: (value: SoveGroupBlockData) => void;
  onZoneBlur?: () => void;
  onMediaUpload?: (file: File) => void | Promise<void>;
  onMediaRemove?: () => void | Promise<void>;
  isSaving?: boolean;
};

export function SoveGroupBlockEditor({
  value,
  onChange,
  onZoneBlur,
  onMediaUpload,
  onMediaRemove,
  isSaving = false,
}: Props) {
  const handleZoneChange = (
    id: number,
    key: "title" | "subtitle",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      zones: value.zones.map((zone) =>
        zone.id === id ? { ...zone, [key]: fieldValue } : zone,
      ),
    });
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
    <AdminSectionCard title='Блок "SOVE GROUP"'>
      <div className="space-y-4 p-4">
        <div className="grid items-start gap-4 xl:grid-cols-[1fr_1fr_420px]">
          <div className="space-y-4">
            {value.zones.map((zone) => (
              <AdminTextareaField
                key={zone.id}
                label="Заголовок"
                value={zone.title}
                placeholder="Инвестируй в Недвижимость с Уверенностью"
                onChange={(fieldValue) =>
                  handleZoneChange(zone.id, "title", fieldValue)
                }
                onBlur={onZoneBlur}
              />
            ))}
          </div>

          <div className="space-y-4">
            {value.zones.map((zone) => (
              <AdminTextareaField
                key={zone.id}
                label="Подзаголовок"
                value={zone.subtitle}
                placeholder="SOVE — это полный сервис управления real estate инвестициями. Мы берём на себя:"
                onChange={(fieldValue) =>
                  handleZoneChange(zone.id, "subtitle", fieldValue)
                }
                onBlur={onZoneBlur}
              />
            ))}
          </div>

          <div className="self-start">
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
          <p className="text-[13px] text-adminMuted">Сохраняем...</p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
}

