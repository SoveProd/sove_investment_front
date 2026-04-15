"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import type { QnaBlockData } from "@/app/(admin)/admin/content-tools/service-packages/types";

type Props = {
  value: QnaBlockData;
  onChange: (value: QnaBlockData) => void;
  onBlur?: () => void;
  isSaving?: boolean;
};

export function QnaBlockEditor({
  value,
  onChange,
  onBlur,
  isSaving = false,
}: Props) {
  const handleItemChange = (
    id: number,
    key: "question" | "answer",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      items: value.items.map((it) =>
        it.id === id ? { ...it, [key]: fieldValue } : it,
      ),
    });
  };

  const handleAdd = () => {
    const nextId =
      value.items.length > 0
        ? Math.max(...value.items.map((x) => x.id)) + 1
        : 1;

    onChange({
      ...value,
      items: [...value.items, { id: nextId, question: "", answer: "" }],
    });
  };

  return (
    <AdminSectionCard title="Вопрос / ответ">
      <div className="space-y-4">
        <div className="grid gap-4">
          {value.items.map((item) => (
            <div key={item.id} className="grid gap-4 xl:grid-cols-2">
              <AdminTextareaField
                label="Вопрос"
                value={item.question}
                onChange={(fieldValue) =>
                  handleItemChange(item.id, "question", fieldValue)
                }
                onBlur={onBlur}
              />
              <AdminTextareaField
                label="Ответ"
                value={item.answer}
                onChange={(fieldValue) =>
                  handleItemChange(item.id, "answer", fieldValue)
                }
                onBlur={onBlur}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex h-[42px] items-center justify-center rounded-[6px] bg-adminAccent px-6 text-[16px] font-medium text-white transition hover:opacity-90"
        >
          Добавить вопрос
        </button>

        {isSaving ? (
          <p className="text-[13px] text-adminMuted">Сохраняем...</p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
}

