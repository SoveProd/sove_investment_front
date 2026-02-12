"use client";

import Image from "next/image";
import { useState } from "react";

type Zone = {
  title: string;
  text?: string;
};

const zones: Zone[] = [
  {
    title: "Современный дизайн",
    text: "Наши дизайнеры создают концепции, которые подрастают дороже: тренды, материалы, стиль — всё рассчитано на максимальную стоимость.",
  },
  {
    title: "Профессиональное\nуправление",
    text: "Берём на себя процесс от стратегии до ремонта: сроки, подрядчики, контроль качества и регулярные отчёты.",
  },
  {
    title: "Гарантированная ROI",
    text: "Работаем на результат. Мы повышаем ликвидность объекта и помогаем выйти на целевую прибыль через грамотный продукт.",
  },
];

export function ThreeHoverZones() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative grid h-full w-full grid-cols-3">
        {zones.map((z, idx) => {
          const isActive = active === idx;

          return (
            <button
              key={idx}
              type="button"
              className={[
                "relative h-full w-full outline-none",
                idx !== 0 ? "border-l border-white/20" : "",
              ].join(" ")}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(idx)}
              onBlur={() => setActive(null)}
            >
              {/* Overlay всегда в DOM — меняем только классы */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className={[
                    "absolute inset-0",
                    "bg-black/25",
                    // плавно для opacity + blur
                    "transition-[opacity,backdrop-filter] duration-500 ease-out",
                    "will-change-[opacity,backdrop-filter] transform-gpu",
                    // стартовое состояние
                    isActive
                      ? "opacity-100 backdrop-blur-[14px]"
                      : "opacity-0 backdrop-blur-0",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </div>

              {/* Text */}
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <div className="max-w-[320px]">
                  <div className="whitespace-pre-line text-[24px] font-medium leading-[1.1] text-white">
                    {z.title}
                  </div>

                  <p
                    className={[
                      "mt-4 text-[12px] leading-5 text-white/80",
                      "transition-opacity duration-400 ease-out",
                      isActive ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  >
                    {z.text}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
