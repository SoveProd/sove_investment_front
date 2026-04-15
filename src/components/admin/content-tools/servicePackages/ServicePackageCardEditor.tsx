"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type { ServicePackageCardData } from "@/app/(admin)/admin/content-tools/service-packages/types";

type Props = {
  title: string;
  value: ServicePackageCardData;
  onChange: (value: ServicePackageCardData) => void;
  onBlur?: () => void;
  onLeftImageUpload?: (file: File) => void | Promise<void>;
  onLeftImageRemove?: () => void | Promise<void>;
  onRightImageUpload?: (file: File) => void | Promise<void>;
  onRightImageRemove?: () => void | Promise<void>;
  onPopupDocUpload?: (file: File) => void | Promise<void>;
  onPopupDocRemove?: () => void | Promise<void>;
  isSaving?: boolean;
};

export function ServicePackageCardEditor({
  title,
  value,
  onChange,
  onBlur,
  onLeftImageUpload,
  onLeftImageRemove,
  onRightImageUpload,
  onRightImageRemove,
  onPopupDocUpload,
  onPopupDocRemove,
  isSaving = false,
}: Props) {
  return (
    <AdminSectionCard title={title}>
      <div className="grid gap-4 xl:grid-cols-2">
        <AdminTextareaField
          label="Название"
          value={value.title}
          onChange={(fieldValue) => onChange({ ...value, title: fieldValue })}
          onBlur={onBlur}
        />

        <AdminTextareaField
          label="Описание краткое"
          value={value.description}
          onChange={(fieldValue) =>
            onChange({ ...value, description: fieldValue })
          }
          onBlur={onBlur}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        <AdminSmallTextField
          label="Бюджет"
          value={value.budget}
          onChange={(fieldValue) => onChange({ ...value, budget: fieldValue })}
          onBlur={onBlur}
        />
        <AdminSmallTextField
          label="Стоимость за м²"
          value={value.pricePerM2}
          onChange={(fieldValue) =>
            onChange({ ...value, pricePerM2: fieldValue })
          }
          onBlur={onBlur}
        />
        <AdminSmallTextField
          label="Сроки реализации"
          value={value.timeline}
          onChange={(fieldValue) =>
            onChange({ ...value, timeline: fieldValue })
          }
          onBlur={onBlur}
        />
        <AdminSmallTextField
          label="ROI"
          value={value.roi}
          onChange={(fieldValue) => onChange({ ...value, roi: fieldValue })}
          onBlur={onBlur}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <AdminTextareaField
          label="Что включено (каждый пункт с новой строки)"
          value={value.included}
          onChange={(fieldValue) =>
            onChange({ ...value, included: fieldValue })
          }
          onBlur={onBlur}
        />

        <AdminTextareaField
          label="Доп. услуги за доп. плату (каждый пункт с новой строки)"
          value={value.extraServices}
          onChange={(fieldValue) =>
            onChange({ ...value, extraServices: fieldValue })
          }
          onBlur={onBlur}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <AdminMediaField
          label="Картинка слева"
          fileName={value.imageLeftFileName}
          preview={value.imageLeftPreview}
          accept="image/*"
          onUpload={onLeftImageUpload}
          onRemove={onLeftImageRemove}
        />
        <AdminMediaField
          label="Картинка справа"
          fileName={value.imageRightFileName}
          preview={value.imageRightPreview}
          accept="image/*"
          onUpload={onRightImageUpload}
          onRemove={onRightImageRemove}
        />
        <AdminMediaField
          label="Документ для попап (pdf/doc)"
          fileName={value.popupDocumentFileName}
          preview={value.popupDocumentPreview}
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onUpload={onPopupDocUpload}
          onRemove={onPopupDocRemove}
        />
      </div>

      {isSaving ? (
        <p className="mt-3 text-[13px] text-adminMuted">Сохраняем...</p>
      ) : null}
    </AdminSectionCard>
  );
}

