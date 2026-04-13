"use client";

import { CheckboxOptionsBlockEditor } from "./CheckboxOptionsBlockEditor";
import type { FeaturedSelectionBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type ReadyProjectsBlockEditorProps = {
  value: FeaturedSelectionBlockData;
  onChange: (value: FeaturedSelectionBlockData) => void;
  onTitleBlur?: () => void;
  onSelectionChange?: (nextValue: FeaturedSelectionBlockData) => void;
  isSaving?: boolean;
};

export function ReadyProjectsBlockEditor({
  value,
  onChange,
  onTitleBlur,
  onSelectionChange,
  isSaving = false,
}: ReadyProjectsBlockEditorProps) {
  return (
    <CheckboxOptionsBlockEditor
      sectionTitle='Блок "готовые проекты"'
      value={value}
      onChange={onChange}
      onTitleBlur={onTitleBlur}
      onSelectionChange={onSelectionChange}
      isSaving={isSaving}
    />
  );
}
