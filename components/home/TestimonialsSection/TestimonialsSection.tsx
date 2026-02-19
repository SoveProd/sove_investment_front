"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";

type Testimonial = {
  id: string;
  name: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Сами Дауи",
    date: "15 июня 2023 г.",
    rating: 5,
    text: "Протестировав несколько платформ, похожих на Masteos, мы решили воспользоваться этой командой. Поскольку у них самые дешевые тарифы. Первый контакт очень профессиональный, и их приложение с виртуальным туром работает хорошо.",
  },
  {
    id: "t2",
    name: "Сами Дауи",
    date: "15 июня 2023 г.",
    rating: 5,
    text: "Протестировав несколько платформ, похожих на Masteos, мы решили воспользоваться этой командой. Поскольку у них самые дешевые тарифы. Первый контакт очень профессиональный, и их приложение с виртуальным туром работает хорошо.",
  },
  {
    id: "t3",
    name: "Сами Дауи",
    date: "15 июня 2023 г.",
    rating: 5,
    text: "Протестировав несколько платформ, похожих на Masteos, мы решили воспользоваться этой командой. Поскольку у них самые дешевые тарифы. Первый контакт очень профессиональный, и их приложение с виртуальным туром работает хорошо.",
  },
  {
    id: "t4",
    name: "Сами Дауи",
    date: "15 июня 2023 г.",
    rating: 5,
    text: "Протестировав несколько платформ, похожых на Masteos, мы решили воспользоваться этой командой. Поскольку у них самые дешевые тарифы. Первый контакт очень профессиональный, и их приложение с виртуальным туром работает хорошо.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <span
            key={i}
            className={[
              "text-[16px] leading-none",
              filled ? "text-primary" : "text-borderSoft",
            ].join(" ")}
            aria-hidden="true"
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function TestimonialShape() {
  const fill = "var(--color-surface)";
  const stroke = "var(--color-border)";

  return (
    <svg
      viewBox="0 0 419 470"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M0 30C0 13.4315 13.4315 0 30 0H302C318.569 0 332 13.4315 332 30V41C332 66.4051 352.595 87 378 87H389C405.569 87 419 100.431 419 117V440C419 456.569 405.569 470 389 470H30C13.4315 470 0 456.569 0 440V30Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      />
    </svg>
  );
}

function TestimonialCard({ data }: { data: Testimonial }) {
  return (
    <article
      className={[
        "relative shrink-0",
        // на мобилке карточка резиновая, но не больше 419
        "w-[90vw] max-w-[419px]",
        // на xl можно держать фикс, чтобы совпадало со скрином
        "xl:w-[419px]",
      ].join(" ")}
    >
      <div
        className={[
          "relative w-full",
          // высота тоже чуть адаптивная, чтобы на мелких экранах не было “кирпича”
          "h-[440px] sm:h-[470px]",
        ].join(" ")}
      >
        <TestimonialShape />

        {/* КРУЖОК В ВЫРЕЗЕ */}
        <button
          type="button"
          className={[
            "absolute z-[3]",
            "top-[0px] right-[0px]",
            "grid h-[70px] w-[70px] place-items-center rounded-full",
            "bg-white",
            "shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
            "border border-border",
            "transition-transform duration-200 hover:scale-[1.03]",
          ].join(" ")}
          aria-label="Открыть отзыв"
        >
          <Image src="/objects/tgArr.svg" alt="" width={30} height={30} />
        </button>

        {/* CONTENT */}
        <div className="relative z-[2] px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[20px] sm:text-[22px] font-medium text-text">
                {data.name}
              </div>

              <div className="mt-3">
                <Stars rating={data.rating} />
              </div>

              <div className="mt-3 text-[12px] text-textSecondary">
                {data.date}
              </div>
            </div>

            <div className="w-[60px]" aria-hidden="true" />
          </div>

          <div className="mt-7 sm:mt-8 w-full border-t border-dashed border-borderSoft" />

          <p className="mt-6 sm:mt-8 text-[13px] leading-[1.6] text-textSecondary">
            {data.text}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  const maxIndex = useMemo(() => {
    return Math.max(0, testimonials.length - perView);
  }, [perView]);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      // ≥1280: 3 карточки, ≥1024: 2 карточки, иначе 1 (скролл)
      if (w >= 1280) setPerView(3);
      else if (w >= 1024) setPerView(2);
      else setPerView(1);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    // если сменился perView — подрежем index, чтобы не уехать за пределы
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const scrollToIndex = (next: number) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(next, maxIndex));
    setIndex(clamped);

    const first = track.querySelector<HTMLElement>("[data-card='true']");
    if (!first) return;

    const gapPx = 24; // gap-6
    const cardW = first.offsetWidth;
    const left = clamped * (cardW + gapPx);

    track.scrollTo({ left, behavior: "smooth" });
  };

  const handlePrev = () => scrollToIndex(index - 1);
  const handleNext = () => scrollToIndex(index + 1);

  const isDesktopSlider = perView >= 2; // на 2-3 карточки делаем управление стрелками

  return (
    <section className="w-full bg-bg py-[120px] max-lg:py-[70px]">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-[46px] font-medium tracking-[-0.02em] text-text max-lg:text-[28px]">
            Что о нас думают наши клиенты
          </h2>

          {/* arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!isDesktopSlider || index === 0}
              className={[
                "grid h-[44px] w-[66px] place-items-center rounded-full border border-border bg-white transition",
                "hover:bg-surfaceAlt",
                "disabled:opacity-40 disabled:cursor-not-allowed",
              ].join(" ")}
              aria-label="Назад"
            >
              <span className="text-[18px]">←</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isDesktopSlider || index >= maxIndex}
              className={[
                "grid h-[44px] w-[66px] place-items-center rounded-full bg-graphite transition",
                "hover:opacity-95",
                "disabled:opacity-40 disabled:cursor-not-allowed",
              ].join(" ")}
              aria-label="Вперёд"
            >
              <span className="text-[18px] text-primary">→</span>
            </button>
          </div>
        </div>

        {/* TRACK */}
        <div className="mt-10">
          <div
            ref={trackRef}
            className={[
              "flex gap-6 overflow-x-auto scroll-smooth pb-2",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              // на десктопе делаем “как слайдер”: без свободного скролла мышью (не обязательно, но аккуратно)
              isDesktopSlider ? "snap-x snap-mandatory" : "snap-x",
            ].join(" ")}
          >
            {testimonials.map((t) => (
              <div key={t.id} data-card="true" className="snap-start">
                <TestimonialCard data={t} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
