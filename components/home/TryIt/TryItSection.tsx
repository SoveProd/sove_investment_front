// components/try-it/TryItSection.tsx
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
    <section className="w-full bg-white pb-[150px] max-lg:py-[80px]">
      <Container>
        <div className="rounded-[48px] bg-surface py-[120px] max-lg:px-6 max-lg:py-10">
          <div className="grid grid-cols-12 gap-10 items-stretch">
            {/* LEFT (1/3) */}
            <div className="col-span-4 flex flex-col justify-between max-lg:col-span-12">
              {/* Top block */}
              <div>
                <div className="flex items-center gap-3">
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
                          "h-[17px] w-[53px] rounded-[42px]",
                          isActive
                            ? "bg-primary opacity-100"
                            : "bg-border-soft opacity-100",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>

                <p className="mt-7 max-w-sm text-[24px] leading-relaxed text-text-graphite">
                  “SOVE — это полный сервис управления real estate
                  инвестициями.”
                </p>
              </div>

              {/* Bottom block */}
              <div className="mt-16 max-lg:mt-10">
                <h2 className="text-[56px] font-medium tracking-tight text-text max-lg:text-[36px]">
                  Или попробуй сам
                </h2>

                <div className="mt-6">
                  <ArrowButton label="Попробовать" href="#" />
                </div>
              </div>
            </div>

            {/* RIGHT (2/3) */}
            <div className="col-span-8 max-lg:col-span-12">
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
