"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type {
  MediaTextCardsBlockData,
  MediaTextCardItem,
} from "@/app/(admin)/admin/content-tools/home/types";

type Props = {
  value: MediaTextCardsBlockData;
  onChange: (value: MediaTextCardsBlockData) => void;
  onTitleBlur?: () => void;
  onDescriptionBlur?: () => void;
  onItemTitleBlur?: () => void;
  onItemSubtitleBlur?: () => void;
  onMediaUpload?: (id: number, file: File) => void | Promise<void>;
  onMediaRemove?: (id: number) => void | Promise<void>;
  isSaving?: boolean;
};

export function ManagePropertyBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onDescriptionBlur,
  onItemTitleBlur,
  onItemSubtitleBlur,
  onMediaUpload,
  onMediaRemove,
  isSaving = false,
}: Props) {
  const handleTopFieldChange = (
    key: "title" | "description",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      [key]: fieldValue,
    });
  };

  const handleItemFieldChange = (
    id: number,
    key: "title" | "subtitle",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id ? { ...item, [key]: fieldValue } : item,
      ),
    });
  };

  const handleItemFileChange = async (id: number, file: File) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id
          ? {
              ...item,
              fileName: file.name,
              preview: URL.createObjectURL(file),
            }
          : item,
      ),
    });

    await onMediaUpload?.(id, file);
  };

  const handleRemoveItemFile = async (id: number) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id
          ? {
              ...item,
              fileName: "",
              preview: undefined,
              mediaId: undefined,
            }
          : item,
      ),
    });

    await onMediaRemove?.(id);
  };

  const handleAddItem = () => {
    const nextId =
      value.items.length > 0
        ? Math.max(...value.items.map((item) => item.id)) + 1
        : 1;

    const nextItem: MediaTextCardItem = {
      id: nextId,
      fileName: "Фото.jpeg",
      preview: undefined,
      title: "",
      subtitle: "",
      mediaId: undefined,
    };

    onChange({
      ...value,
      items: [...value.items, nextItem],
    });
  };

  return (
    <AdminSectionCard title='Блок "Управляй недвижимостью"'>
      <div className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-2">
          <AdminTextareaField
            label="Основной заголовок"
            value={value.title}
            placeholder="Инвестируй в Недвижимость с Уверенностью"
            onChange={(fieldValue) => handleTopFieldChange("title", fieldValue)}
            onBlur={onTitleBlur}
          />

          <AdminTextareaField
            label="Описание краткое"
            value={value.description}
            placeholder="SOVE — это полный сервис управления real estate инвестициями. Мы берём на себя:"
            onChange={(fieldValue) =>
              handleTopFieldChange("description", fieldValue)
            }
            onBlur={onDescriptionBlur}
          />
        </div>

        <div className="rounded-[10px] border border-[#D9D9D9] bg-white p-4">
          <div className="max-h-[260px] space-y-4 overflow-y-auto pr-2">
            {value.items.map((item) => (
              <div key={item.id} className="grid gap-4 xl:grid-cols-3">
                <AdminMediaField
                  label="Фото"
                  fileName={item.fileName}
                  preview={item.preview}
                  onUpload={(file) => handleItemFileChange(item.id, file)}
                  onRemove={() => handleRemoveItemFile(item.id)}
                  compact
                />

                <AdminSmallTextField
                  label="Заголовок"
                  value={item.title}
                  placeholder="Текст"
                  onChange={(fieldValue) =>
                    handleItemFieldChange(item.id, "title", fieldValue)
                  }
                  onBlur={onItemTitleBlur}
                />

                <AdminSmallTextField
                  label="Подзаголовок"
                  value={item.subtitle}
                  placeholder="Текст"
                  onChange={(fieldValue) =>
                    handleItemFieldChange(item.id, "subtitle", fieldValue)
                  }
                  onBlur={onItemSubtitleBlur}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 inline-flex h-[42px] items-center justify-center rounded-[6px] bg-[#B45B3C] px-6 text-[16px] font-medium text-white transition hover:opacity-90"
          >
            Добавить
          </button>
        </div>
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-[#8D8D8D]">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}
