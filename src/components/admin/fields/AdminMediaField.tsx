"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!isMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (menuRef.current && !menuRef.current.contains(t)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [isMenuOpen]);

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

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primaryHover"
              aria-label="Действия с файлом"
            >
              <Ellipsis size={14} />
            </button>

            {isMenuOpen ? (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[180px] overflow-hidden rounded-[12px] border border-borderSoft bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleUploadClick();
                  }}
                  className="block w-full px-3 py-2 text-left text-[13px] text-graphite hover:bg-bg"
                >
                  Загрузить новое
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onRemove?.();
                  }}
                  disabled={!onRemove}
                  className="block w-full px-3 py-2 text-left text-[13px] text-red-600 hover:bg-bg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Удалить
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
