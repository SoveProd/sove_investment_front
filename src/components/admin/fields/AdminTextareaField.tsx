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
      {/* Label */}
      <label className="text-[14px] text-textMuted">{label}</label>

      {/* Field */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="
            h-[129px] w-full resize-none
            rounded-[10px]
            border border-borderLight
            bg-surface
            px-4 py-3 pr-10
            text-[14px] text-textMuted
            outline-none transition

            placeholder:text-textPlaceholder

            focus:border-adminAccent
          "
        />

        {/* Icon */}
        <div className="pointer-events-none absolute right-3 top-3 text-adminAccent">
          <Pencil size={16} />
        </div>
      </div>
    </div>
  );
}
