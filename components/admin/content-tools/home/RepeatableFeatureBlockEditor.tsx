"use client";

import { AdminSectionCard } from "@/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/components/admin/fields/AdminMediaField";
import type { RepeatableFeatureBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type RepeatableFeatureBlockEditorProps = {
  sectionTitle: string;
  value: RepeatableFeatureBlockData;
  onChange: (value: RepeatableFeatureBlockData) => void;

  onTitleBlur?: () => void;
  onDescriptionBlur?: () => void;
  onButtonBlur?: () => void;
  isSaving?: boolean;

  topTitleLabel?: string;
  topDescriptionLabel?: string;
  topButtonLabel?: string;

  topTitlePlaceholder?: string;
  topDescriptionPlaceholder?: string;
  topButtonPlaceholder?: string;

  itemMediaLabel?: string;
  itemTextLabel?: string;
  itemTextPlaceholder?: string;

  addButtonText?: string;
  newItemFileName?: string;
  newItemText?: string;
};

export function RepeatableFeatureBlockEditor({
  sectionTitle,
  value,
  onChange,
  onTitleBlur,
  onDescriptionBlur,
  onButtonBlur,
  isSaving = false,
  topTitleLabel = "Основной заголовок",
  topDescriptionLabel = "Описание краткое",
  topButtonLabel = "Кнопка",
  topTitlePlaceholder = "",
  topDescriptionPlaceholder = "",
  topButtonPlaceholder = "",
  itemMediaLabel = "Фото",
  itemTextLabel = "Описание краткое",
  itemTextPlaceholder = "",
  addButtonText = "Добавить",
  newItemFileName = "Фото.jpeg",
  newItemText = "",
}: RepeatableFeatureBlockEditorProps) {
  const handleTopFieldChange = (
    key: "title" | "description" | "buttonLabel",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      [key]: fieldValue,
    });
  };

  const handleItemChange = (
    id: number,
    key: "fileName" | "preview" | "text",
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
          text: newItemText,
        },
      ],
    });
  };

  return (
    <AdminSectionCard title={sectionTitle}>
      <div className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-3">
          <AdminTextareaField
            label={topTitleLabel}
            value={value.title}
            placeholder={topTitlePlaceholder}
            onChange={(fieldValue) => handleTopFieldChange("title", fieldValue)}
            onBlur={onTitleBlur}
          />

          <AdminTextareaField
            label={topDescriptionLabel}
            value={value.description}
            placeholder={topDescriptionPlaceholder}
            onChange={(fieldValue) =>
              handleTopFieldChange("description", fieldValue)
            }
            onBlur={onDescriptionBlur}
          />

          <AdminSmallTextField
            label={topButtonLabel}
            value={value.buttonLabel}
            placeholder={topButtonPlaceholder}
            onChange={(fieldValue) =>
              handleTopFieldChange("buttonLabel", fieldValue)
            }
            onBlur={onButtonBlur}
          />
        </div>

        <div className="max-w-[68%] rounded-[10px] border border-[#D9D9D9] bg-white p-3 max-xl:max-w-full">
          <div className="max-h-[190px] space-y-3 overflow-y-auto pr-2">
            {value.items.map((item) => (
              <div key={item.id} className="grid gap-4 xl:grid-cols-2">
                <AdminMediaField
                  label={itemMediaLabel}
                  fileName={item.fileName}
                  preview={item.preview}
                  onRemove={() => handleRemoveItemFile(item.id)}
                  compact
                />

                <AdminSmallTextField
                  label={itemTextLabel}
                  value={item.text}
                  placeholder={itemTextPlaceholder}
                  onChange={(fieldValue) =>
                    handleItemChange(item.id, "text", fieldValue)
                  }
                />
              </div>
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

        {isSaving ? (
          <p className="text-[13px] text-[#8D8D8D]">Сохраняем...</p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
}
