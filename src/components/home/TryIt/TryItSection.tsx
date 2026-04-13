"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/src/components/layout/Container";
import { ArrowButton } from "@/src/components/ui/ArrowBtn";
import { TryItCarousel } from "./TryItCarousel";
import type { CmsBlock, CmsButton } from "@/lib/cms/types";
import { getCmsMediaUrl } from "@/lib/cms/mediaUrl";

type Props = {
  block?: CmsBlock;
};

type TryItItem = {
  title: string;
  img: string;
};

function getBlockItems(block?: CmsBlock): TryItItem[] {
  const contentItems =
    block?.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: Array<{ text?: string }> }).items)
      ? (block.content as { items: Array<{ text?: string }> }).items
      : [];

  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });

  const fallbackItems: TryItItem[] = [
    { title: "Подрядчики", img: "/images/pathimg.jpg" },
    { title: "Строители", img: "/images/hero.jpg" },
    { title: "Инвесторы", img: "/images/statsimg1.jpg" },
    { title: "Девелоперы", img: "/images/statsimg2.jpg" },
    { title: "Арендаторы", img: "/images/pathimg.jpg" },
  ];

  const maxLength = Math.max(
    contentItems.length,
    media.length,
    fallbackItems.length,
  );

  return Array.from({ length: maxLength })
    .map((_, index) => ({
      title:
        contentItems[index]?.text ||
        fallbackItems[index]?.title ||
        `Item ${index + 1}`,
      img:
        getCmsMediaUrl(media[index]) ||
        fallbackItems[index]?.img ||
        "/images/pathimg.jpg",
    }))
    .filter((item) => item.title || item.img);
}

export default function TryItSection({ block }: Props) {
  const buttons: CmsButton[] = Array.isArray(block?.button)
    ? block.button
    : block?.button
      ? [block.button]
      : [];

  const items = useMemo(() => getBlockItems(block), [block]);

  const [activeIndex, setActiveIndex] = useState(0);

  const safeActiveIndex = activeIndex >= items.length ? 0 : activeIndex;
  const nextIndex = items.length > 0 ? (safeActiveIndex + 1) % items.length : 0;

  const handlePrev = () => {
    if (!items.length) return;
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!items.length) return;
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const title = block?.title || "Или попробуй сам";
  const description =
    block?.text ||
    "SOVE — это полный сервис управления real estate инвестициями.";
  const buttonLabel =
    buttons.find((button) => button.position === 0)?.name || "Попробовать";

  if (!items.length) return null;

  return (
    <section className="w-full bg-white py-[56px] sm:py-[80px] lg:py-[110px] 2xl:py-[150px]">
      <div className="lg:hidden">
        <div className="rounded-[28px] bg-surface py-6 pl-6">
          <h2 className="text-[18px] font-medium leading-[1.05] tracking-[-0.03em] text-text">
            {title}
          </h2>

          <p className="mt-2 max-w-[240px] text-[11px] leading-[1.2] text-text-graphite">
            {description}
          </p>

          <div className="mt-3 flex items-center gap-[6px]">
            {items.map((_, index) => {
              const isActive = index === safeActiveIndex;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Переключить на ${index + 1}`}
                  className={clsx(
                    "h-[8px] rounded-full transition-all duration-300",
                    isActive ? "w-[35px] bg-primary" : "w-[35px] bg-[#E8E8E8]",
                  )}
                />
              );
            })}
          </div>

          <div className="mt-4 overflow-hidden">
            <div className="flex items-start gap-[10px]">
              <div className="w-[263px] shrink-0">
                <div className="relative overflow-hidden rounded-[22px] bg-white">
                  <div className="relative h-[290px] w-[263px]">
                    <Image
                      src={items[safeActiveIndex].img}
                      alt={items[safeActiveIndex].title}
                      fill
                      sizes="263px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <p className="mt-3 text-center text-[13px] font-normal uppercase leading-none tracking-[0.03em] text-text-graphite">
                  {items[safeActiveIndex].title}
                </p>

                <div className="mt-3 flex justify-center gap-[10px]">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Предыдущий слайд"
                    className="flex h-[24px] w-[56px] items-center justify-center rounded-full bg-[#4A4A4A] transition-opacity duration-200 hover:opacity-90"
                  >
                    <span className="text-[16px] leading-none text-white">
                      ←
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Следующий слайд"
                    className="flex h-[24px] w-[56px] items-center justify-center rounded-full bg-[#ECECEC] transition-opacity duration-200 hover:opacity-90"
                  >
                    <span className="text-[16px] leading-none text-[#CFCFCF]">
                      →
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-[264px] shrink-0">
                <div className="relative overflow-hidden rounded-[22px] bg-white">
                  <div className="relative h-[356px] w-[264px]">
                    <Image
                      src={items[nextIndex].img}
                      alt={items[nextIndex].title}
                      fill
                      sizes="264px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ArrowButton label={buttonLabel} href="#" mobile />
          </div>
        </div>
      </div>

      <Container className="hidden lg:block">
        <div className="rounded-[28px] sm:rounded-[40px] 2xl:rounded-[48px] bg-surface sm:px-8 lg:px-10 2xl:px-0 py-6 sm:py-10 lg:py-14 2xl:py-[120px]">
          <div className="grid grid-cols-12 items-stretch gap-8 lg:gap-10">
            <div className="col-span-12 flex flex-col justify-between lg:col-span-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  {items.map((_, index) => {
                    const isActive = index === safeActiveIndex;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Переключить на ${index + 1}`}
                        className={[
                          "transition-opacity duration-200",
                          "h-[14px] w-[46px] rounded-[42px] sm:h-[16px] sm:w-[52px]",
                          isActive
                            ? "bg-primary opacity-100"
                            : "bg-border-soft opacity-100",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>

                <p className="mt-5 text-[16px] leading-relaxed text-text-graphite sm:mt-7 sm:text-[18px] lg:text-[18px] 2xl:text-[24px]">
                  {description}
                </p>
              </div>

              <div className="mt-10 lg:mt-12 2xl:mt-16">
                <h2 className="text-[30px] font-medium tracking-tight text-text sm:text-[34px] lg:text-[34px] 2xl:text-[56px]">
                  {title}
                </h2>

                <div className="mt-5 2xl:mt-6">
                  <ArrowButton label={buttonLabel} href="#" />
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <TryItCarousel
                items={items}
                activeIndex={safeActiveIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
