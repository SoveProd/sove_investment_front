"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type {
  DesignMosaicBlockData,
  DesignMosaicItem,
} from "@/app/(admin)/admin/content-tools/home/types";

type Props = {
  value: DesignMosaicBlockData;
  onChange: (value: DesignMosaicBlockData) => void;
  onTitleBlur?: () => void;
  onItemBlur?: () => void;
  onMediaUpload?: (id: number, file: File) => void | Promise<void>;
  onMediaRemove?: (id: number) => void | Promise<void>;
  isSaving?: boolean;
};

export function DesignMosaicBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onItemBlur,
  onMediaUpload,
  onMediaRemove,
  isSaving = false,
}: Props) {
  const handleTitleChange = (fieldValue: string) => {
    onChange({
      ...value,
      title: fieldValue,
    });
  };

  const handleItemChange = (
    id: number,
    key: "title" | "description",
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

    const nextItem: DesignMosaicItem = {
      id: nextId,
      title: "",
      description: "",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    };

    onChange({
      ...value,
      items: [...value.items, nextItem],
    });
  };

  return (
    <AdminSectionCard title='Блок "инвестируй под ключ"'>
      <div className="space-y-4">
        <div className="max-w-[420px]">
          <AdminTextareaField
            label="Заголовок"
            value={value.title}
            placeholder="Описание краткое&#10;SOVE"
            onChange={handleTitleChange}
            onBlur={onTitleBlur}
          />
        </div>

        <div className="space-y-4">
          {value.items.map((item) => (
            <div key={item.id} className="grid gap-4 xl:grid-cols-3">
              <AdminTextareaField
                label="Заголовок"
                value={item.title}
                placeholder="Инвестируй в Недвижимость&#10;с Уверенностью"
                onChange={(fieldValue) =>
                  handleItemChange(item.id, "title", fieldValue)
                }
                onBlur={onItemBlur}
              />

              <AdminTextareaField
                label="Описание краткое"
                value={item.description}
                placeholder='"SOVE — это полный сервис управления real estate инвестициями. Мы берём на себя:"'
                onChange={(fieldValue) =>
                  handleItemChange(item.id, "description", fieldValue)
                }
                onBlur={onItemBlur}
              />

              <AdminMediaField
                label="Фото"
                fileName={item.fileName}
                preview={item.preview}
                onUpload={(file) => handleItemFileChange(item.id, file)}
                onRemove={() => handleRemoveItemFile(item.id)}
                compact
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex h-[42px] items-center justify-center rounded-[6px] bg-adminAccent px-6 text-[16px] font-medium text-white transition hover:opacity-90"
        >
          Добавить
        </button>
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-adminMuted">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}
