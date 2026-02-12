"use client";

import Image from "next/image";
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
    <article className="relative shrink-0 w-[419px]">
      <div className="relative h-[470px] w-full">
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
        <div className="relative z-[2] px-8 py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[22px] font-medium text-text">
                {data.name}
              </div>

              <div className="mt-3">
                <Stars rating={data.rating} />
              </div>

              <div className="mt-3 text-[12px] text-textSecondary">
                {data.date}
              </div>
            </div>

            {/* чтобы контент не заходил под кружок */}
            <div className="w-[60px]" aria-hidden="true" />
          </div>

          {/* dashed divider */}
          <div className="mt-8 w-full border-t border-dashed border-borderSoft" />

          <p className="mt-8 text-[13px] leading-[1.6] text-textSecondary">
            {data.text}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section className="w-full bg-bg py-[120px] max-lg:py-[70px]">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-[46px] font-medium tracking-[-0.02em] text-text max-lg:text-[28px]">
            Что о нас думают наши клиенты
          </h2>

          {/* arrows (как на скрине) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-[44px] w-[66px] place-items-center rounded-full border border-border bg-white transition hover:bg-surfaceAlt"
              aria-label="Назад"
            >
              <span className="text-[18px]">←</span>
            </button>

            <button
              type="button"
              className="grid h-[44px] w-[66px] place-items-center rounded-full bg-graphite transition hover:opacity-95"
              aria-label="Вперёд"
            >
              <span className="text-[18px] text-primary">→</span>
            </button>
          </div>
        </div>

        {/* DESKTOP: space-between */}
        <div className="mt-10 hidden lg:flex justify-between">
          {testimonials.slice(0, 4).map((t) => (
            <TestimonialCard key={t.id} data={t} />
          ))}
        </div>

        {/* MOBILE/TABLET: горизонтальный скролл */}
        <div className="mt-10 lg:hidden">
          <div className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} data={t} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
