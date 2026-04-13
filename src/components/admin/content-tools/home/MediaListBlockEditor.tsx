"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type { MediaListBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type MediaListBlockEditorProps = {
  sectionTitle: string;
  value: MediaListBlockData;
  onChange: (value: MediaListBlockData) => void;

  topTitleLabel?: string;
  topDescriptionLabel?: string;

  topTitlePlaceholder?: string;
  topDescriptionPlaceholder?: string;

  itemMediaLabel?: string;
  addButtonText?: string;
  newItemFileName?: string;
};

export function MediaListBlockEditor({
  sectionTitle,
  value,
  onChange,
  topTitleLabel = "Основной заголовок",
  topDescriptionLabel = "Описание краткое",
  topTitlePlaceholder = "",
  topDescriptionPlaceholder = "",
  itemMediaLabel = "Фото",
  addButtonText = "Добавить",
  newItemFileName = "Фото.jpeg",
}: MediaListBlockEditorProps) {
  const handleTopFieldChange = (
    key: "title" | "description",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      [key]: fieldValue,
    });
  };

  const handleItemChange = (
    id: number,
    key: "fileName" | "preview",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id ? { ...item, [key]: fieldValue } : item,
      ),
    });
  };

  const handleRemoveItemFile = (id: number) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id ? { ...item, fileName: "", preview: "" } : item,
      ),
    });
  };

  const handleAddItem = () => {
    const nextId =
      value.items.length > 0
        ? Math.max(...value.items.map((item) => item.id)) + 1
        : 1;

    onChange({
      ...value,
      items: [
        ...value.items,
        {
          id: nextId,
          fileName: newItemFileName,
          preview: "",
        },
      ],
    });
  };

  return (
    <AdminSectionCard title={sectionTitle}>
      <div className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-2">
          <AdminTextareaField
            label={topTitleLabel}
            value={value.title}
            placeholder={topTitlePlaceholder}
            onChange={(fieldValue) => handleTopFieldChange("title", fieldValue)}
          />

          <AdminTextareaField
            label={topDescriptionLabel}
            value={value.description}
            placeholder={topDescriptionPlaceholder}
            onChange={(fieldValue) =>
              handleTopFieldChange("description", fieldValue)
            }
          />
        </div>

        <div className="max-w-[68%] rounded-[10px] border border-[#D9D9D9] bg-white p-3 max-xl:max-w-full">
          <div className="max-h-[190px] space-y-3 overflow-y-auto pr-2">
            {value.items.map((item) => (
              <AdminMediaField
                key={item.id}
                label={itemMediaLabel}
                fileName={item.fileName}
                preview={item.preview}
                onRemove={() => handleRemoveItemFile(item.id)}
                compact
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 inline-flex h-[42px] items-center justify-center rounded-[6px] bg-[#B45B3C] px-6 text-[16px] font-medium text-white transition hover:opacity-90"
          >
            {addButtonText}
          </button>
        </div>
      </div>
    </AdminSectionCard>
  );
}
