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

  return (
    <section className={clsx("w-full bg-white py-10 lg:py-16", className)}>
      {/* MOBILE */}
      <div className="lg:hidden">
        <MaterialsSectionMobile
          active={active}
          setActive={setActive}
          tab={tab}
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <MaterialsSectionDesktop
          title={title}
          active={active}
          setActive={setActive}
          tab={tab}
        />
      </div>
    </section>
  );
}

function MaterialsSectionMobile({
  active,
  setActive,
  tab,
}: {
  active: MaterialsTabKey;
  setActive: (value: MaterialsTabKey) => void;
  tab: (typeof MATERIALS_TABS)[number];
}) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncState = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    syncState();
    embla.on("select", syncState);

    return () => {
      embla.off("select", syncState);
    };
  }, [embla, syncState]);

  useEffect(() => {
    if (!embla) return;

    requestAnimationFrame(() => {
      embla.scrollTo(0, true);
      syncState();
    });
  }, [active, embla, syncState]);

  const prev = () => embla?.scrollPrev();
  const next = () => embla?.scrollNext();

  return (
    <Container>
      <div className="mx-auto w-full max-w-[343px]">
        {/* SELECT */}
        <div className="relative">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value as MaterialsTabKey)}
            className="h-[40px] w-full appearance-none rounded-full border border-black/30 bg-white px-4 pr-10 text-[14px] text-[#4A4A4A] outline-none"
          >
            {MATERIALS_TABS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/60">
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        {/* TITLE */}
        <h2 className="mt-5 text-center text-[24px] font-medium text-[#3A3A3A]">
          {tab.label}
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-5 max-w-[310px] text-center text-[12px] leading-[1.2] text-black/60">
          {tab.description}
        </p>

        {/* CAROUSEL */}
        <div className="relative mt-7">
          <div ref={viewportRef} className="overflow-hidden">
            <div className="flex gap-[10px]">
              {tab.cards.map((card) => (
                <div key={card.id} className="flex-[0_0_145px]">
                  <div className="relative overflow-hidden rounded-[18px]">
                    <div className="relative h-[176px] w-[145px]">
                      <Image
                        src={card.imageSrc}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="145px"
                      />
                    </div>
                  </div>

                  <div className="mt-2 text-center text-[12px] text-black/70">
                    {card.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ARROWS */}
          <CircleNav side="left" onClick={prev} disabled={!canPrev} />

          <CircleNav side="right" onClick={next} disabled={!canNext} />
        </div>
      </div>
    </Container>
  );
}

function MaterialsSectionDesktop({
  title,
  active,
  setActive,
  tab,
}: {
  title: string;
  active: MaterialsTabKey;
  setActive: (value: MaterialsTabKey) => void;
  tab: (typeof MATERIALS_TABS)[number];
}) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const prev = () => embla?.scrollPrev();
  const next = () => embla?.scrollNext();

  return (
    <Container>
      <h2 className="text-center text-[44px] font-medium">{title}</h2>

      <div className="mt-8 flex gap-[22px] justify-between min-w-[1743px] overflow-x-auto">
        {MATERIALS_TABS.map((t) => {
          const isActive = t.key === active;

          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className="flex flex-col items-center"
            >
              <span
                className={clsx(
                  "h-[79px] w-[331px] rounded-full border text-[16px] flex items-center justify-center",
                  isActive
                    ? "bg-[#3A3A3A] text-white border-transparent"
                    : "bg-white text-black/70 border-black/10",
                )}
              >
                {t.label}
              </span>

              <span
                className={clsx(
                  "mt-4 h-[4px] w-[4px] rounded-full",
                  isActive ? "bg-black/60" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      <p className="mx-auto mt-6 max-w-5xl text-center text-[13px] text-black/55">
        {tab.description}
      </p>

      <div className="relative mt-10">
        <div ref={viewportRef} className="overflow-hidden">
          <div className="flex gap-4">
            {tab.cards.map((card) => (
              <div key={card.id}>
                <div className="overflow-hidden rounded-[26px]">
                  <div className="relative h-[491px] w-[419px]">
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="mt-4 text-center text-[14px] text-black/75">
                  {card.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <CircleNav side="left" onClick={prev} />
        <CircleNav side="right" onClick={next} />
      </div>
    </Container>
  );
}

function CircleNav({
  side,
  onClick,
  disabled,
}: {
  side: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2",
        side === "left" ? "left-2" : "right-2",
        "h-[34px] w-[34px] rounded-full bg-white",
        "shadow-[0_8px_20px_rgba(0,0,0,0.15)]",
        "grid place-items-center",
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24">
        <path
          d={side === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
