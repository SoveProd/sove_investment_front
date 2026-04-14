"use client";

import Image from "next/image";
import { useMemo, useState, useRef, useEffect } from "react";
import { Container } from "@/src/components/layout/Container";
import { ArrowButton } from "@/src/components/ui/ArrowBtn";
import type { CmsBlock, CmsMedia } from "@/lib/cms/types";
import { getCmsMediaUrl } from "@/lib/cms/mediaUrl";

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

const fallbackSteps: Step[] = [
  {
    id: "1",
    tabLabel: "Оставь заявку",
    title: "Оставь заявку",
    description:
      "Заполни короткую форму — мы свяжемся, уточним цели и предложим подходящую стратегию.",
    ctaLabel: "Посмотреть готовые кейсы",
    ctaHref: "#",
    imageSrc: "/images/hero.jpg",
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
  },
  {
    id: "3",
    tabLabel: "Веди проект",
    title: "Веди проект\nв прозрачной системе",
    description:
      "Наблюдаешь за процессом в единой системе: этапы, сроки, бюджеты, статусы, отчёты и фото-обновления.",
    ctaLabel: "Посмотреть готовые кейсы",
    ctaHref: "#",
    imageSrc: "/images/hero.jpg",
  },
  {
    id: "4",
    tabLabel: "Получай прибыль",
    title: "Получай прибыль",
    description: "После завершения проекта помогаем с продажей или сдачей.",
    ctaLabel: "Посмотреть готовые кейсы",
    ctaHref: "#",
    imageSrc: "/images/statsimg2.jpg",
  },
];

function normalizeMedia(block?: CmsBlock | null) {
  const media = Array.isArray(block?.media) ? (block?.media as CmsMedia[]) : [];
  return [...media].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });
}

function mapCmsHowItWorksToSteps(block?: CmsBlock | null): Step[] {
  const contentItems =
    block?.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{
              title?: string | null;
              subtitle?: string | null;
              text?: string | null;
              button?: string | null;
            }>;
          }
        ).items
      : [];

  const media = normalizeMedia(block);

  const maxLength = Math.max(contentItems.length, media.length, fallbackSteps.length);

  return Array.from({ length: maxLength }).map((_, index) => {
    const fallback = fallbackSteps[index] || fallbackSteps[0];
    const item = contentItems[index];
    const m = media[index];
    const imageSrc =
      (m ? getCmsMediaUrl(m) : null) || fallback?.imageSrc || "/images/hero.jpg";

    return {
      id: String(index + 1),
      tabLabel: item?.title || fallback?.tabLabel || `Шаг ${index + 1}`,
      title: item?.subtitle || fallback?.title || "",
      description: item?.text || fallback?.description || "",
      ctaLabel: item?.button || fallback?.ctaLabel || "Попробовать",
      ctaHref: fallback?.ctaHref || "#",
      imageSrc,
      imageAlt: m?.file_name || fallback?.imageAlt || "",
    };
  });
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";

