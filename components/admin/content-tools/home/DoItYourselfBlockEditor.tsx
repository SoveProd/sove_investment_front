"use client";

import { RepeatableFeatureBlockEditor } from "./RepeatableFeatureBlockEditor";
import type { RepeatableFeatureBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type DoItYourselfBlockEditorProps = {
  value: RepeatableFeatureBlockData;
  onChange: (value: RepeatableFeatureBlockData) => void;
};

export function DoItYourselfBlockEditor({
  value,
  onChange,
}: DoItYourselfBlockEditorProps) {
  return (
    <RepeatableFeatureBlockEditor
      sectionTitle='Блок "сделай сам"'
      value={value}
      onChange={onChange}
      topTitleLabel="Основной заголовок"
      topDescriptionLabel="Описание краткое"
      topButtonLabel="Кнопка"
      topTitlePlaceholder="Или попробуй сам"
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
