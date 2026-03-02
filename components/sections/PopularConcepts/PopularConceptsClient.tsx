"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

export type PopularConcept = {
  id: string;
  title: string;
  description: string;
  forWho: string;
  budgetPerM2: string;
  totalSlots: number;
  availableSlots: number;
  style: string;
  drop: string;
  image: { src: string; alt: string };
  bookingHref: string;
  detailsHref: string;
};

type Props = {
  title: string;
  items: PopularConcept[];
};

const UI = {
  filters: {
    styleAllLabel: "Стилистика",
    dropAllLabel: "Дроппы",
  },
  buttons: {
    book: "Забронировать слот",
    details: "Подробнее",
    soldOut: "Sold out",
  },
  tokens: {
    accent: "var(--color-accent, #9B5A45)",
    segmentInactive: "rgba(0,0,0,0.10)",
    title: "#1f1f1f",
  },
};

type Option = { value: string; label: string };

function makeOptions(values: string[], allLabel: string): Option[] {
  const uniq = Array.from(new Set(values));
  return [
    { value: "all", label: allLabel },
    ...uniq.map((v) => ({ value: v, label: v })),
  ];
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function PopularConceptsClient({ title, items }: Props) {
  const styleOptions = useMemo(
    () => makeOptions(items.map((i) => i.style), UI.filters.styleAllLabel),
    [items]
  );
  const dropOptions = useMemo(
    () => makeOptions(items.map((i) => i.drop), UI.filters.dropAllLabel),
    [items]
  );

  const [style, setStyle] = useState<string>("all");
  const [drop, setDrop] = useState<string>("all");

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const okStyle = style === "all" ? true : i.style === style;
      const okDrop = drop === "all" ? true : i.drop === drop;
      return okStyle && okDrop;
    });
  }, [items, style, drop]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2
          className="text-[28px] font-medium leading-tight sm:text-[32px]"
          style={{ color: UI.tokens.title }}
        >
          {title}
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Select
            value={style}
            onChange={setStyle}
            options={styleOptions}
            ariaLabel="Filter by style"
          />
          <Select
            value={drop}
            onChange={setDrop}
            options={dropOptions}
            ariaLabel="Filter by drop"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {filtered.map((item) => (
          <ConceptCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  ariaLabel: string;
}) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "h-[34px] min-w-[150px] appearance-none rounded-full border border-black/20 bg-white",
          "px-4 pr-10 text-[13px] text-[#1f1f1f] outline-none",
          "focus:border-black/40"
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

function ConceptCard({ item }: { item: PopularConcept }) {
  const total = Math.max(1, item.totalSlots);
  const available = clamp(item.availableSlots, 0, total);

  const filledSegments = available; // если нужно наоборот (занято) — поменяем
  const soldOut = available === 0;

  return (
    <article className="w-full">
      <div className="relative overflow-hidden rounded-[22px]">
        <div className="relative aspect-[16/7] w-full">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 720px"
            priority={false}
          />
        </div>

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[12px] text-[#1f1f1f]">
            {item.drop}
          </span>
        </div>
      </div>

      <h3 className="mt-5 text-[18px] font-semibold tracking-wide text-[#1f1f1f]">
        {item.title}
      </h3>

      <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-black/60">
        {item.description}
      </p>

      <div className="mt-4 space-y-2 text-[13px] text-black/70">
        <div>
          <span className="font-semibold text-[#1f1f1f]">Для кого:</span>{" "}
          {item.forWho}
        </div>
        <div>
          <span className="font-semibold text-[#1f1f1f]">
            Ориентировочный бюджет за м²:
          </span>{" "}
          {item.budgetPerM2}
        </div>
      </div>

      <div className="mt-4 text-[12px] text-black/45">
        Доступно {available}/{total} слотов
      </div>

      <SegmentBar total={total} filled={filledSegments} />

      {/* ✅ ВСЕ КНОПКИ ТЕПЕРЬ ОДИНАКОВО: ТОЛЬКО Button */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        {soldOut ? (
          <Button
            variant="secondaryLight"
            size="lg"
            maxWidth={false}
            disabled
            onClick={() => {}}
            className="bg-black/10 text-black/30 border-transparent hover:bg-black/10"
          >
            {UI.buttons.soldOut}
          </Button>
        ) : (
          <Button href={item.bookingHref} variant="primary" size="lg" maxWidth={false}>
            {UI.buttons.book}
          </Button>
        )}

        <Button href={item.detailsHref} variant="secondaryLight" size="lg" maxWidth={false}>
          {UI.buttons.details}
        </Button>
      </div>
    </article>
  );
}

function SegmentBar({ total, filled }: { total: number; filled: number }) {
  const safeTotal = Math.max(1, total);
  const safeFilled = clamp(filled, 0, safeTotal);

  return (
    <div className="mt-2 flex gap-2">
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const active = idx < safeFilled;
        return (
          <span
            key={idx}
            className="h-[8px] w-full rounded-full"
            style={{
              background: active ? UI.tokens.accent : UI.tokens.segmentInactive,
            }}
          />
        );
      })}
    </div>
  );
}