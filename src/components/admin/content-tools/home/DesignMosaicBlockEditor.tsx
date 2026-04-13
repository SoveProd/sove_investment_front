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
  isSaving?: boolean;
};

export function DesignMosaicBlockEditor({
  value,
  onChange,
  onTitleBlur,
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

  const handleRemoveItemFile = (id: number) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id ? { ...item, fileName: "", preview: undefined } : item,
      ),
    });
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
              />

              <AdminTextareaField
                label="Описание краткое"
                value={item.description}
                placeholder='"SOVE — это полный сервис управления real estate инвестициями. Мы берём на себя:"'
                onChange={(fieldValue) =>
                  handleItemChange(item.id, "description", fieldValue)
                }
              />

              <AdminMediaField
                label="Фото"
                fileName={item.fileName}
                preview={item.preview}
                onRemove={() => handleRemoveItemFile(item.id)}
                compact
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex h-[42px] items-center justify-center rounded-[6px] bg-[#B45B3C] px-6 text-[16px] font-medium text-white transition hover:opacity-90"
        >
          Добавить
        </button>
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-[#8D8D8D]">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}
