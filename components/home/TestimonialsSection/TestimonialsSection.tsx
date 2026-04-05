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
    text: "Протестировав несколько платформ, похожих на Masteos, мы решили воспользоваться этой командой. Поскольку у них самые дешевые тарифы. Первый контакт очень профессиональный, и их приложение с виртуальным туром работает хорошо.",
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
              "leading-none",
              "text-[18px]",
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
      preserveAspectRatio="none"
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

function TestimonialCard({
  data,
  mobile = false,
}: {
  data: Testimonial;
  mobile?: boolean;
}) {
  return (
    <article
      className={[
        "relative shrink-0",
        mobile ? "w-[285px]" : "w-[90vw] max-w-[419px] xl:w-[419px]",
      ].join(" ")}
    >
      <div
        className={[
          "relative w-full",
          mobile ? "h-[372px]" : "h-[440px] sm:h-[470px]",
        ].join(" ")}
      >
        <TestimonialShape />

        <button
          type="button"
          className={[
            "absolute z-[3]",
            "top-[0px] right-[0px]",
            mobile
              ? "grid h-[58px] w-[58px] place-items-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-border"
              : "grid h-[70px] w-[70px] place-items-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] border border-border",
          ].join(" ")}
          aria-label="Открыть отзыв"
        >
          <Image
            src="/objects/tgArr.svg"
            alt=""
            width={mobile ? 22 : 30}
            height={mobile ? 22 : 30}
          />
        </button>

        <div
          className={[
            "relative z-[2]",
            mobile ? "px-5 py-5" : "px-6 py-7 sm:px-8 sm:py-8",
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className={[
                  "font-medium text-text",
                  mobile ? "text-[16px]" : "text-[20px] sm:text-[22px]",
                ].join(" ")}
              >
                {data.name}
              </div>

              <div className={mobile ? "mt-3" : "mt-3"}>
                <Stars rating={data.rating} />
              </div>

              <div
                className={[
                  "text-textSecondary",
                  mobile ? "mt-3 text-[11px]" : "mt-3 text-[12px]",
                ].join(" ")}
              >
                {data.date}
              </div>
            </div>

            <div
              className={mobile ? "w-[46px]" : "w-[60px]"}
              aria-hidden="true"
            />
          </div>

          <div
            className={[
              "w-full border-t border-dashed border-borderSoft",
              mobile ? "mt-6" : "mt-7 sm:mt-8",
            ].join(" ")}
          />

          <p
            className={[
              "text-textSecondary",
              mobile
                ? "mt-5 text-[12px] leading-[1.45]"
                : "mt-6 sm:mt-8 text-[13px] leading-[1.6]",
            ].join(" ")}
          >
            {data.text}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);

  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  const maxIndex = useMemo(() => {
    return Math.max(0, testimonials.length - perView);
  }, [perView]);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1280) setPerView(3);
      else if (w >= 1024) setPerView(2);
      else setPerView(1);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const scrollDesktopToIndex = (next: number) => {
    const track = desktopTrackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(next, maxIndex));
    setIndex(clamped);

    const first = track.querySelector<HTMLElement>("[data-card='true']");
    if (!first) return;

    const gapPx = 24;
    const cardW = first.offsetWidth;
    const left = clamped * (cardW + gapPx);

    track.scrollTo({ left, behavior: "smooth" });
  };

  const scrollMobileToIndex = (next: number) => {
    const track = mobileTrackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(next, testimonials.length - 1));
    setIndex(clamped);

    const card = track.children[clamped] as HTMLElement | undefined;
    if (!card) return;

    const targetLeft =
      card.offsetLeft - track.clientWidth / 2 + card.clientWidth / 2;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const safeLeft = Math.max(0, Math.min(targetLeft, maxScroll));

    track.scrollTo({ left: safeLeft, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (window.innerWidth < 1024) {
      scrollMobileToIndex(index - 1);
    } else {
      scrollDesktopToIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (window.innerWidth < 1024) {
      scrollMobileToIndex(index + 1);
    } else {
      scrollDesktopToIndex(index + 1);
    }
  };

  const handleMobileScroll = () => {
    const track = mobileTrackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;

    const center = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== index) {
      setIndex(closestIndex);
    }
  };

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) return;

    const targetLeft =
      firstCard.offsetLeft - track.clientWidth / 2 + firstCard.clientWidth / 2;

    track.scrollTo({ left: Math.max(0, targetLeft) });
  }, []);

  const isDesktopSlider = perView >= 2;

  return (
    <section className="w-full bg-bg py-[70px] lg:py-[120px]">
      <Container>
        {/* MOBILE */}
        <div className="lg:hidden">
          <h2 className="text-center text-[24px] font-medium leading-[1.1] tracking-[-0.02em] text-text">
            Что о нас
            <br />
            думаютнаши клиенты
          </h2>

          <div className="mt-6 -mx-4">
            <div
              ref={mobileTrackRef}
              onScroll={handleMobileScroll}
              className="flex gap-4 overflow-x-auto px-4 pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((t) => (
                <div key={t.id} className="shrink-0 snap-center">
                  <TestimonialCard data={t} mobile />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={index === 0}
              className="grid h-[30px] w-[78px] place-items-center rounded-full bg-graphite transition disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Назад"
            >
              <span className="text-[18px] leading-none text-white">←</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={index >= testimonials.length - 1}
              className="grid h-[30px] w-[78px] place-items-center rounded-full bg-[#F1F1F1] transition disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Вперёд"
            >
              <span className="text-[18px] leading-none text-[#D4D4D4]">→</span>
            </button>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between gap-6">
            <h2 className="text-[46px] font-medium tracking-[-0.02em] text-text max-lg:text-[28px]">
              Что о нас думают наши клиенты
            </h2>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={!isDesktopSlider || index === 0}
                className="grid h-[44px] w-[66px] place-items-center rounded-full border border-border bg-white transition hover:bg-surfaceAlt disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Назад"
              >
                <span className="text-[18px]">←</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!isDesktopSlider || index >= maxIndex}
                className="grid h-[44px] w-[66px] place-items-center rounded-full bg-graphite transition hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Вперёд"
              >
                <span className="text-[18px] text-primary">→</span>
              </button>
            </div>
          </div>

          <div className="mt-10">
            <div
              ref={desktopTrackRef}
              className={[
                "flex gap-6 overflow-x-auto scroll-smooth pb-2",
                "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
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
        </div>
      </Container>
    </section>
  );
}
