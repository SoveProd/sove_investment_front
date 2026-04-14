"use client";

import { useId, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { Ellipsis, Upload } from "lucide-react";
import clsx from "clsx";

type Props = {
  label?: string;
  fileName?: string;
  preview?: string;
  onUpload?: (file: File) => void | Promise<void>;
  onRemove?: () => void;
  compact?: boolean;
  accept?: string;
};

function isRenderablePreview(preview?: string) {
  if (!preview) return false;

  if (preview.startsWith("/")) return true;

  try {
    const url = new URL(preview);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function AdminMediaField({
  label,
  fileName,
  preview,
  onUpload,
  onRemove,
  compact = false,
  accept,
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleUploadClick() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file && onUpload) {
      onUpload(file);
    }

    event.target.value = "";
  }

  const hasPreview = isRenderablePreview(preview);

  return (
    <div className="space-y-2">
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-[14px] leading-[1.2] text-textSecondary"
        >
          {label}
        </label>
      ) : null}

      <div
        className={clsx(
          "flex items-center justify-between rounded-[10px] border border-borderSoft bg-surface px-3",
          compact ? "h-[60px]" : "h-[60px]",
        )}
      >
        <div className="flex min-w-0 items-center gap-3 overflow-hidden">
          <div
            className={clsx(
              "relative shrink-0 overflow-hidden rounded-[4px] bg-border",
              compact ? "h-8 w-8" : "h-9 w-9",
            )}
          >
            {hasPreview ? (
              <Image
                src={preview as string}
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Upload size={14} className="text-textSecondary" />
              </div>
            )}
          </div>

          <span className="truncate whitespace-nowrap text-[14px] text-graphite">
            {fileName || "Файл не выбран"}
          </span>
        </div>

        <div className="ml-3 flex shrink-0 items-center gap-2">
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleUploadClick}
            className="text-primary transition hover:text-primaryHover"
            aria-label="Загрузить файл"
          >
            <Upload size={16} />
          </button>

          <button
            type="button"
            onClick={onRemove}
            disabled={!onRemove}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Удалить файл"
          >
            <Ellipsis size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
