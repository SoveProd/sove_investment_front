"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type { MetricsBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type MetricsBlockEditorProps = {
  value: MetricsBlockData;
  onChange: (value: MetricsBlockData) => void;
  onMediaUpload?: (id: number, file: File) => void | Promise<void>;
  onMediaRemove?: (id: number) => void | Promise<void>;
  onFieldBlur?: () => void;
  isSaving?: boolean;
};

export function MetricsBlockEditor({
  value,
  onChange,
  onMediaUpload,
  onMediaRemove,
  onFieldBlur,
  isSaving = false,
}: MetricsBlockEditorProps) {
  const handleMetricChange = (
    id: number,
    key: "title" | "value" | "fileName" | "preview",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id ? { ...item, [key]: fieldValue } : item,
      ),
    });
  };

  const handleRemoveFile = (id: number) => {
    if (onMediaRemove) {
      onMediaRemove(id);
      return;
    }

    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id
          ? { ...item, mediaId: undefined, fileName: "", preview: "" }
          : item,
      ),
    });
  };

  return (
    <AdminSectionCard title='Блок "метрики"'>
      <div className="space-y-6">
        {value.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <p className="text-[14px] leading-[1.2] text-[#8D8D8D]">
              {item.label}
            </p>

            <div className="grid gap-4 xl:grid-cols-3">
              <AdminSmallTextField
                value={item.title}
                placeholder="Реализованных проектов"
                onChange={(fieldValue) =>
                  handleMetricChange(item.id, "title", fieldValue)
                }
                onBlur={onFieldBlur}
              />

              <AdminSmallTextField
                value={item.value}
                placeholder="150"
                onChange={(fieldValue) =>
                  handleMetricChange(item.id, "value", fieldValue)
                }
                onBlur={onFieldBlur}
              />

              <AdminMediaField
                fileName={item.fileName}
                preview={item.preview}
                accept="image/*,video/*"
                onUpload={(file) => onMediaUpload?.(item.id, file)}
                onRemove={() => handleRemoveFile(item.id)}
                compact
              />
            </div>
          </div>
        ))}

        {isSaving ? (
          <p className="text-[13px] text-[#8D8D8D]">Сохраняем...</p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
}
