"use client";

import Image from "next/image";
import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryImage } from "./types";

type Props = {
  images: GalleryImage[];
  className?: string;
  thumbsVisible?: number; // макет: 7
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// always return exactly "visible" items (looping)
function getThumbWindow(
  length: number,
  selectedIndex: number,
  visible: number,
) {
  if (length <= 0) return [];
  const count = Math.max(1, visible);

  const half = Math.floor(count / 2);
  const start = selectedIndex - half;

  const res: number[] = [];
  for (let i = 0; i < count; i++) {
    let idx = (start + i) % length;
    if (idx < 0) idx += length;
    res.push(idx);
  }
  return res;
}

export function GalleryCarousel({
  images,
  className = "",
  thumbsVisible = 7,
}: Props) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateStateFromEmbla = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    const id = requestAnimationFrame(() => updateStateFromEmbla());
    embla.on("select", updateStateFromEmbla);
    embla.on("reInit", updateStateFromEmbla);

    return () => {
      cancelAnimationFrame(id);
      embla.off("select", updateStateFromEmbla);
      embla.off("reInit", updateStateFromEmbla);
    };
  }, [embla, updateStateFromEmbla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  const thumbIndexes = useMemo(
    () => getThumbWindow(images.length, selectedIndex, thumbsVisible),
    [images.length, selectedIndex, thumbsVisible],
  );

  if (!images?.length) return null;

  return (
    <section className={clsx("w-full", className)}>
      {/* FULL SCREEN */}
      <div className="relative h-[100svh] w-full overflow-hidden rounded-none">
        {/* MAIN SLIDES */}
        <div ref={viewportRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {images.map((img, idx) => (
              <div
                key={`${img.src}-${idx}`}
                className="relative min-w-0 flex-[0_0_100%]"
                aria-hidden={idx !== selectedIndex}
              >
                <div className="relative h-[100svh] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={idx === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARROWS */}
        <CircleArrow
          side="left"
          onClick={scrollPrev}
          disabled={!canPrev}
          ariaLabel="Previous image"
        />
        <CircleArrow
          side="right"
          onClick={scrollNext}
          disabled={!canNext}
          ariaLabel="Next image"
        />

        {/* THUMBS PLAQUE (W=1149, H=177, R=15) */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 max-lg:bottom-5">
          <div
            className={clsx(
              // width like mock (and responsive fallback)
              "w-[min(1100px,92vw)]",
              // height like mock
              "h-[177px]",
              // radius like mock
              "rounded-[15px]",
              // visual
              "bg-white shadow-[0_18px_60px_rgba(0,0,0,0.22)]",
              // inner layout
              "px-6 py-4 max-lg:px-4",
              "flex items-center justify-center",
            )}
          >
            <div className="flex items-center justify-center gap-2 max-lg:gap-3">
              {thumbIndexes.map((realIndex, pos) => {
                const img = images[realIndex];
                const isActive = realIndex === selectedIndex;

                return (
                  <button
                    key={`${img.src}-thumb-${realIndex}-${pos}`}
                    type="button"
                    onClick={() => scrollTo(realIndex)}
                    aria-label={`Go to image ${realIndex + 1}`}
                    className={clsx(
                      "relative shrink-0",
                      // ✅ thumbs size (147 on large screens)
                      "h-[78px] w-[78px]",
                      "sm:h-[96px] sm:w-[96px]",
                      "lg:h-[120px] lg:w-[120px]",
                      "xl:h-[147px] xl:w-[147px]",
                      // shape
                      "rounded-[16px] bg-white",
                      // focus
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                      // state
                      isActive ? "opacity-100" : "opacity-85 hover:opacity-100",
                    )}
                  >
                    {/* white frame without border */}
                    <span className="absolute inset-0 rounded-[16px] bg-white p-[6px]">
                      <span className="relative block h-full w-full overflow-hidden rounded-[12px]">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CircleArrow({
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
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2 z-20",
        side === "left" ? "left-10 max-lg:left-4" : "right-10 max-lg:right-4",
        "h-12 w-12 rounded-full",
        "bg-white/95 text-black",
        "shadow-[0_12px_40px_rgba(0,0,0,0.25)]",
        "grid place-items-center transition",
        "hover:bg-white",
        "disabled:opacity-50 disabled:cursor-not-allowed",
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
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
