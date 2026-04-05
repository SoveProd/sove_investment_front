"use client";

import { MediaListBlockEditor } from "./MediaListBlockEditor";
import type { MediaListBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type WeTakeCareBlockEditorProps = {
  value: MediaListBlockData;
  onChange: (value: MediaListBlockData) => void;
};

export function WeTakeCareBlockEditor({
  value,
  onChange,
}: WeTakeCareBlockEditorProps) {
  return (
    <MediaListBlockEditor
      sectionTitle='Блок "мы берем на себя"'
      value={value}
      onChange={onChange}
      topTitleLabel="Основной заголовок"
      topDescriptionLabel="Описание краткое"
      topTitlePlaceholder="Инвестируй в недвижимость с уверенностью"
      topDescriptionPlaceholder='"SOVE — это полный сервис управления real estate инвестициями. Мы берём на себя."'
      itemMediaLabel="Фото"
      addButtonText="Добавить"
      newItemFileName="Фото.jpeg"
    />
  );
}
