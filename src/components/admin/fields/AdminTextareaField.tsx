"use client";

import { Pencil } from "lucide-react";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export function AdminTextareaField({
  label,
  value,
  placeholder,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-[14px] text-adminMuted">{label}</label>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="h-[129px] w-full resize-none rounded-[10px] border border-adminBorder bg-surface px-4 py-3 pr-10 text-[14px] outline-none transition placeholder:text-[#CFCFCF] focus:border-adminAccent"
        />

        <div className="absolute right-3 top-3 text-adminAccent">
          <Pencil size={16} />
        </div>
      </div>
    </div>
  );
}
