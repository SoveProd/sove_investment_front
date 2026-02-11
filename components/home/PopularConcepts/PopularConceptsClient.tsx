"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type ConceptCard = {
  id: string;
  title: string;
  subtitle: string;
  availabilityLabel: string;
  totalSlots: number;
  availableSlots: number;
  image: {
    src: string;
    alt: string;
  };
};

export type ConceptsTab = {
  key: "popular" | "ready" | (string & {});
  label: string;
  items: ConceptCard[];
};

type Props = {
  title: string;
  tabs: ConceptsTab[];
};

export default function PopularConceptsClient({ title, tabs }: Props) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key ?? "popular");

  const activeTab = useMemo(() => {
    return tabs.find((t) => t.key === activeKey) ?? tabs[0];
  }, [activeKey, tabs]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-[28px] font-medium leading-tight tracking-tight text-text sm:text-[50px]">
          {title}
        </h2>

        {/* Tabs (как на скрине: белый контейнер, тонкая обводка, активный тёмный) */}
        <div className="inline-flex w-fit items-center rounded-full border border-border bg-bg p-1">
          {tabs.map((tab) => {
            const isActive = tab.key === activeKey;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveKey(tab.key)}
                className={[
                  "h-10 rounded-full px-5 text-sm font-medium transition",
                  isActive
                    ? "bg-graphite text-white"
                    : "bg-bg text-textSecondary hover:text-text",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {activeTab.items.map((card) => (
          <ConceptCardView key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

function ConceptCardView({ card }: { card: ConceptCard }) {
  const bookedSlots = Math.max(0, card.totalSlots - card.availableSlots);

  return (
    <article className="w-full">
      {/* Image */}
      <div className="relative overflow-hidden rounded-[35px]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </div>

      {/* Text */}
      <div className="mt-5">
        <h3 className="text-[18px] font-semibold tracking-wide text-text sm:text-[20px]">
          {card.title}
        </h3>

        <p className="mt-1 text-[13px] leading-relaxed text-textSecondary sm:text-[14px]">
          {card.subtitle}
        </p>

        <p className="mt-3 text-[12px] text-textSecondary">
          {card.availabilityLabel}
        </p>

        {/* Slots bar (как на скрине: много “пилюль”, заполненные акцентом) */}
        <SlotsBar total={card.totalSlots} filled={bookedSlots} />
      </div>

      {/* Buttons (как на скрине: левая тёмная, правая белая с обводкой) */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <button
          type="button"
          className="h-12 rounded-full bg-graphite text-[14px] font-medium text-white transition hover:opacity-95"
        >
          Забронировать слот
        </button>

        <button
          type="button"
          className="h-12 rounded-full border border-graphite bg-bg text-[14px] font-medium text-graphite transition hover:bg-surfaceAlt"
        >
          Подробнее
        </button>
      </div>
    </article>
  );
}

function SlotsBar({ total, filled }: { total: number; filled: number }) {
  const safeTotal = Math.max(1, total);
  const safeFilled = Math.min(Math.max(0, filled), safeTotal);

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const isFilled = idx < safeFilled;

        return (
          <span
            key={idx}
            className={[
              "h-[10px] w-[44px] rounded-full",
              isFilled ? "bg-primary" : "bg-surfaceAlt",
            ].join(" ")}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
