"use client";

import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/src/components/layout/Container";
import type { CaseItem } from "@/src/components/sections/CasesCatalog/CasesCatalogSection";
import { CaseCard } from "@/src/components/sections/CasesCatalog/CaseCard";

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
  if (!items?.length) return null;

  return (
    <section className={clsx("w-full bg-white py-10 lg:py-16", className)}>
      <div className="lg:hidden">
        <RealizedCasesSectionMobile title={title} items={items} />
      </div>

      <div className="hidden lg:block">
        <RealizedCasesSectionDesktop title={title} items={items} />
      </div>
    </section>
  );
}

function RealizedCasesSectionDesktop({
  title,
  items,
}: {
  title: string;
  items: CaseItem[];
}) {
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

  return (
    <Container>
      <div className="flex items-center justify-between">
        <h2 className="text-[50px] font-medium text-black">{title}</h2>

        <div className="flex items-center gap-2">
          <NavBtnDesktop dir="prev" onClick={prev} disabled={!canPrev} />
          <NavBtnDesktop dir="next" onClick={next} disabled={!canNext} />
        </div>
      </div>

      <div className="mt-8">
        <div ref={viewportRef} className="overflow-hidden">
          <div className="flex gap-8">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="min-w-0 flex-[0_0_calc(50%-16px)]"
              >
                <CaseCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

function RealizedCasesSectionMobile({
  title,
  items,
}: {
  title: string;
  items: CaseItem[];
}) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
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

  return (
    <Container>
      <div className="mx-auto w-full max-w-[343px]">
        <h2 className="text-[24px] font-medium leading-none text-black">
          {title}
        </h2>

        <div className="mt-5">
          <div ref={viewportRef} className="overflow-hidden">
            <div className="flex">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="min-w-0 flex-[0_0_100%]"
                >
                  <CaseCard item={item} mobile />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <NavBtnMobile dir="prev" onClick={prev} disabled={!canPrev} />
          <NavBtnMobile dir="next" onClick={next} disabled={!canNext} />
        </div>
      </div>
    </Container>
  );
}

function NavBtnDesktop({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const isPrev = dir === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "grid place-items-center rounded-full transition",
        isPrev
          ? "h-8 w-14 border border-black/10 bg-white text-black/25"
          : "h-8 w-[72px] bg-[#3A3A3A] text-white",
        "disabled:cursor-not-allowed disabled:opacity-40",
      )}
      aria-label={isPrev ? "Previous" : "Next"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={isPrev ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function NavBtnMobile({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const isPrev = dir === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "grid place-items-center rounded-full transition",
        "h-[36px] w-[110px]",
        isPrev
          ? "bg-[#3A3A3A] text-white"
          : "border border-black/6 bg-[#F5F5F5] text-black/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
      aria-label={isPrev ? "Previous" : "Next"}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={isPrev ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
