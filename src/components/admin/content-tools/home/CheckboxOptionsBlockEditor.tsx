"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import type { FeaturedSelectionBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type CheckboxOptionsBlockEditorProps = {
  sectionTitle: string;
  value: FeaturedSelectionBlockData;
  onChange: (value: FeaturedSelectionBlockData) => void;
  onTitleBlur?: () => void;
  onSelectionChange?: (nextValue: FeaturedSelectionBlockData) => void;
  isSaving?: boolean;
};

type SelectionItem = {
  id: number;
  checked?: boolean;
  title?: string;
  label?: string;
  name?: string;
};

export function CheckboxOptionsBlockEditor({
  sectionTitle,
  value,
  onChange,
  onTitleBlur,
  onSelectionChange,
  isSaving = false,
}: CheckboxOptionsBlockEditorProps) {
  const items = (value.items || []) as SelectionItem[];

  const handleToggle = (id: number) => {
    const nextValue: FeaturedSelectionBlockData = {
      ...value,
      items: items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ) as FeaturedSelectionBlockData["items"],
    };

    onChange(nextValue);
    onSelectionChange?.(nextValue);
  };

  const getItemLabel = (item: SelectionItem) => {
    return item.title || item.label || item.name || `Элемент #${item.id}`;
  };

  return (
    <AdminSectionCard title={sectionTitle}>
      <div className="space-y-6">
        <AdminTextareaField
          label="Основной заголовок"
          value={value.title}
          placeholder="Популярные концепции"
          onChange={(fieldValue) =>
            onChange({
              ...value,
              title: fieldValue,
            })
          }
          onBlur={onTitleBlur}
        />

        <div className="rounded-[16px] border border-borderSoft bg-surface p-4 md:p-5">
          <p className="mb-4 text-[14px] leading-[1.2] text-textSecondary">
            Выбери элементы, которые должны отображаться в этом блоке
          </p>

          {items.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => {
                const itemLabel = getItemLabel(item);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    className={`flex min-h-[64px] w-full items-center gap-3 rounded-[12px] border px-4 py-3 text-left transition ${
                      item.checked
                        ? "border-primary bg-adminSurfaceWarm"
                        : "border-borderSoft bg-surface hover:border-primary/40"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
                        item.checked
                          ? "border-primary bg-primary text-white"
                          : "border-adminCheckboxBorder bg-surface"
                      }`}
                    >
                      {item.checked ? "✓" : ""}
                    </span>

                    <span className="text-[14px] font-medium leading-[1.3] text-graphite">
                      {itemLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[12px] border border-dashed border-borderSoft px-4 py-6 text-[13px] text-textSecondary">
              Пока нет доступных элементов для выбора
            </div>
          )}
        </div>

        {isSaving ? (
          <p className="text-[13px] text-textSecondary">Сохраняем...</p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
}
