"use client";

import { Container } from "@/components/layout/Container";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CarouselItem = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
};

type RealEstateClientProps = {
  title: string;
  subtitle?: string;
  items: CarouselItem[];
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function RealEstateClient({
  title,
  subtitle,
  items,
  className = "",
}: RealEstateClientProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);


  const initialActive = useMemo(() => {
    if (!items.length) return 0;
    return Math.floor(items.length / 2);
  }, [items.length]);

  const [active, setActive] = useState(initialActive);


  const [stepPx, setStepPx] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(0);


  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const deltaXRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  const maxIndex = Math.max(0, items.length - 1);

  useEffect(() => {
    setActive(initialActive);
  }, [initialActive]);

  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const first = slideRefs.current[0];
    const second = slideRefs.current[1];

    if (vp) {
      const vr = vp.getBoundingClientRect();
      setViewportWidth(vr.width);
    }

    if (!first) return;

    const r1 = first.getBoundingClientRect();
    setSlideWidth(r1.width);


    if (second) {
      const r2 = second.getBoundingClientRect();
      const step = Math.abs(r2.left - r1.left);
      if (step > 0) {
        setStepPx(step);
        return;
      }
    }

    setStepPx(r1.width);
  }, []);

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const canGoPrev = active > 0;
  const canGoNext = active < maxIndex;

  const goTo = useCallback(
    (idx: number) => {
      const next = clamp(idx, 0, maxIndex);
      setActive(next);
    },
    [maxIndex],
  );

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    setActive((p) => Math.max(0, p - 1));
  }, [canGoPrev]);

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    setActive((p) => Math.min(maxIndex, p + 1));
  }, [canGoNext, maxIndex]);


  const baseTranslate = useMemo(() => {
    if (!stepPx) return 0;

    const centerOffset =
      viewportWidth && slideWidth ? (viewportWidth - slideWidth) / 2 : 0;

    return centerOffset - active * stepPx;
  }, [active, stepPx, viewportWidth, slideWidth]);

  const getCurrentTranslate = () => {
    if (!isDraggingRef.current) return baseTranslate;
    return baseTranslate + deltaXRef.current;
  };

  const setTrackTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const x = getCurrentTranslate();
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }, [baseTranslate]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = `translate3d(${baseTranslate}px, 0, 0)`;
  }, [baseTranslate]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;

    pointerIdRef.current = e.pointerId;
    viewportRef.current.setPointerCapture(e.pointerId);

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    deltaXRef.current = 0;

    const track = trackRef.current;
    if (track) track.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - startXRef.current;


    const resistance =
      (active === 0 && dx > 0) || (active === maxIndex && dx < 0) ? 0.35 : 1;

    deltaXRef.current = dx * resistance;
    setTrackTransform();
  };

  const finishDrag = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    const dx = deltaXRef.current;
    deltaXRef.current = 0;

    const track = trackRef.current;
    if (track) {
      track.style.transition = "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)";
    }

    const threshold = stepPx ? stepPx * 0.18 : 40;

    if (dx <= -threshold && canGoNext) {
      goNext();
      return;
    }

    if (dx >= threshold && canGoPrev) {
      goPrev();
      return;
    }

  
    if (track) {
      track.style.transform = `translate3d(${baseTranslate}px, 0, 0)`;
    }
  };

  const onPointerUp = () => {
    if (!viewportRef.current) return;

    if (pointerIdRef.current !== null) {
      try {
        viewportRef.current.releasePointerCapture(pointerIdRef.current);
      } catch {
        // ignore
      }
    }
    pointerIdRef.current = null;

    finishDrag();
  };

  const onPointerCancel = () => {
    pointerIdRef.current = null;
    finishDrag();
  };

  return (
    <section
      className={[
        "w-full rounded-[28px] bg-white  py-20 ",
        className,
      ].join(" ")}
    >
    
        <div className="text-center">
          <h2 className="text-[28px] font-medium tracking-tight text-neutral-900 sm:text-[50px]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mx-auto mt-2 max-w-3xl text-[14px] leading-6 text-neutral-500 sm:text-[15px]">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="relative mt-8">
          {/* Viewport */}
          <div
            ref={viewportRef}
            className="relative overflow-hidden"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            style={{ touchAction: "pan-y", cursor: "grab" }}
          >
            {/* Track */}
            <div
              ref={trackRef}
              className="flex items-stretch gap-6"
              style={{
                willChange: "transform",
                paddingLeft: "18px",
                paddingRight: "18px",
              }}
            >
              {items.map((it, idx) => (
                <div
                  key={it.id}
                  ref={(el) => {
                    slideRefs.current[idx] = el;
                  }}
                  className={[
                    "relative h-[320px] shrink-0 overflow-hidden rounded-[22px] bg-neutral-200 sm:h-[360px] md:h-[584px]",
                    "w-[78vw] sm:w-[66vw] md:w-[1161px]",
                  ].join(" ")}
                >
                  <Image
                    src={it.imageSrc}
                    alt={it.imageAlt}
                    fill
                    priority={idx === active}
                    className="object-cover"
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 66vw, 760px"
                  />

                  <div className="absolute inset-0 bg-black/10" />

                  <div className="absolute bottom-6 left-0 right-0 px-6 text-center">
                    <p className="text-[20px] font-medium uppercase tracking-wide text-white/90 sm:text-[22px]">
                      {it.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrev}
              disabled={!canGoPrev}
              className={[
                "absolute left-4 top-1/2 -translate-y-1/2",
                "h-10 w-10 rounded-full bg-white/90 shadow-md backdrop-blur",
                "grid place-items-center transition",
                canGoPrev ? "hover:bg-white" : "cursor-not-allowed opacity-40",
              ].join(" ")}
            >
              <span className="text-[20px] leading-none">‹</span>
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              disabled={!canGoNext}
              className={[
                "absolute right-4 top-1/2 -translate-y-1/2",
                "h-10 w-10 rounded-full bg-white/90 shadow-md backdrop-blur",
                "grid place-items-center transition",
                canGoNext ? "hover:bg-white" : "cursor-not-allowed opacity-40",
              ].join(" ")}
            >
              <span className="text-[20px] leading-none">›</span>
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {items.map((_, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => goTo(idx)}
                  className={[
                    "h-2 rounded-full transition-all",
                    isActive ? "w-8 bg-neutral-900" : "w-2 bg-neutral-300",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>

    </section>
  );
}
