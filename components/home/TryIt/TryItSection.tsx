"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { ArrowButton } from "@/components/ui/ArrowBtn";
import { TryItCarousel } from "../TryIt/TryItCarousel";

const fakeData = [
  { title: "Подрядчики", img: "/images/pathimg.jpg" },
  { title: "Строители", img: "/images/hero.jpg" },
  { title: "Инвесторы", img: "/images/statsimg1.jpg" },
  { title: "Девелоперы", img: "/images/statsimg2.jpg" },
  { title: "Арендаторы", img: "/images/pathimg.jpg" },
];

export default function TryItSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-white py-[90px] sm:py-[100px] lg:py-[110px] 2xl:py-[150px]">
      <Container>
        <div className="rounded-[32px] sm:rounded-[40px] 2xl:rounded-[48px] bg-surface px-5 sm:px-8 lg:px-10 2xl:px-0 py-10 lg:py-14 2xl:py-[120px]">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
              {/* Top block */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  {fakeData.map((_, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Переключить на ${index + 1}`}
                        className={[
                          "transition-opacity duration-200",
                          "h-[14px] w-[46px] sm:h-[16px] sm:w-[52px] rounded-[42px]",
                          isActive
                            ? "bg-primary opacity-100"
                            : "bg-border-soft opacity-100",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>

                <p className="mt-5 sm:mt-7 max-w-sm text-[16px] sm:text-[18px] lg:text-[18px] 2xl:text-[24px] leading-relaxed text-text-graphite">
                  “SOVE — это полный сервис управления real estate
                  инвестициями.”
                </p>
              </div>

              {/* Bottom block */}
              <div className="mt-10 lg:mt-12 2xl:mt-16">
                <h2 className="font-medium tracking-tight text-text text-[30px] sm:text-[34px] lg:text-[34px] 2xl:text-[56px]">
                  Или попробуй сам
                </h2>

                <div className="mt-5 2xl:mt-6">
                  <ArrowButton label="Попробовать" href="#" />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 lg:col-span-8">
              <TryItCarousel
                items={fakeData}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
