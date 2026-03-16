"use client";

import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { Container } from "@/components/layout/Container";

export type MethodAccordionItem = {
  id: string;
  title: string;
  description?: string;
  bullets?: ReadonlyArray<string>;
  imageSrc: string;
  imageAlt?: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: ReadonlyArray<MethodAccordionItem>;
  className?: string;
  defaultOpenId?: string;
};

export function MethodAccordionSection({
  title,
  subtitle,
  items,
  className = "",
  defaultOpenId,
}: Props) {
  const defaultIndex = (() => {
    if (!items.length) return 0;
    const foundIndex = defaultOpenId
      ? items.findIndex((item) => item.id === defaultOpenId)
      : 0;
    return foundIndex >= 0 ? foundIndex : 0;
  })();

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <section
      className={clsx("w-full bg-white py-[90px] max-lg:py-[70px]", className)}
    >
      <Container>
        <div className="grid grid-cols-12 gap-10 max-lg:gap-8">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-3">
            <h2 className="text-[44px] font-medium leading-tight text-[#1f1f1f] max-lg:text-[32px]">
              {title}
            </h2>

            <p className="mt-4 max-w-[220px] text-[14px] leading-relaxed text-black/45">
              {subtitle}
            </p>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-9">
            <div className="rounded-[22px] border border-black/10 bg-white p-0 overflow-hidden">
              <div className="flex flex-col">
                {items.map((item, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={clsx(
                        "w-full text-left transition-colors duration-300",
                        idx !== 0 && "border-t border-black/10",
                        isActive
                          ? "bg-white"
                          : "bg-white hover:bg-black/[0.015]",
                      )}
                    >
                      <div
                        className={clsx(
                          "grid grid-cols-12 items-start gap-6 px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-lg:px-4",
                          isActive ? "py-6 max-lg:py-4" : "py-3 max-lg:py-3",
                        )}
                      >
                        {/* TEXT SIDE */}
                        <div className="col-span-12 lg:col-span-7">
                          <div className="flex items-start justify-between gap-4">
                            <h3
                              className={clsx(
                                "font-medium text-[#1f1f1f] transition-all duration-300",
                                isActive
                                  ? "text-[24px] leading-tight max-lg:text-[20px]"
                                  : "text-[20px] leading-tight max-lg:text-[17px]",
                              )}
                            >
                              {item.title}
                            </h3>
                          </div>

                          <div
                            className={clsx(
                              "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              isActive
                                ? "mt-4 max-h-[260px] opacity-100"
                                : "max-h-0 opacity-0",
                            )}
                          >
                            {item.description ? (
                              <p className="max-w-[520px] text-[13px] leading-relaxed text-black/60">
                                {item.description}
                              </p>
                            ) : null}

                            {item.bullets?.length ? (
                              <ul className="mt-4 space-y-2 text-[13px] text-black/60">
                                {item.bullets.map((bullet) => (
                                  <li key={bullet} className="flex gap-3">
                                    <span className="mt-[7px] h-[4px] w-[4px] rounded-full bg-black/30" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </div>

                        {/* IMAGE SIDE */}
                        <div className="col-span-12 lg:col-span-5">
                          <div
                            className={clsx(
                              "relative ml-auto overflow-hidden rounded-[14px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              isActive
                                ? "h-[180px] w-full max-w-[290px] max-lg:h-[200px] max-lg:max-w-full"
                                : "h-[34px] w-full max-w-[290px] max-lg:h-[40px] max-lg:max-w-full",
                            )}
                          >
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt ?? item.title}
                              fill
                              className={clsx(
                                "object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                isActive
                                  ? "scale-100 brightness-100"
                                  : "scale-[1.02] brightness-90",
                              )}
                              sizes="(max-width: 1024px) 100vw, 290px"
                            />

                            <div
                              className={clsx(
                                "absolute inset-0 transition-colors duration-500",
                                isActive ? "bg-black/5" : "bg-black/15",
                              )}
                            />
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