export default function HowItWorksSection() {
  const [block, setBlock] = useState<CmsBlock | undefined>(undefined);
  const [active, setActive] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const tabsViewportRef = useRef<HTMLDivElement>(null);
  const tabsTrackRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(() => mapCmsHowItWorksToSteps(block), [block]);
  const current = useMemo(() => steps[active], [active, steps]);

  useEffect(() => {
    let cancelled = false;

    async function loadHowItWorks() {
      try {
        const response = await fetch(`${API_BASE}/static-pages/homepage`, {
          headers: {
            Accept: "application/json",
            "x-client-type": "web",
          },
        });

        if (!response.ok) return;

        const homepage = (await response.json()) as { blocks?: CmsBlock[] };
        const howItWorks = homepage.blocks?.find(
          (b) => b.block_type === "how_it_works:main",
        );

        if (!cancelled) {
          setBlock(howItWorks);
        }
      } catch {
        // ignore
      }
    }

    loadHowItWorks();

    return () => {
      cancelled = true;
    };
  }, []);

  const centerActiveTab = (index: number) => {
    const viewport = tabsViewportRef.current;
    const track = tabsTrackRef.current;
    if (!viewport || !track) return;

    const tab = track.children[index] as HTMLElement | undefined;
    if (!tab) return;

    const viewportWidth = viewport.clientWidth;
    const targetLeft = tab.offsetLeft - viewportWidth / 2 + tab.offsetWidth / 2;

    const maxScroll = track.scrollWidth - viewportWidth;
    const safeLeft = Math.max(0, Math.min(targetLeft, maxScroll));

    viewport.scrollTo({
      left: safeLeft,
      behavior: "smooth",
    });
  };

  const scrollToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slide = slider.children[index] as HTMLElement | undefined;
    if (!slide) return;

    setActive(index);

    slider.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    centerActiveTab(active);
  }, [active]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const firstSlide = slider.children[0] as HTMLElement | undefined;
    if (!firstSlide) return;

    slider.scrollTo({ left: firstSlide.offsetLeft });
    centerActiveTab(0);
  }, []);

  const handleSliderScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = Array.from(slider.children) as HTMLElement[];
    if (!slides.length) return;

    const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(sliderCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== active) {
      setActive(closestIndex);
    }
  };

  return (
    <section className="w-full bg-bg py-[56px] sm:py-[80px] lg:py-[150px]">
      <Container>
        {/* MOBILE */}
        <div className="lg:hidden">
          <div className="text-center">
            <h2 className="text-[24px] font-medium text-text">
              {block?.title || "Как это работает"}
            </h2>

            <p className="mt-2 text-[14px] text-textSecondary">
              {block?.subtitle || block?.text || "Четыре простых шагов к прибыли"}
            </p>
          </div>

          {/* TABS */}
          <div
            ref={tabsViewportRef}
            className="mt-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div ref={tabsTrackRef} className="flex w-max gap-2 px-[16px]">
              {steps.map((s, idx) => {
                const isActive = idx === active;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToSlide(idx)}
                    className={[
                      "px-4 py-2 rounded-full text-[14px] whitespace-nowrap transition",
                      "border border-border",
                      isActive
                        ? "bg-white text-text"
                        : "bg-transparent text-text",
                    ].join(" ")}
                  >
                    {s.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DOTS */}
          <div className="mt-3 flex justify-center gap-2">
            {steps.map((_, idx) => {
              const isActive = idx === active;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Перейти к шагу ${idx + 1}`}
                  className={[
                    "h-[6px] w-[6px] rounded-full transition-colors duration-300",
                    isActive ? "bg-[#383838]" : "bg-borderSoft",
                  ].join(" ")}
                />
              );
            })}
          </div>

          {/* CAROUSEL */}
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            className="mt-6 overflow-x-auto flex snap-x snap-mandatory gap-4 pb-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {steps.map((step) => {
              return (
                <div key={step.id} className="min-w-full snap-center">
                  <div className="rounded-[28px] bg-white px-5 py-5">
                    <div className="text-[22px] text-[#E7E7E7]">
                      [{step.id}]
                    </div>

                    <div className="mt-16">
                      <h3 className="text-[18px] font-medium whitespace-pre-line">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-[12px] text-textSecondary">
                        {step.description}
                      </p>

                      <div className="mt-6">
                        <ArrowButton
                          label={step.ctaLabel}
                          href={step.ctaHref}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="relative rounded-[28px] overflow-hidden">
                      <div className="relative aspect-343/286">
                        <Image
                          src={step.imageSrc}
                          alt={step.imageAlt || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP (оставил как у тебя) */}
        <div className="hidden lg:block">
          {/* твой desktop код без изменений */}
          <div className="text-center">
            <h2 className="text-[55px] font-medium tracking-[-0.02em] text-text max-lg:text-[34px]">
              {block?.title || "Как это работает"}
            </h2>
            <p className="mt-2 text-[18px] text-text max-lg:text-[16px]">
              {block?.subtitle || block?.text || "Четыре простых шагов к прибыли"}
            </p>
          </div>

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
                      "flex h-[79px] w-full items-center justify-center rounded-[79px] px-6 text-center transition-all duration-300",
                      "text-[18px] font-medium leading-none xl:text-[20px]",
                      isActive
                        ? "bg-[#383838] text-white"
                        : "border border-border bg-white text-text hover:border-[#383838]/40",
                    ].join(" ")}
                  >
                    {s.tabLabel}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {steps.map((s, idx) => {
                const isActive = idx === active;

                return (
                  <div key={s.id} className="flex items-center justify-center">
                    <span
                      className={[
                        "block h-[6px] w-[6px] rounded-full transition-all duration-300",
                        isActive ? "bg-[#383838]" : "bg-borderSoft",
                      ].join(" ")}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="relative flex h-full flex-col rounded-[48px] border border-border bg-white p-18 max-lg:p-8 lg:h-[730px]">
                <div className="text-[45px] font-medium text-[#E7E7E7]">
                  [{current.id}]
                </div>

                <div className="mt-auto">
                  <h3 className="text-[50px] font-medium tracking-[-0.02em] text-text max-lg:text-[28px] whitespace-pre-line">
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
        </div>
      </Container>
    </section>
  );
}
