"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  title: string;
  img: string;
};

type Props = {
  items: Item[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const TRANSITION_MS = 350;

export function TryItCarousel({ items, activeIndex, setActiveIndex }: Props) {
  const total = items.length;

  const nextIndex = useMemo(
    () => (activeIndex + 1) % total,
    [activeIndex, total],
  );

  const [prevIndex, setPrevIndex] = useState(activeIndex);
  const [isFading, setIsFading] = useState(false);

  const rafRef = useRef<number | null>(null);

  const current = items[activeIndex];
  const prev = items[prevIndex];

  const currentNext = items[nextIndex];
  const prevNext = items[(prevIndex + 1) % total];

  useEffect(() => {
    if (activeIndex === prevIndex) return;

    setIsFading(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      setIsFading(true);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, prevIndex]);

  const handleFadeEnd = () => {
    setPrevIndex(activeIndex);
    setIsFading(false);
  };

  const goPrev = () => setActiveIndex((activeIndex - 1 + total) % total);
  const goNext = () => setActiveIndex((activeIndex + 1) % total);

  const arrowBtnClass = [
    "flex h-[40px] w-[110px] sm:w-[120px] items-center justify-center rounded-full",
    "bg-border",
    "text-borderSoft",
    "transition-colors duration-200",
    "hover:bg-graphite hover:text-surface",
  ].join(" ");

  const showPrev = activeIndex !== prevIndex;

  const prevOpacity = showPrev
    ? isFading
      ? "opacity-0"
      : "opacity-100"
    : "opacity-0";
  const currOpacity = showPrev
    ? isFading
      ? "opacity-100"
      : "opacity-0"
    : "opacity-100";

  return (
    <div className="w-full">
      <div className="flex items-start gap-6 lg:gap-8">
        {/* LEFT BIG */}
        <div
          className={[
            "relative w-full overflow-hidden rounded-[28px] sm:rounded-[32px] lg:rounded-[40px]",
            // высота для разных экранов
            "h-[360px] sm:h-[420px] md:h-[480px]",
            // на lg делаем меньше, чтобы не было гиганта
            "lg:h-[520px]",
            // на xl/2xl можно возвращать большие
            "xl:h-[640px] 2xl:h-[777px]",
            // ширина: на десктопе ограничиваем
            "lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[573px]",
          ].join(" ")}
        >
          {/* prev image layer */}
          <div
            className={[
              "absolute inset-0 transition-opacity ease-out",
              `duration-[${TRANSITION_MS}ms]`,
              prevOpacity,
            ].join(" ")}
          >
            <Image
              src={prev.img}
              alt={prev.title}
              fill
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 573px"
              className="object-cover"
              priority
            />
          </div>

          {/* current image layer */}
          <div
            className={[
              "absolute inset-0 transition-opacity ease-out",
              `duration-[${TRANSITION_MS}ms]`,
              currOpacity,
            ].join(" ")}
            onTransitionEnd={handleFadeEnd}
          >
            <Image
              src={current.img}
              alt={current.title}
              fill
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 573px"
              className="object-cover"
              priority
            />
          </div>

          {/* Title inside big image */}
          <div className="absolute bottom-6 sm:bottom-7 lg:bottom-8 left-0 right-0 grid place-items-center text-center px-4">
            <div className="relative h-[26px] w-full">
              <div
                className={[
                  "absolute inset-0 grid place-items-center",
                  "font-medium tracking-[0.14em] text-white drop-shadow",
                  "text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[22px]",
                  "transition-opacity ease-out",
                  `duration-[${TRANSITION_MS}ms]`,
                  prevOpacity,
                ].join(" ")}
              >
                {prev.title.toUpperCase()}
              </div>

              <div
                className={[
                  "absolute inset-0 grid place-items-center",
                  "font-medium tracking-[0.14em] text-white drop-shadow",
                  "text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[22px]",
                  "transition-opacity ease-out",
                  `duration-[${TRANSITION_MS}ms]`,
                  currOpacity,
                ].join(" ")}
              >
                {current.title.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (показываем только с lg, а на xl/2xl оставляем как было по вайбу) */}
        <div className="hidden lg:flex flex-col items-center w-[280px] xl:w-[360px] 2xl:w-[573px]">
          {/* SMALL IMAGE */}
          <div
            className={[
              "relative w-full overflow-hidden rounded-[28px] xl:rounded-[40px]",
              "h-[420px] xl:h-[520px] 2xl:h-[641px]",
            ].join(" ")}
          >
            <div
              className={[
                "absolute inset-0 transition-opacity ease-out",
                `duration-[${TRANSITION_MS}ms]`,
                prevOpacity,
              ].join(" ")}
            >
              <Image
                src={prevNext.img}
                alt={prevNext.title}
                fill
                sizes="(max-width: 1280px) 35vw, 573px"
                className="object-cover"
              />
            </div>

            <div
              className={[
                "absolute inset-0 transition-opacity ease-out",
                `duration-[${TRANSITION_MS}ms]`,
                currOpacity,
              ].join(" ")}
            >
              <Image
                src={currentNext.img}
                alt={currentNext.title}
                fill
                sizes="(max-width: 1280px) 35vw, 573px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Title under small image */}
          <div className="mt-6 xl:mt-8 text-center font-medium tracking-[0.12em] text-text text-[16px] xl:text-[20px] 2xl:text-[22px]">
            <span className="relative block h-[26px] w-full justify-center">
              <span
                className={[
                  "absolute inset-0 grid place-items-center",
                  "transition-opacity ease-out",
                  `duration-[${TRANSITION_MS}ms]`,
                  prevOpacity,
                ].join(" ")}
              >
                {prevNext.title.toUpperCase()}
              </span>

              <span
                className={[
                  "absolute inset-0 grid place-items-center",
                  "transition-opacity ease-out",
                  `duration-[${TRANSITION_MS}ms]`,
                  currOpacity,
                ].join(" ")}
              >
                {currentNext.title.toUpperCase()}
              </span>
            </span>
          </div>

          {/* Arrows */}
          <div className="mt-3 xl:mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Назад"
              className={arrowBtnClass}
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Вперёд"
              className={arrowBtnClass}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE arrows (когда правой колонки нет) */}
      <div className="mt-5 flex items-center justify-center gap-4 lg:hidden">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Назад"
          className={arrowBtnClass}
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Вперёд"
          className={arrowBtnClass}
        >
          →
        </button>
      </div>
    </div>
  );
}
