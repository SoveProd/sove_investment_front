"use client";

import { AdminSectionCard } from "@/src/components/admin/ui/AdminSectionCard";
import { AdminTextareaField } from "@/src/components/admin/fields/AdminTextareaField";
import { AdminSmallTextField } from "@/src/components/admin/fields/AdminSmallTextField";
import { AdminMediaField } from "@/src/components/admin/fields/AdminMediaField";
import type {
  HowItWorksBlockData,
  HowItWorksStepItem,
} from "@/app/(admin)/admin/content-tools/home/types";

type Props = {
  value: HowItWorksBlockData;
  onChange: (value: HowItWorksBlockData) => void;
  onTitleBlur?: () => void;
  onSubtitleBlur?: () => void;
  onStepBlur?: () => void;
  onMediaUpload?: (id: number, file: File) => void | Promise<void>;
  onMediaRemove?: (id: number) => void | Promise<void>;
  isSaving?: boolean;
};

export function HowItWorksBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onSubtitleBlur,
  onStepBlur,
  onMediaUpload,
  onMediaRemove,
  isSaving = false,
}: Props) {
  const handleTopFieldChange = (key: "title" | "subtitle", fieldValue: string) => {
    onChange({
      ...value,
      [key]: fieldValue,
    });
  };

  const handleStepFieldChange = (
    id: number,
    key: "stepLabel" | "title" | "shortDescription" | "buttonLabel",
    fieldValue: string,
  ) => {
    onChange({
      ...value,
      steps: value.steps.map((step) =>
        step.id === id ? { ...step, [key]: fieldValue } : step,
      ),
    });
  };

  const handleStepFileChange = async (id: number, file: File) => {
    onChange({
      ...value,
      steps: value.steps.map((step) =>
        step.id === id
          ? {
              ...step,
              fileName: file.name,
              preview: URL.createObjectURL(file),
            }
          : step,
      ),
    });

    await onMediaUpload?.(id, file);
  };

  const handleRemoveStepFile = async (id: number) => {
    onChange({
      ...value,
      steps: value.steps.map((step) =>
        step.id === id
          ? {
              ...step,
              fileName: "",
              preview: undefined,
              mediaId: undefined,
            }
          : step,
      ),
    });

    await onMediaRemove?.(id);
  };

  const handleAddStep = () => {
    const nextId =
      value.steps.length > 0 ? Math.max(...value.steps.map((s) => s.id)) + 1 : 1;

    const nextStep: HowItWorksStepItem = {
      id: nextId,
      stepLabel: `Шаг ${nextId}`,
      title: "",
      shortDescription: "",
      buttonLabel: "Попробовать",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    };

    onChange({
      ...value,
      steps: [...value.steps, nextStep],
    });
  };

  return (
    <AdminSectionCard title='Блок "Как это работает"'>
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
            label="Подзаголовок"
            value={value.subtitle}
            placeholder="SOVE — это полный сервис управления real estate инвестициями. Мы берём на себя:"
            onChange={(fieldValue) => handleTopFieldChange("subtitle", fieldValue)}
            onBlur={onSubtitleBlur}
          />
        </div>

        <div className="rounded-[10px] border border-[#D9D9D9] bg-white p-4">
          <div className="max-h-[520px] space-y-6 overflow-y-auto pr-2">
            {value.steps.map((step) => (
              <div key={step.id} className="space-y-2">
                <div className="text-[14px] leading-[1.2] text-[#8D8D8D]">
                  Шаг {step.id}
                </div>

                <div className="grid gap-4 xl:grid-cols-5">
                  <AdminSmallTextField
                    label="Шаг"
                    value={step.stepLabel}
                    placeholder="Оставить заявку"
                    onChange={(fieldValue) =>
                      handleStepFieldChange(step.id, "stepLabel", fieldValue)
                    }
                    onBlur={onStepBlur}
                  />

                  <AdminTextareaField
                    label="Заголовок"
                    value={step.title}
                    placeholder="Найди свой путь вперед с SOVE"
                    onChange={(fieldValue) =>
                      handleStepFieldChange(step.id, "title", fieldValue)
                    }
                    onBlur={onStepBlur}
                  />

                  <AdminTextareaField
                    label="Описание краткое"
                    value={step.shortDescription}
                    placeholder='"SOVE — это полный сервис управления real estate инвестициями."'
                    onChange={(fieldValue) =>
                      handleStepFieldChange(step.id, "shortDescription", fieldValue)
                    }
                    onBlur={onStepBlur}
                  />

                  <AdminSmallTextField
                    label="Кнопка"
                    value={step.buttonLabel}
                    placeholder="Попробовать"
                    onChange={(fieldValue) =>
                      handleStepFieldChange(step.id, "buttonLabel", fieldValue)
                    }
                    onBlur={onStepBlur}
                  />

                  <AdminMediaField
                    label="Фото"
                    fileName={step.fileName}
                    preview={step.preview}
                    onUpload={(file) => handleStepFileChange(step.id, file)}
                    onRemove={() => handleRemoveStepFile(step.id)}
                    compact
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddStep}
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

