"use client";

import { CheckboxOptionsBlockEditor } from "./CheckboxOptionsBlockEditor";
import type { CheckboxOptionsBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type ReadyProjectsBlockEditorProps = {
  value: CheckboxOptionsBlockData;
  onChange: (value: CheckboxOptionsBlockData) => void;
};

export function ReadyProjectsBlockEditor({
  value,
  onChange,
}: ReadyProjectsBlockEditorProps) {
  return (
    <CheckboxOptionsBlockEditor
      sectionTitle='Блок "готовые проекты"'
      value={value}
      onChange={onChange}
    />
  );
}
