"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { Container } from "@/components/layout/Container";
import { MATERIALS_TABS } from "./data";
import type { MaterialsTabKey } from "./types";

type Props = {
  className?: string;
  defaultTab?: MaterialsTabKey;
  title?: string;
};

export function MaterialsSection({
  className = "",
  defaultTab = "materials",
  title = "Материалы",
}: Props) {
  const [active, setActive] = useState<MaterialsTabKey>(defaultTab);

  const tab = useMemo(
    () => MATERIALS_TABS.find((t) => t.key === active) ?? MATERIALS_TABS[0],
    [active],
  );

  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncArrows = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    // безопасно обновляем после маунта
    const id = requestAnimationFrame(syncArrows);
    embla.on("select", syncArrows);
    embla.on("reInit", syncArrows);

    return () => {
      cancelAnimationFrame(id);
      embla.off("select", syncArrows);
      embla.off("reInit", syncArrows);
    };
  }, [embla, syncArrows]);

  // при смене таба — сбрасываем карусель в начало
  useEffect(() => {
    if (!embla) return;
    const id = requestAnimationFrame(() => {
      embla.scrollTo(0, true);
      syncArrows();
    });
    return () => cancelAnimationFrame(id);
  }, [active, embla, syncArrows]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section className={clsx("w-full bg-white py-16", className)}>
      <Container>
        <h2 className="text-center text-[44px] font-medium leading-none max-lg:text-[30px]">
          {title}
        </h2>

        {/* Tabs */}
        {/* Tabs (full width like on screenshot) */}
        <div className="mt-8 w-full overflow-x-auto">
          <div
            className={clsx(
              "mx-auto flex w-full items-start justify-between gap-[22px]",
              // чтобы на узких экранах не ломалось — будет скролл
              "min-w-[1743px]", // 331*5 + 22*4 = 1743
            )}
          >
            {MATERIALS_TABS.map((t) => {
              const isActive = t.key === active;

              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className="group flex flex-col items-center"
                >
                  <span
                    className={clsx(
                      "inline-flex items-center justify-center",
                      "h-[79px] w-[331px] rounded-full border",
                      "text-[16px] font-medium transition",
                      isActive
                        ? "bg-[#3A3A3A] text-white border-transparent"
                        : "bg-white text-black/70 border-black/10 hover:border-black/20",
                    )}
                  >
                    {t.label}
                  </span>

                  {/* dot exactly under tab */}
                  <span
                    className={clsx(
                      "mt-4 h-[4px] w-[4px] rounded-full transition",
                      isActive ? "bg-black/60" : "bg-transparent",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Dot indicator line (как на макете маленькая точка под табом) */}
        <div className="mt-3 flex items-center justify-center gap-4">
          {MATERIALS_TABS.map((t) => (
            <span
              key={`${t.key}-dot`}
              className={clsx(
                "h-[4px] w-[4px] rounded-full",
                t.key === active ? "bg-black/60" : "bg-transparent",
              )}
            />
          ))}
        </div>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-5xl text-center text-[13px] leading-relaxed text-black/55">
          {tab.description}
        </p>
{/* Carousel */}
<div className="relative mt-10">
  <div ref={viewportRef} className="overflow-hidden">
    <div className="flex gap-4">
      {tab.cards.map((card) => (
        <div
          key={card.id}
          className="min-w-0 flex-[0_0_auto]"
        >
          {/* card image block */}
          <div className="overflow-hidden rounded-[26px]">
            <div className="relative h-[491px] w-[419px] max-lg:w-[320px] max-lg:h-[380px] max-md:w-[280px] max-md:h-[340px]">
              <Image
                src={card.imageSrc}
                alt={card.title}
                fill
                className="object-cover"
                sizes="419px"
              />
            </div>
          </div>

          {/* caption */}
          <div className="mt-4 text-center text-[14px] text-black/75">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Arrows */}
  <CircleNav
    side="left"
    onClick={prev}
    disabled={!canPrev}
    ariaLabel="Prev"
  />
  <CircleNav
    side="right"
    onClick={next}
    disabled={!canNext}
    ariaLabel="Next"
  />

        </div>
      </Container>
    </section>
  );
}

function CircleNav({
  side,
  onClick,
  disabled,
  ariaLabel,
}: {
  side: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2",
        side === "left" ? "left-2" : "right-2",
        "h-11 w-11 rounded-full bg-white text-black",
        "shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
        "grid place-items-center transition",
        "hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed",
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d={side === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
