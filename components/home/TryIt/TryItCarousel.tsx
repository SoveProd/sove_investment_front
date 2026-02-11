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

  // prevIndex нужен только для слоя, который “уходит”
  const [prevIndex, setPrevIndex] = useState(activeIndex);

  // isFading=true: prev уходит (0), current приходит (1)
  const [isFading, setIsFading] = useState(false);

  const rafRef = useRef<number | null>(null);

  const current = items[activeIndex];
  const prev = items[prevIndex];

  const currentNext = items[nextIndex];
  const prevNext = items[(prevIndex + 1) % total];

  // стартуем кроссфейд когда activeIndex поменялся
  useEffect(() => {
    if (activeIndex === prevIndex) return;

    // фиксируем предыдущий индекс как “уходящий”
    setPrevIndex((prevIdx) => prevIdx); // no-op, просто чтобы подчеркнуть смысл

    // старт анимации в следующий кадр, чтобы браузер успел применить DOM
    setIsFading(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      setIsFading(true);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, prevIndex]);

  // как только сменили индекс извне — нужно запомнить “старый” как prev
  useEffect(() => {
    // если activeIndex уже новый, а prevIndex старый — ок
    // но если prevIndex вдруг равен activeIndex, ничего не делаем
    // (prevIndex обновим на конце transition)
  }, [activeIndex]);

  // завершение анимации (повесим на current-layer)
  const handleFadeEnd = () => {
    // после завершения: prevIndex становится current, анимация выключается
    setPrevIndex(activeIndex);
    setIsFading(false);
  };

  // ✅ циклическая навигация
  const goPrev = () => setActiveIndex((activeIndex - 1 + total) % total);
  const goNext = () => setActiveIndex((activeIndex + 1) % total);

  const arrowBtnClass = [
    "flex h-[40px] w-[120px] items-center justify-center rounded-full",
    "bg-border",
    "text-borderSoft",
    "transition-colors duration-200",
    "hover:bg-graphite hover:text-surface",
  ].join(" ");

  // ВАЖНО: когда анимации нет — current должен быть 100% видим, prev скрыт
  const prevLayerClass = [
    "absolute inset-0 transition-opacity ease-out",
    `duration-[${TRANSITION_MS}ms]`,
    isFading ? "opacity-0" : "opacity-0",
  ].join(" ");

  const currentLayerClass = [
    "absolute inset-0 transition-opacity ease-out",
    `duration-[${TRANSITION_MS}ms]`,
    isFading ? "opacity-100" : "opacity-100",
  ].join(" ");

  // Чтобы был именно кроссфейд: делаем prev видимым ДО старта,
  // а затем при isFading=true он уходит. Поэтому добавим отдельный флаг.
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
      <div className="flex items-start gap-8">
        {/* LEFT BIG */}
        <div className="relative h-[777px] w-[573px] overflow-hidden rounded-[40px] max-lg:h-[420px] max-lg:w-full">
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
              sizes="573px"
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
              sizes="573px"
              className="object-cover"
              priority
            />
          </div>

          {/* Title inside big image (fade like images) */}
          <div className="absolute bottom-8 left-0 right-0 grid place-items-center text-center">
            <div className="relative h-[28px] w-full">
              <div
                className={[
                  "absolute inset-0 grid place-items-center",
                  "text-[22px] font-medium tracking-[0.14em] text-white drop-shadow",
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
                  "text-[22px] font-medium tracking-[0.14em] text-white drop-shadow",
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

        {/* RIGHT COLUMN */}
        <div className="flex w-[573px] flex-col items-center max-lg:hidden">
          {/* SMALL IMAGE */}
          <div className="relative h-[641px] w-[573px] overflow-hidden rounded-[40px]">
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
                sizes="573px"
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
                sizes="573px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Title under small image */}
          <div className="mt-8 text-center text-[22px] font-medium tracking-[0.12em] text-text">
            <span className="relative inline-block h-[28px] w-[573px]">
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
          <div className="mt-4 flex items-center justify-center gap-4">
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
    </div>
  );
}
