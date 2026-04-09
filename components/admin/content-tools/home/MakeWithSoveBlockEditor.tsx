"use client";

import { RepeatableFeatureBlockEditor } from "@/components/admin/content-tools/home/RepeatableFeatureBlockEditor";
import type { RepeatableFeatureBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type MakeWithSoveBlockEditorProps = {
  value: RepeatableFeatureBlockData;
  onChange: (value: RepeatableFeatureBlockData) => void;
  onTitleBlur?: () => void;
  onDescriptionBlur?: () => void;
  onButtonBlur?: () => void;
  isSaving?: boolean;
};

export function MakeWithSoveBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onDescriptionBlur,
  onButtonBlur,
  isSaving = false,
}: MakeWithSoveBlockEditorProps) {
  return (
    <RepeatableFeatureBlockEditor
      sectionTitle='Блок "сделай с SOVE"'
      value={value}
      onChange={onChange}
      onTitleBlur={onTitleBlur}
      onDescriptionBlur={onDescriptionBlur}
      onButtonBlur={onButtonBlur}
      isSaving={isSaving}
      topTitleLabel="Основной заголовок"
      topDescriptionLabel="Описание краткое"
      topButtonLabel="Кнопка"
      topTitlePlaceholder="Найди свой путь вперед с SOVE"
      topDescriptionPlaceholder='"SOVE — это полный сервис управления real estate инвестициями."'
      topButtonPlaceholder="Попробовать"
      itemMediaLabel="Фото"
      itemTextLabel="Описание краткое"
      itemTextPlaceholder="SOVE"
      addButtonText="Добавить"
      newItemFileName="Фото.jpeg"
      newItemText="SOVE"
    />
  );
}
