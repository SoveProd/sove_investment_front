"use client";

import { CheckboxOptionsBlockEditor } from "./CheckboxOptionsBlockEditor";
import type { FeaturedSelectionBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type PopularConceptsBlockEditorProps = {
  value: FeaturedSelectionBlockData;
  onChange: (value: FeaturedSelectionBlockData) => void;
  onTitleBlur?: () => void;
  onSelectionChange?: (nextValue: FeaturedSelectionBlockData) => void;
  isSaving?: boolean;
};

export function PopularConceptsBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onSelectionChange,
  isSaving = false,
}: PopularConceptsBlockEditorProps) {
  return (
    <CheckboxOptionsBlockEditor
      sectionTitle='Блок "популярные концепции"'
      value={value}
      onChange={onChange}
      onTitleBlur={onTitleBlur}
      onSelectionChange={onSelectionChange}
      isSaving={isSaving}
    />
  );
}
