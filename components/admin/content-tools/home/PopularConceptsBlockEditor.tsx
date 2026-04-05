"use client";

import { CheckboxOptionsBlockEditor } from "./CheckboxOptionsBlockEditor";
import type { CheckboxOptionsBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type PopularConceptsBlockEditorProps = {
  value: CheckboxOptionsBlockData;
  onChange: (value: CheckboxOptionsBlockData) => void;
};

export function PopularConceptsBlockEditor({
  value,
  onChange,
}: PopularConceptsBlockEditorProps) {
  return (
    <CheckboxOptionsBlockEditor
      sectionTitle='Блок "популярные концепции"'
      value={value}
      onChange={onChange}
    />
  );
}
