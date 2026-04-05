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
    () =>
      makeOptions(
        items.map((i) => i.style),
        UI.filters.styleAllLabel,
      ),
    [items],
  );

  const dropOptions = useMemo(
    () =>
      makeOptions(
        items.map((i) => i.drop),
        UI.filters.dropAllLabel,
      ),
    [items],
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
      {/* MOBILE */}
      <div className="lg:hidden">
        <h2
          className="text-[24px] font-medium leading-[1.08] tracking-[-0.02em]"
          style={{ color: UI.tokens.title }}
        >
          {title}
        </h2>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Select
            value={style}
            onChange={setStyle}
            options={styleOptions}
            ariaLabel="Filter by style"
            mobile
          />
          <Select
            value={drop}
            onChange={setDrop}
            options={dropOptions}
            ariaLabel="Filter by drop"
            mobile
          />
        </div>

        <div className="mt-3 grid gap-4">
          {filtered.map((item) => (
            <MobileConceptCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            className="text-[36px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[44px]"
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

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {filtered.map((item) => (
            <DesktopConceptCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  ariaLabel,
  mobile = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  ariaLabel: string;
  mobile?: boolean;
}) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "appearance-none rounded-full border border-black/20 bg-white outline-none",
          mobile
            ? "h-[34px] w-full min-w-0 px-3 pr-8 text-[11px] text-[#1f1f1f]"
            : "h-[44px] min-w-[190px] px-5 pr-11 text-[14px] text-[#1f1f1f]",
          "focus:border-black/40",
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50">
        <svg
          width={mobile ? "14" : "16"}
          height={mobile ? "14" : "16"}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
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

function MobileConceptCard({ item }: { item: PopularConcept }) {
  const total = Math.max(1, item.totalSlots);
  const available = clamp(item.availableSlots, 0, total);
  const soldOut = available === 0;

  return (
    <article className="w-full">
      {/* image */}
      <div className="relative overflow-hidden rounded-[18px]">
        <div className="relative aspect-[343/214] w-full">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>

        {/* pills */}
        <div className="absolute left-2 top-2">
          <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[9px] font-medium text-[#6b6b6b] shadow-sm">
            {item.drop}
          </span>
        </div>

        <div className="absolute right-2 top-2">
          <span className="inline-flex items-center rounded-full bg-white/30 px-2.5 py-1 text-[9px] font-medium text-white backdrop-blur-sm">
            {item.style}
          </span>
        </div>

        {/* arrows like on mock */}
        <button
          type="button"
          aria-label="Предыдущая"
          className="absolute left-2 top-1/2 z-10 grid h-[26px] w-[26px] -translate-y-1/2 place-items-center rounded-full bg-white/90"
        >
          <span className="text-[13px] leading-none text-[#B5B5B5]">←</span>
        </button>

        <button
          type="button"
          aria-label="Следующая"
          className="absolute right-2 top-1/2 z-10 grid h-[26px] w-[26px] -translate-y-1/2 place-items-center rounded-full bg-white/90"
        >
          <span className="text-[13px] leading-none text-[#B5B5B5]">→</span>
        </button>
      </div>

      {/* text */}
      <h3 className="mt-2 text-[16px] font-semibold leading-[1.1] tracking-[0.04em] text-[#1f1f1f]">
        {item.title}
      </h3>

      <p className="mt-1.5 text-[10px] leading-[1.35] text-black/65">
        {item.description}
      </p>

      <div className="mt-2 space-y-1 text-[10px] leading-[1.3] text-black/70">
        <div>
          <span className="font-semibold text-[#1f1f1f]">Для кого:</span>{" "}
          {item.forWho}
        </div>
        <div>
          <span className="font-semibold text-[#1f1f1f]">
            Ориентировочный бюджет за м2 ~
          </span>{" "}
          {item.budgetPerM2}
        </div>
      </div>

      <div className="mt-2 text-[10px] text-black/45">
        Доступно {available}/{total} слотов
      </div>

      <SegmentBarMobile total={total} filled={available} />

      <div className="mt-3">
        {soldOut ? (
          <Button
            variant="secondaryLight"
            size="lg"
            maxWidth={false}
            disabled
            onClick={() => {}}
            className="h-[34px] w-full rounded-full border-transparent bg-black/10 text-[11px] text-black/35 hover:bg-black/10"
          >
            {UI.buttons.soldOut}
          </Button>
        ) : (
          <Button
            href={item.bookingHref}
            variant="primary"
            size="lg"
            maxWidth={false}
            className="h-[34px] w-full rounded-full bg-[#2F2F2F] text-[11px] hover:bg-[#1f1f1f]"
          >
            {UI.buttons.book}
          </Button>
        )}
      </div>
    </article>
  );
}

function DesktopConceptCard({ item }: { item: PopularConcept }) {
  const total = Math.max(1, item.totalSlots);
  const available = clamp(item.availableSlots, 0, total);
  const soldOut = available === 0;

  return (
    <article className="w-full">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px]">
        <div className="relative aspect-[16/9] w-full">
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
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[12px] text-[#1f1f1f] shadow-sm">
            {item.drop}
          </span>
        </div>
      </div>

      <h3 className="mt-6 text-[22px] font-semibold tracking-[0.06em] text-[#1f1f1f]">
        {item.title}
      </h3>

      <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-black/60">
        {item.description}
      </p>

      <div className="mt-4 space-y-2 text-[14px] text-black/70">
        <div>
          <span className="font-semibold text-[#1f1f1f]">Для кого:</span>{" "}
          {item.forWho}
        </div>
        <div>
          <span className="font-semibold text-[#1f1f1f]">
            Ориентировочный бюджет за м2 ~
          </span>{" "}
          {item.budgetPerM2}
        </div>
      </div>

      <div className="mt-5 text-[13px] text-black/45">
        Доступно {available}/{total} слотов
      </div>

      <SegmentBar total={total} filled={available} />

      <div className="mt-6 grid grid-cols-2 gap-4">
        {soldOut ? (
          <Button
            variant="secondaryLight"
            size="lg"
            maxWidth={false}
            disabled
            onClick={() => {}}
            className="border-transparent bg-black/10 text-black/35 hover:bg-black/10"
          >
            {UI.buttons.soldOut}
          </Button>
        ) : (
          <Button
            href={item.bookingHref}
            variant="primary"
            size="lg"
            maxWidth={false}
            className="bg-[#2F2F2F] hover:bg-[#1f1f1f]"
          >
            {UI.buttons.book}
          </Button>
        )}

        <Button
          href={item.detailsHref}
          variant="secondaryLight"
          size="lg"
          maxWidth={false}
          className="border border-black/20 bg-white hover:bg-black/[0.03]"
        >
          {UI.buttons.details}
        </Button>
      </div>
    </article>
  );
}

function SegmentBarMobile({
  total,
  filled,
}: {
  total: number;
  filled: number;
}) {
  const safeTotal = Math.max(1, total);
  const safeFilled = clamp(filled, 0, safeTotal);

  return (
    <div className="mt-2 flex gap-[4px]">
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const active = idx < safeFilled;
        return (
          <span
            key={idx}
            className="h-[6px] w-full rounded-full"
            style={{
              background: active ? UI.tokens.accent : UI.tokens.segmentInactive,
            }}
          />
        );
      })}
    </div>
  );
}

function SegmentBar({ total, filled }: { total: number; filled: number }) {
  const safeTotal = Math.max(1, total);
  const safeFilled = clamp(filled, 0, safeTotal);

  return (
    <div className="mt-3 flex gap-2">
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const active = idx < safeFilled;
        return (
          <span
            key={idx}
            className="h-[20px] w-full rounded-full"
            style={{
              background: active ? UI.tokens.accent : UI.tokens.segmentInactive,
            }}
          />
        );
      })}
    </div>
  );
}
