"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type {
  RepeatableFeatureBlockData,
  RepeatableFeatureItem,
} from "@/app/(admin)/admin/content-tools/home/types";

type Props = {
  sectionTitle: string;
  value: RepeatableFeatureBlockData;
  onChange: (value: RepeatableFeatureBlockData) => void;

  onTitleBlur?: () => void;
  onDescriptionBlur?: () => void;
  onButtonBlur?: () => void;
  onItemTextBlur?: () => void;
  isSaving?: boolean;

  onMediaUpload?: (id: number, file: File) => void | Promise<void>;
  onMediaRemove?: (id: number) => void | Promise<void>;

  topTitleLabel: string;
  topDescriptionLabel: string;
  topButtonLabel: string;

  topTitlePlaceholder?: string;
  topDescriptionPlaceholder?: string;
  topButtonPlaceholder?: string;

  itemMediaLabel: string;
  itemTextLabel: string;
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
  onItemTextBlur,
  isSaving = false,
  onMediaUpload,
  onMediaRemove,
  topTitleLabel,
  topDescriptionLabel,
  topButtonLabel,
  topTitlePlaceholder,
  topDescriptionPlaceholder,
  topButtonPlaceholder,
  itemMediaLabel,
  itemTextLabel,
  itemTextPlaceholder,
  addButtonText = "Добавить",
  newItemFileName = "Фото.jpeg",
  newItemText = "",
}: Props) {
  const handleItemTextChange = (id: number, text: string) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id ? { ...item, text } : item,
      ),
    });
  };

  const handleItemRemoveFile = (id: number) => {
    if (onMediaRemove) {
      onMediaRemove(id);
      return;
    }

    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id
          ? {
              ...item,
              mediaId: undefined,
              fileName: "",
              preview: undefined,
            }
          : item,
      ),
    });
  };

  const handleItemUpload = (id: number, file: File) => {
    if (onMediaUpload) {
      onMediaUpload(id, file);
      return;
    }

    const preview = URL.createObjectURL(file);

    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id
          ? {
              ...item,
              fileName: file.name,
              preview,
            }
          : item,
      ),
    });
  };

  const handleAddItem = () => {
    const nextId =
      value.items.length > 0
        ? Math.max(...value.items.map((item) => item.id)) + 1
        : 1;

    const nextItem: RepeatableFeatureItem = {
      id: nextId,
      fileName: newItemFileName,
      preview: undefined,
      text: newItemText,
    };

    onChange({
      ...value,
      items: [...value.items, nextItem],
    });
  };

  return (
    <AdminSectionCard title={sectionTitle}>
      <div className="grid gap-4 xl:grid-cols-3">
        <AdminTextareaField
          label={topTitleLabel}
          value={value.title}
          placeholder={topTitlePlaceholder}
          onChange={(fieldValue) =>
            onChange({
              ...value,
              title: fieldValue,
            })
          }
          onBlur={onTitleBlur}
        />

        <AdminTextareaField
          label={topDescriptionLabel}
          value={value.description}
          placeholder={topDescriptionPlaceholder}
          onChange={(fieldValue) =>
            onChange({
              ...value,
              description: fieldValue,
            })
          }
          onBlur={onDescriptionBlur}
        />

        <AdminSmallTextField
          label={topButtonLabel}
          value={value.buttonLabel}
          placeholder={topButtonPlaceholder}
          onChange={(fieldValue) =>
            onChange({
              ...value,
              buttonLabel: fieldValue,
            })
          }
          onBlur={onButtonBlur}
        />

        <div className="xl:col-span-2 rounded-[10px] border border-[#D9D9D9] bg-white p-4">
          <div className="space-y-4">
            {value.items.map((item) => (
              <div key={item.id} className="grid gap-4 md:grid-cols-2">
                <AdminMediaField
                  label={itemMediaLabel}
                  fileName={item.fileName}
                  preview={item.preview}
                  accept="image/*"
                  onUpload={(file) => handleItemUpload(item.id, file)}
                  onRemove={() => handleItemRemoveFile(item.id)}
                  compact
                />

                <AdminSmallTextField
                  label={itemTextLabel}
                  value={item.text}
                  placeholder={itemTextPlaceholder}
                  onChange={(fieldValue) =>
                    handleItemTextChange(item.id, fieldValue)
                  }
                  onBlur={onItemTextBlur}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 inline-flex h-[43px] min-w-[137px] items-center justify-center rounded-[8px] bg-[#B45B3C] px-6 text-[14px] font-medium text-white transition hover:opacity-90"
          >
            {addButtonText}
          </button>
        </div>

        <div />
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-[#8D8D8D]">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}
