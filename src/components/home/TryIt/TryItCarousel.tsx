"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

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
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

const TITLE_TRANSITION = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 0.7,
};

const imageVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction * 22,
    scale: 1.02,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction * -22,
    scale: 0.992,
    filter: "blur(6px)",
  }),
};

const titleVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    y: direction * 10,
    filter: "blur(4px)",
  }),
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    y: direction * -10,
    filter: "blur(4px)",
  }),
};

export function TryItCarousel({ items, activeIndex, setActiveIndex }: Props) {
  const total = items.length;
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextIndex = useMemo(() => {
    return (activeIndex + 1) % total;
  }, [activeIndex, total]);

  const current = items[activeIndex];
  const currentNext = items[nextIndex];

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const arrowBtnBase = [
    "flex h-[44px] w-full max-w-[135px] items-center justify-center rounded-full",
    "border transition-colors duration-200",
    "active:scale-[0.98]",
    "select-none",
  ].join(" ");

  const arrowBtnPrev = clsx(
    arrowBtnBase,
    "border-graphite bg-graphite text-white hover:bg-graphite/90",
  );

  const arrowBtnNext = clsx(
    arrowBtnBase,
    "border-border bg-surface text-textMuted hover:bg-surface/80",
  );

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
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current.img}
              className="absolute inset-0"
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
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
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={current.title}
                  className={[
                    "absolute inset-0 grid place-items-center",
                    "font-medium tracking-[0.14em] text-white drop-shadow",
                    "leading-none",
                    "text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[22px]",
                  ].join(" ")}
                  variants={titleVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
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
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentNext.img}
                className="absolute inset-0"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
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
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.span
                      key={currentNext.title}
                      className="absolute inset-0 grid place-items-center"
                      variants={titleVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={direction}
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
                  className={arrowBtnPrev}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next slide"
                  className={arrowBtnNext}
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
          className={arrowBtnPrev}
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className={arrowBtnNext}
        >
          →
        </button>
      </div>
    </div>
  );
}
