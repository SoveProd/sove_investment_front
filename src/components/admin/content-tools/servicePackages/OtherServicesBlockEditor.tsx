"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type { OtherServicesBlockData } from "@/app/(admin)/admin/content-tools/service-packages/types";

type Props = {
  value: OtherServicesBlockData;
  onChange: (value: OtherServicesBlockData) => void;
  onBlur?: () => void;
  onMediaUpload?: (file: File) => void | Promise<void>;
  onMediaRemove?: () => void | Promise<void>;
  isSaving?: boolean;
};

export function OtherServicesBlockEditor({
  value,
  onChange,
  onBlur,
  onMediaUpload,
  onMediaRemove,
  isSaving = false,
}: Props) {
  return (
    <AdminSectionCard title='Блок "Другие наши услуги"'>
      <div className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
          <AdminTextareaField
            label="Заголовок"
            value={value.title}
            onChange={(fieldValue) => onChange({ ...value, title: fieldValue })}
            onBlur={onBlur}
          />

          <div className="pt-[30px]">
            <AdminMediaField
              label="Фото"
              fileName={value.fileName}
              preview={value.preview}
              onUpload={onMediaUpload}
              onRemove={onMediaRemove}
              compact
              accept="image/*"
            />
          </div>
        </div>

        <div className="space-y-4">
          {value.items.map((item) => (
            <div key={item.id} className="grid gap-4 xl:grid-cols-3">
              <AdminSmallTextField
                label="Заголовок"
                value={item.title}
                onChange={(fieldValue) =>
                  onChange({
                    ...value,
                    items: value.items.map((x) =>
                      x.id === item.id ? { ...x, title: fieldValue } : x,
                    ),
                  })
                }
                onBlur={onBlur}
              />

              <AdminSmallTextField
                label="Подзаголовок"
                value={item.subtitle}
                onChange={(fieldValue) =>
                  onChange({
                    ...value,
                    items: value.items.map((x) =>
                      x.id === item.id ? { ...x, subtitle: fieldValue } : x,
                    ),
                  })
                }
                onBlur={onBlur}
              />

              <div className="grid gap-2">
                <AdminSmallTextField
                  label="Кнопка"
                  value={item.buttonLabel}
                  onChange={(fieldValue) =>
                    onChange({
                      ...value,
                      items: value.items.map((x) =>
                        x.id === item.id
                          ? { ...x, buttonLabel: fieldValue }
                          : x,
                      ),
                    })
                  }
                  onBlur={onBlur}
                />

                <AdminSmallTextField
                  label="Ссылка (href)"
                  value={item.href}
                  placeholder="/"
                  onChange={(fieldValue) =>
                    onChange({
                      ...value,
                      items: value.items.map((x) =>
                        x.id === item.id ? { ...x, href: fieldValue } : x,
                      ),
                    })
                  }
                  onBlur={onBlur}
                />
              </div>
            </div>
          ))}
        </div>

        {isSaving ? (
          <p className="text-[13px] text-adminMuted">Сохраняем...</p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
}

