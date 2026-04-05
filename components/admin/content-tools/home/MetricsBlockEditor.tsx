"use client";

import { AdminSectionCard } from "@/components/admin/ui/AdminSectionCard";
import { AdminSmallTextField } from "@/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/components/admin/fields/AdminMediaField";
import type { MetricsBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type MetricsBlockEditorProps = {
  value: MetricsBlockData;
  onChange: (value: MetricsBlockData) => void;
};

export function MetricsBlockEditor({
  value,
  onChange,
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
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id ? { ...item, fileName: "", preview: "" } : item,
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
              />

              <AdminSmallTextField
                value={item.value}
                placeholder="150"
                onChange={(fieldValue) =>
                  handleMetricChange(item.id, "value", fieldValue)
                }
              />

              <AdminMediaField
                fileName={item.fileName}
                preview={item.preview}
                onRemove={() => handleRemoveFile(item.id)}
                compact
              />
            </div>
          </div>
        ))}
      </div>
    </AdminSectionCard>
  );
}
