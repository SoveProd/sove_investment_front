"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";

type WhyItem = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  imageSrc: string;
  imageAlt?: string;
};

const items: WhyItem[] = [
  {
    id: "1",
    title: "Управление от а до я",
    description:
      "Берём на себя весь цикл: анализ объекта, стратегия, дизайн, ремонт, контроль подрядчиков и финальная упаковка проекта.",
    bullets: ["Прозрачный процесс", "Контроль сроков и бюджета"],
    imageSrc: "/images/statsimg1.jpg",
    imageAlt: "",
  },
  {
    id: "2",
    title: "Сохранение богатства и рост",
    description:
      "Инвестиции в недвижимость помогают диверсифицировать капитал и сохранять стоимость в долгосрочной перспективе.",
    bullets: ["Диверсификация портфеля", "Защита от инфляции"],
    imageSrc: "/images/statsimg2.jpg",
    imageAlt: "",
  },
  {
    id: "3",
    title: "Дизайн повышает стоимость",
    description:
      "Грамотный интерьер повышает ликвидность и цену объекта — особенно в сегменте аренды и перепродажи.",
    bullets: ["Быстрее сдаётся/продаётся", "Выше средний чек"],
    imageSrc: "/images/hero.jpg",
    imageAlt: "",
  },
  {
    id: "4",
    title: "Доказанные дизайн-концепции",
    description:
      "Мы применяем только проверенные стратегии дизайна, которые повышают стоимость недвижимости. Каждая концепция протестирована на десятках объектов и гарантирует результат.",
    bullets: ["Дизайн, который работает", "Стоимость растёт гарантированно"],
    imageSrc: "/images/hero.jpg",
    imageAlt: "",
  },
];

export default function WhyInvestAccordionSection() {
  const [activeId, setActiveId] = useState(items[3]?.id || items[0].id);

  const activeItem = useMemo(
    () => items.find((x) => x.id === activeId) || items[0],
    [activeId],
  );

  return (
    <section className="w-full bg-bg py-[150px] max-lg:py-[80px]">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT TEXT */}
          <div className="lg:col-span-4">
            <h2 className="text-[40px] font-medium tracking-[-0.02em] text-dark max-lg:text-[30px] leading-[1.1]">
              Почему нужно
              <br />
              инвестировать
              <br />с SOVE?
            </h2>

            <p className="mt-6 text-[14px] leading-6 text-text max-lg:text-[14px]">
              Исторически частная недвижимость обладает характеристиками,
              которых нет у других активов — долгосрочный потенциал и
              эффективная диверсификация портфеля.
            </p>

            <p className="mt-6 text-[14px] leading-6 text-text max-lg:text-[14px]">
              SOVE объединяет инвестиции, дизайн и управление в одну платформу
              для максимальной прибыли.
            </p>
          </div>

          {/* RIGHT ACCORDION CARD */}
          <div className="lg:col-span-8">
            <div className="rounded-[28px] bg-white p-6 max-lg:p-4 border border-border">
              {/* Accordion list */}
              <div className="divide-y divide-border">
                {items.map((it) => {
                  const isOpen = it.id === activeId;

                  return (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => setActiveId(it.id)}
                      className="w-full text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center justify-between gap-6 py-4">
                        <div className="text-[14px] text-dark">{it.title}</div>

                        {/* маленькое превью справа (как на скрине) */}
                        <div className="relative h-[28px] w-[86px] overflow-hidden rounded-[10px] bg-bg shrink-0">
                          <Image
                            src={it.imageSrc}
                            alt={it.imageAlt || ""}
                            fill
                            className="object-cover"
                            sizes="86px"
                          />
                        </div>
                      </div>

                      {/* раскрывающаяся часть */}
                      <div
                        className={[
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-5 pr-2">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                              <div className="lg:col-span-7">
                                <h3 className="text-[18px] font-medium text-dark">
                                  {it.title}
                                </h3>

                                <p className="mt-3 text-[13px] leading-6 text-text">
                                  {it.description}
                                </p>

                                {it.bullets?.length ? (
                                  <div className="mt-4 space-y-2 text-[13px] text-text">
                                    {it.bullets.map((b) => (
                                      <div key={b} className="leading-5">
                                        + {b}.
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                              </div>

                              {/* Большая картинка справа (только в открытом пункте) */}
                              <div className="lg:col-span-5">
                                <div className="relative h-[220px] w-full overflow-hidden rounded-[18px] bg-bg">
                                  <Image
                                    src={it.imageSrc}
                                    alt={it.imageAlt || ""}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 420px"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
