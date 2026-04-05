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
  const [activeSlide, setActiveSlide] = useState(0);

  const activeTab = useMemo(() => {
    return tabs.find((t) => t.key === activeKey) ?? tabs[0];
  }, [activeKey, tabs]);

  const items = activeTab?.items ?? [];
  const currentCard = items[activeSlide] ?? items[0];

  const handleChangeTab = (key: ConceptsTab["key"]) => {
    setActiveKey(key);
    setActiveSlide(0);
  };

  const handlePrev = () => {
    if (!items.length) return;
    setActiveSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!items.length) return;
    setActiveSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* MOBILE */}
      <div className="lg:hidden">
        <h2 className="text-[24px] font-medium leading-[1.1] tracking-tight text-text">
          {title}
        </h2>

        <div className="mt-5 flex flex-col gap-3">
          {tabs.map((tab) => {
            const isActive = tab.key === activeKey;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleChangeTab(tab.key)}
                className={[
                  "h-[50px] rounded-full border text-[14px] font-medium transition",
                  isActive
                    ? "border-graphite bg-graphite text-white"
                    : "border-graphite bg-transparent text-graphite",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {currentCard && (
          <MobileConceptCard
            card={currentCard}
            totalSlides={items.length}
            activeSlide={activeSlide}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-[28px] font-medium leading-tight tracking-tight text-text sm:text-[50px]">
            {title}
          </h2>

          <div className="inline-flex w-fit items-center rounded-full border border-border bg-bg p-1 gap-4">
            {tabs.map((tab) => {
              const isActive = tab.key === activeKey;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleChangeTab(tab.key)}
                  className={[
                    "h-10 rounded-full px-10 text-sm font-medium transition",
                    isActive
                      ? "bg-graphite text-white"
                      : "bg-bg border text-textSecondary hover:text-text",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {activeTab.items.map((card) => (
            <ConceptCardView key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileConceptCard({
  card,
  totalSlides,
  activeSlide,
  onPrev,
  onNext,
}: {
  card: ConceptCard;
  totalSlides: number;
  activeSlide: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const bookedSlots = Math.max(0, card.totalSlots - card.availableSlots);

  return (
    <article className="mt-6 w-full">
      {/* image */}
      <div className="relative overflow-hidden rounded-[24px]">
        <div className="relative aspect-[335/254] w-full">
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <button
          type="button"
          onClick={onPrev}
          aria-label="Предыдущий слайд"
          className="absolute left-4 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90"
        >
          <span className="text-[16px] text-[#A9A9A9]">←</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Следующий слайд"
          className="absolute right-4 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90"
        >
          <span className="text-[16px] text-[#A9A9A9]">→</span>
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const isActive = idx === activeSlide;

            return (
              <span
                key={idx}
                className={[
                  "h-2 w-2 rounded-full",
                  isActive ? "bg-white" : "bg-white/55",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      {/* text */}
      <div className="mt-4">
        <h3 className="text-[16px] font-semibold uppercase tracking-[0.02em] text-text">
          {card.title}
        </h3>

        <p className="mt-2 text-[13px] leading-[1.35] text-textSecondary">
          {card.subtitle}
        </p>

        <p className="mt-3 text-[13px] text-textSecondary">
          {card.availabilityLabel}
        </p>

        <SlotsBarMobile total={card.totalSlots} filled={bookedSlots} />
      </div>

      {/* main button */}
      <button
        type="button"
        className="mt-5 h-[52px] w-full rounded-full bg-graphite text-[15px] font-medium text-white transition hover:opacity-95"
      >
        Забронировать слот
      </button>

      {/* bottom nav */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Назад"
          className="flex h-[24px] w-[64px] items-center justify-center rounded-full bg-[#3F3F3F]"
        >
          <span className="text-[16px] text-white">←</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Вперёд"
          className="flex h-[24px] w-[64px] items-center justify-center rounded-full bg-[#F1F1F1]"
        >
          <span className="text-[16px] text-[#D6D6D6]">→</span>
        </button>
      </div>
    </article>
  );
}

function ConceptCardView({ card }: { card: ConceptCard }) {
  const bookedSlots = Math.max(0, card.totalSlots - card.availableSlots);

  return (
    <article className="w-full">
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

      <div className="mt-5">
        <h3 className="text-[18px] font-semibold tracking-wide text-text sm:text-[33px]">
          {card.title}
        </h3>

        <p className="mt-1 text-[13px] leading-relaxed text-textSecondary sm:text-[21px]">
          {card.subtitle}
        </p>

        <p className="mt-3 text-[18px] text-textSecondary">
          {card.availabilityLabel}
        </p>

        <SlotsBar total={card.totalSlots} filled={bookedSlots} />
      </div>

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
    <div className="mt-3 flex w-full gap-2">
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const isFilled = idx < safeFilled;

        return (
          <span
            key={idx}
            className={[
              "h-[19px] flex-1 rounded-full transition-colors",
              isFilled ? "bg-primary" : "bg-slotFill border border-[#D8D8D8]",
            ].join(" ")}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

function SlotsBarMobile({ total, filled }: { total: number; filled: number }) {
  const safeTotal = Math.max(1, total);
  const safeFilled = Math.min(Math.max(0, filled), safeTotal);

  return (
    <div className="mt-3 flex w-full gap-[4px]">
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const isFilled = idx < safeFilled;

        return (
          <span
            key={idx}
            className={[
              "h-[8px] flex-1 rounded-full",
              isFilled ? "bg-primary" : "border border-[#D8D8D8] bg-slotFill",
            ].join(" ")}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
