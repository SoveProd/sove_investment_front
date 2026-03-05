"use client";

import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import type { CaseItem } from "@/components/sections/CasesCatalog/CasesCatalogSection";
import { CaseCard } from "@/components/sections/CasesCatalog/CaseCard";

type Props = {
  title?: string;
  items: CaseItem[];
  className?: string;
};

export function RealizedCasesSection({
  title = "Реализованные кейсы",
  items,
  className = "",
}: Props) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: true,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    const id = requestAnimationFrame(() => update());
    embla.on("select", update);
    embla.on("reInit", update);

    return () => {
      cancelAnimationFrame(id);
      embla.off("select", update);
      embla.off("reInit", update);
    };
  }, [embla, update]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  if (!items?.length) return null;

  return (
    <section className={clsx("w-full bg-white py-16", className)}>
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-[50px] font-medium text-black">{title}</h2>

          {/* стрелки как на макете: маленькие пилюли */}
          <div className="flex items-center gap-2">
            <NavBtn dir="prev" onClick={prev} disabled={!canPrev} />
            <NavBtn dir="next" onClick={next} disabled={!canNext} />
          </div>
        </div>

        <div className="mt-8">
          <div ref={viewportRef} className="overflow-hidden">
            <div className="flex gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={clsx(
                    "min-w-0",
                    // ✅ чтобы показывало 2 карточки как на скрине
                    "flex-[0_0_calc(50%-16px)]",
                    "max-lg:flex-[0_0_85%]",
                  )}
                >
                  <CaseCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function NavBtn({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "h-8 w-14 rounded-full border border-black/10 bg-white",
        "grid place-items-center",
        "transition hover:bg-black/[0.03]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
      )}
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
