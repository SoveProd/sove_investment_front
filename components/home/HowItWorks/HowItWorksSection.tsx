"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { ArrowButton } from "@/components/ui/ArrowBtn";

type Step = {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt?: string;
};

const steps: Step[] = [
  {
    id: "1",
    tabLabel: "Оставь заявку",
    title: "Оставь заявку",
    description:
      "Заполни короткую форму — мы свяжемся, уточним цели и предложим подходящую стратегию.",
    ctaLabel: "Посмотреть готовые кейсы",
    ctaHref: "#",
    imageSrc: "/images/hero.jpg",
    imageAlt: "",
  },
  {
    id: "2",
    tabLabel: "Проконсультируйся",
    title: "Проконсультируйся",
    description:
      "Обсудим бюджет, сроки и цели. Подберём формат работы и команду под проект.",
    ctaLabel: "Посмотреть готовые кейсы",
    ctaHref: "#",
    imageSrc: "/images/statsimg1.jpg",
    imageAlt: "",
  },
  {
    id: "3",
    tabLabel: "Наблюдай за проектом",
    title: "Наблюдай за проектом",
    description:
      "От дизайна до ремонта — мы всё координируем. Ты получаешь еженедельные отчёты и фото/видео-обновления.",
    ctaLabel: "Посмотреть готовые кейсы",
    ctaHref: "#",
    imageSrc: "/images/hero.jpg",
    imageAlt: "",
  },
  {
    id: "4",
    tabLabel: "Получай Прибыль",
    title: "Получай Прибыль",
    description:
      "После завершения проекта помогаем с продажей/сдачей. Ты фиксируешь прибыль и масштабируешься.",
    ctaLabel: "Посмотреть готовые кейсы",
    ctaHref: "#",
    imageSrc: "/images/statsimg2.jpg",
    imageAlt: "",
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(2);

  const current = useMemo(() => steps[active], [active]);

  return (
    <section className="w-full bg-bg py-[150px] max-lg:py-[80px]">
      <Container>
        {/* Header */}
        <div className="text-center">
          <h2 className="text-[55px] font-medium tracking-[-0.02em] text-text max-lg:text-[34px]">
            Как это работает
          </h2>
          <p className="mt-2 text-[18px] text-text max-lg:text-[16px]">
            Четыре простых шагов к прибыли
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mt-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {steps.map((s, idx) => {
              const isActive = idx === active;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={[
                    "h-[44px] w-full rounded-full border px-5 text-[14px] font-medium transition",
                    isActive
                      ? "border-graphite bg-graphite text-white"
                      : "border-border bg-white text-text hover:border-graphite/40",
                  ].join(" ")}
                >
                  {s.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Dots under tabs */}
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {steps.map((s, idx) => {
              const isActive = idx === active;

              return (
                <div key={s.id} className="flex items-center justify-center">
                  <span
                    className={[
                      "block h-[5px] w-[5px] rounded-full transition",
                      isActive ? "bg-graphite" : "bg-borderSoft",
                    ].join(" ")}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left card */}
          <div className="lg:col-span-6">
            <div className="relative flex h-full flex-col rounded-[48px] border border-border bg-white p-18 max-lg:p-8 lg:h-[730px]">
              {/* Top: index */}
              <div className="text-[45px] font-medium text-[#E7E7E7]">
                [ {current.id} ]
              </div>

              {/* Bottom block: title + text + CTA (прижато вниз) */}
              <div className="mt-auto">
                <h3 className="text-[50px] font-medium tracking-[-0.02em] text-text max-lg:text-[28px]">
                  {current.title}
                </h3>

                <p className="mt-5 max-w-[520px] text-[22px] leading-6 text-text max-lg:text-[22px]">
                  {current.description}
                </p>

                <div className="mt-10">
                  <ArrowButton
                    label={current.ctaLabel}
                    href={current.ctaHref}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[48px] border border-border bg-white lg:h-[730px]">
              <Image
                src={current.imageSrc}
                alt={current.imageAlt || ""}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
