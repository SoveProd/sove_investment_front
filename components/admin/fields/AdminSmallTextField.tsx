"use client";

import { Pencil } from "lucide-react";

type AdminSmallTextFieldProps = {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void; // 👈 ДОБАВИЛИ
  type?: "text" | "number";
};

export function AdminSmallTextField({
  label,
  value,
  placeholder,
  onChange,
  onBlur, // 👈 ДОБАВИЛИ
  type = "text",
}: AdminSmallTextFieldProps) {
  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-[14px] leading-[1.2] text-[#8D8D8D]">
          {label}
        </label>
      ) : null}

      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur} 
          placeholder={placeholder}
          className="h-[60px] w-full rounded-[10px] border border-[#D9D9D9] bg-white px-4 pr-10 text-[14px] text-[#383838] outline-none transition placeholder:text-[#D3D3D3] focus:border-[#B45B3C]"
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#B45B3C]">
          <Pencil size={16} strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}
