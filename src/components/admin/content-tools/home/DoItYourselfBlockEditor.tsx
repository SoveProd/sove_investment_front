"use client";

import { RepeatableFeatureBlockEditor } from "./RepeatableFeatureBlockEditor";
import type { RepeatableFeatureBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type DoItYourselfBlockEditorProps = {
  value: RepeatableFeatureBlockData;
  onChange: (value: RepeatableFeatureBlockData) => void;
  onTitleBlur?: () => void;
  onDescriptionBlur?: () => void;
  onButtonBlur?: () => void;
  onItemTextBlur?: () => void;
  onMediaUpload?: (id: number, file: File) => void | Promise<void>;
  onMediaRemove?: (id: number) => void | Promise<void>;
  isSaving?: boolean;
};

export function DoItYourselfBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onDescriptionBlur,
  onButtonBlur,
  onItemTextBlur,
  onMediaUpload,
  onMediaRemove,
  isSaving = false,
}: DoItYourselfBlockEditorProps) {
  return (
    <RepeatableFeatureBlockEditor
      sectionTitle='Блок "сделай сам"'
      value={value}
      onChange={onChange}
      onTitleBlur={onTitleBlur}
      onDescriptionBlur={onDescriptionBlur}
      onButtonBlur={onButtonBlur}
      onItemTextBlur={onItemTextBlur}
      onMediaUpload={onMediaUpload}
      onMediaRemove={onMediaRemove}
      isSaving={isSaving}
      topTitleLabel="Основной заголовок"
      topDescriptionLabel="Текст"
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
