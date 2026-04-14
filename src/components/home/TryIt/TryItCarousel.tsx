"use client";

import Image from "next/image";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = {
  title: string;
  img: string;
};

type Props = {
  items: Item[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const IMAGE_TRANSITION = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const TITLE_TRANSITION = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export function TryItCarousel({ items, activeIndex, setActiveIndex }: Props) {
  const total = items.length;

  const nextIndex = useMemo(() => {
    return (activeIndex + 1) % total;
  }, [activeIndex, total]);

  const current = items[activeIndex];
  const currentNext = items[nextIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const arrowBtnClass = [
    "flex h-[40px] w-[110px] sm:w-[120px] items-center justify-center rounded-full",
    "bg-border text-borderSoft",
    "transition-all duration-300",
    "hover:bg-graphite hover:text-surface",
    "active:scale-[0.98]",
  ].join(" ");

  return (
    <div className="w-full">
      <div className="flex items-start gap-6 lg:gap-8">
        {/* LEFT BIG */}
        <div
          className={[
            "relative w-full overflow-hidden rounded-[28px] sm:rounded-[32px] lg:rounded-[40px]",
            "h-[360px] sm:h-[420px] md:h-[480px]",
            "lg:h-[520px]",
            "xl:h-[640px] 2xl:h-[777px]",
            "lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[573px]",
          ].join(" ")}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.img}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={IMAGE_TRANSITION}
            >
              <Image
                src={current.img}
                alt={current.title}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 573px"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Title inside big image */}
          <div className="absolute bottom-6 left-0 right-0 z-10 grid place-items-center px-4 text-center sm:bottom-7 lg:bottom-8">
            <div className="relative w-full min-h-[28px] sm:min-h-[30px] lg:min-h-[32px] 2xl:min-h-[34px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  className={[
                    "absolute inset-0 grid place-items-center",
                    "font-medium tracking-[0.14em] text-white drop-shadow",
                    "leading-none",
                    "text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[22px]",
                  ].join(" ")}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={TITLE_TRANSITION}
                >
                  {current.title.toUpperCase()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden w-[280px] flex-col items-center lg:flex xl:w-[360px] 2xl:w-[573px]">
          {/* SMALL IMAGE */}
          <div
            className={[
              "relative w-full overflow-hidden rounded-[28px] xl:rounded-[40px]",
              "h-[420px] xl:h-[520px] 2xl:h-[641px]",
            ].join(" ")}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNext.img}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={IMAGE_TRANSITION}
              >
                <Image
                  src={currentNext.img}
                  alt={currentNext.title}
                  fill
                  sizes="(max-width: 1280px) 35vw, 573px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Title + Arrows */}
          <div className="mt-6 flex w-full flex-col items-center xl:mt-8">
            <div className="w-[236px] sm:w-[256px]">
              <div className="text-center text-[16px] font-medium leading-none tracking-[0.12em] text-text xl:text-[20px] 2xl:text-[22px]">
                <span className="relative block w-full min-h-[28px] xl:min-h-[30px] 2xl:min-h-[34px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentNext.title}
                      className="absolute inset-0 grid place-items-center"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={TITLE_TRANSITION}
                    >
                      {currentNext.title.toUpperCase()}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 xl:mt-4">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous slide"
                  className={arrowBtnClass}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next slide"
                  className={arrowBtnClass}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE arrows */}
      <div className="mt-5 flex items-center justify-center gap-4 lg:hidden">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className={arrowBtnClass}
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className={arrowBtnClass}
        >
          →
        </button>
      </div>
    </div>
  );
}
