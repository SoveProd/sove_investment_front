"use client";

import { AdminSectionCard } from "@/components/admin/ui/AdminSectionCard";
import type { CheckboxOptionsBlockData } from "@/app/(admin)/admin/content-tools/home/types";

type CheckboxOptionsBlockEditorProps = {
  sectionTitle: string;
  value: CheckboxOptionsBlockData;
  onChange: (value: CheckboxOptionsBlockData) => void;
};

export function CheckboxOptionsBlockEditor({
  sectionTitle,
  value,
  onChange,
}: CheckboxOptionsBlockEditorProps) {
  const handleToggle = (id: number) => {
    onChange({
      items: value.items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    });
  };

  return (
    <AdminSectionCard title={sectionTitle}>
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {value.items.map((item) => (
          <label
            key={item.id}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleToggle(item.id)}
              className="peer sr-only"
            />

            <span
              className="
                flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px]
                border border-[#5B5B5B] bg-white transition
                peer-checked:border-[#B45B3C] peer-checked:bg-[#B45B3C]
              "
            >
              {item.checked ? (
                <svg
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 4.5L4.5 7.5L10.5 1.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </span>

            <span className="text-[20px] leading-[1.1] text-[#383838] max-xl:text-[20px]">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </AdminSectionCard>
  );
}
