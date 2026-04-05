"use client";

import Image from "next/image";
import { Ellipsis, Upload } from "lucide-react";
import clsx from "clsx";

type Props = {
  label?: string;
  fileName?: string;
  preview?: string;
  onUpload?: () => void;
  onRemove?: () => void;
  compact?: boolean;
};

export function AdminMediaField({
  label,
  fileName,
  preview,
  onUpload,
  onRemove,
  compact = false,
}: Props) {
  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-[14px] leading-[1.2] text-[#8D8D8D]">
          {label}
        </label>
      ) : null}

      <div
        className={clsx(
          "flex items-center justify-between rounded-[10px] border border-[#D9D9D9] bg-white",
          compact ? "h-[60px] px-3" : "h-[60px] px-3",
        )}
      >
        <div className="flex min-w-0 items-center gap-3 overflow-hidden">
          <div
            className={clsx(
              "relative shrink-0 overflow-hidden rounded-[4px] bg-[#E7E7E7]",
              compact ? "h-8 w-8" : "h-9 w-9",
            )}
          >
            {preview ? (
              <Image src={preview} alt="" fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Upload size={14} className="text-[#8D8D8D]" />
              </div>
            )}
          </div>

          <span className="truncate whitespace-nowrap text-[14px] text-[#383838]">
            {fileName || "Файл не выбран"}
          </span>
        </div>

        <div className="ml-3 flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onUpload}
            className="text-[#B45B3C] transition hover:opacity-80"
            aria-label="Загрузить файл"
          >
            <Upload size={16} />
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B45B3C] text-white transition hover:opacity-90"
            aria-label="Удалить файл"
          >
            <Ellipsis size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
