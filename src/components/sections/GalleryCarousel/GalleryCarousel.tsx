"use client";

import Image from "next/image";
import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryImage } from "./types";

type Props = {
  images: GalleryImage[];
  className?: string;
  thumbsVisible?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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
  if (!images?.length) return null;

  return (
    <section className={clsx("w-full", className)}>
      <div className="lg:hidden">
        <GalleryCarouselMobile images={images} />
      </div>

      <div className="hidden lg:block">
        <GalleryCarouselDesktop images={images} thumbsVisible={thumbsVisible} />
      </div>
    </section>
  );
}

function GalleryCarouselMobile({ images }: { images: GalleryImage[] }) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateStateFromEmbla = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    requestAnimationFrame(() => updateStateFromEmbla());
    embla.on("select", updateStateFromEmbla);
    embla.on("reInit", updateStateFromEmbla);

    return () => {
      embla.off("select", updateStateFromEmbla);
      embla.off("reInit", updateStateFromEmbla);
    };
  }, [embla, updateStateFromEmbla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  return (
    <div className="relative overflow-hidden">
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {images.map((img, idx) => (
            <div
              key={`${img.src}-${idx}`}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-hidden={idx !== selectedIndex}
            >
              <div className="relative h-[380px] w-full sm:h-[460px]">
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

      {images.length > 1 && (
        <>
          <CircleArrow
            side="left"
            onClick={scrollPrev}
            ariaLabel="Previous image"
            mobile
          />

          <CircleArrow
            side="right"
            onClick={scrollNext}
            ariaLabel="Next image"
            mobile
          />

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {images.map((_, index) => {
              const active = index === selectedIndex;

              return (
                <button
                  key={`mobile-dot-${index}`}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={clsx(
                    "rounded-full transition-all duration-200",
                    active
                      ? "h-[10px] w-[22px] bg-[#4A4A4A]"
                      : "h-[10px] w-[10px] bg-white",
                  )}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function GalleryCarouselDesktop({
  images,
  thumbsVisible,
}: {
  images: GalleryImage[];
  thumbsVisible: number;
}) {
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

    requestAnimationFrame(() => updateStateFromEmbla());
    embla.on("select", updateStateFromEmbla);
    embla.on("reInit", updateStateFromEmbla);

    return () => {
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

  return (
    <div className="relative h-[100svh] w-full overflow-hidden rounded-none">
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

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex h-[177px] w-[min(1100px,92vw)] items-center justify-center rounded-[15px] bg-white px-6 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-center gap-2">
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
                    "relative h-[78px] w-[78px] shrink-0 rounded-[16px] bg-white sm:h-[96px] sm:w-[96px] lg:h-[120px] lg:w-[120px] xl:h-[147px] xl:w-[147px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                    isActive ? "opacity-100" : "opacity-85 hover:opacity-100",
                  )}
                >
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
  );
}

function CircleArrow({
  side,
  onClick,
  disabled,
  ariaLabel,
  mobile = false,
}: {
  side: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        "absolute top-1/2 z-20 -translate-y-1/2 grid place-items-center rounded-full transition",
        mobile
          ? [
              "h-[48px] w-[48px]",
              side === "left" ? "left-4" : "right-4",
              "bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.16)]",
            ]
          : [
              "h-12 w-12",
              side === "left" ? "left-10" : "right-10",
              "bg-white/95 text-black shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:bg-white",
            ],
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      <svg
        width={mobile ? "20" : "18"}
        height={mobile ? "20" : "18"}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={side === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth={mobile ? "2.4" : "2.2"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
