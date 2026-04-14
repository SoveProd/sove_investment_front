"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import type {
  ReviewsBlockData,
  ReviewItem,
} from "@/app/(admin)/admin/content-tools/home/types";

function clampRating(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(5, Math.round(value)));
}

function RatingStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const rating = clampRating(value);

  return (
    <div className="space-y-2">
      <div className="block text-[14px] leading-[1.2] text-[#8D8D8D]">Оценка</div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          const filled = starValue <= rating;

          return (
            <button
              key={starValue}
              type="button"
              onClick={() => onChange(starValue)}
              className={[
                "text-[18px] leading-none transition",
                filled ? "text-[#B45B3C]" : "text-[#D9D9D9]",
              ].join(" ")}
              aria-label={`Оценка ${starValue}`}
            >
              ★
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Props = {
  value: ReviewsBlockData;
  onChange: (value: ReviewsBlockData) => void;
  onTitleBlur?: () => void;
  onItemBlur?: () => void;
  isSaving?: boolean;
};

export function ReviewsBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onItemBlur,
  isSaving = false,
}: Props) {
  const handleTitleChange = (fieldValue: string) => {
    onChange({ ...value, title: fieldValue });
  };

  const handleItemFieldChange = (
    id: number,
    key: keyof Omit<ReviewItem, "id">,
    fieldValue: string | number,
  ) => {
    onChange({
      ...value,
      items: value.items.map((item) =>
        item.id === id ? { ...item, [key]: fieldValue } : item,
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
        { id: nextId, author: "", text: "", rating: 5, date: "", url: "" },
      ],
    });
  };

  return (
    <AdminSectionCard title="Блок отзывы">
      <div className="space-y-4 p-4">
        <div className="max-w-[520px]">
          <AdminTextareaField
            label="Основной заголовок"
            value={value.title}
            placeholder="Инвестируй в Недвижимость с Уверенностью"
            onChange={handleTitleChange}
            onBlur={onTitleBlur}
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {value.items.map((item) => (
            <div
              key={item.id}
              className="rounded-[10px] border border-[#D9D9D9] bg-white p-4"
            >
              <div className="space-y-3">
                <AdminSmallTextField
                  label="ФИ"
                  value={item.author}
                  placeholder="Попробовать"
                  onChange={(fieldValue) =>
                    handleItemFieldChange(item.id, "author", fieldValue)
                  }
                  onBlur={onItemBlur}
                />

                <AdminTextareaField
                  label="Описание"
                  value={item.text}
                  placeholder="Отзыв (описание)"
                  onChange={(fieldValue) =>
                    handleItemFieldChange(item.id, "text", fieldValue)
                  }
                  onBlur={onItemBlur}
                />

                <RatingStars
                  value={item.rating}
                  onChange={(next) => {
                    handleItemFieldChange(item.id, "rating", next);
                    onItemBlur?.();
                  }}
                />

                <AdminSmallTextField
                  label="Дата"
                  value={item.date}
                  placeholder="12.06.2025"
                  onChange={(fieldValue) =>
                    handleItemFieldChange(item.id, "date", fieldValue)
                  }
                  onBlur={onItemBlur}
                />

                <AdminSmallTextField
                  label="Ссылка"
                  value={item.url}
                  placeholder="https://"
                  onChange={(fieldValue) =>
                    handleItemFieldChange(item.id, "url", fieldValue)
                  }
                  onBlur={onItemBlur}
                />
              </div>
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

        {isSaving ? (
          <p className="text-[13px] text-[#8D8D8D]">Сохраняем...</p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
}

