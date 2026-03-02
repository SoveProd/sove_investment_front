"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  defaultOpenId?: string | null;
};

const ICON_BG = "#9B5A45"; // как на скрине: тёплый коричневый

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PackagesFaqClient({ items, defaultOpenId = null }: Props) {
  const firstId = items[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  // если items поменялись и текущего openId больше нет — закрываем
  useEffect(() => {
    if (!openId) return;
    const exists = items.some((i) => i.id === openId);
    if (!exists) setOpenId(null);
  }, [items, openId]);

  const safeOpenId = useMemo(() => {
    if (openId) return openId;
    return null;
  }, [openId]);

  return (
    <div className="w-full">
      <div className="divide-y divide-black/10 border-t border-black/10">
        {items.map((item) => (
          <FaqRow
            key={item.id}
            item={item}
            isOpen={safeOpenId === item.id}
            onToggle={() => {
              setOpenId((prev) => (prev === item.id ? null : item.id));
            }}
          />
        ))}
      </div>

      {/* если хочешь, чтобы первый был открыт по умолчанию — просто раскомментируй */}
      {/* <button onClick={() => setOpenId(firstId)} className="hidden">{firstId}</button> */}
    </div>
  );
}

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState<number>(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      // измеряем реальную высоту, чтобы анимация была плавной
      const next = el.scrollHeight;
      setMaxH(next);
    } else {
      setMaxH(0);
    }
  }, [isOpen]);

  // поддержка ресайза (если текст переносится)
  useEffect(() => {
    if (!isOpen) return;
    const el = contentRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setMaxH(el.scrollHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  const btnId = `faq-btn-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div className="py-4 sm:py-5">
      <button
        id={btnId}
        type="button"
        className="flex w-full items-center justify-between gap-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-[16px] font-medium leading-snug text-[#1f1f1f] sm:text-[18px]">
          {item.question}
        </span>

        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
          style={{ backgroundColor: ICON_BG }}
          aria-hidden="true"
        >
          <span
            className={cn(
              "relative block h-4 w-4 transition-transform duration-300 ease-out",
              isOpen && "rotate-45"
            )}
          >
            {/* плюс */}
            <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded bg-white" />
            <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded bg-white" />
          </span>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="overflow-hidden"
        style={{
          maxHeight: maxH,
          transition: "max-height 350ms ease",
        }}
      >
        <div ref={contentRef} className="pt-3 pr-14">
          <p className="text-[14px] leading-relaxed text-black/70 sm:text-[15px]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}