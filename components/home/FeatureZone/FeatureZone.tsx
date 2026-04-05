"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type Zone = {
  title: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  zones: Zone[];
  imageSrc: string;
  overlayClassName?: string;
  heightClassName?: string;
};

export function ThreeHoverZones({
  zones,
  imageSrc,
  overlayClassName = "bg-black/35",
  heightClassName = "h-screen",
}: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className={`relative w-full overflow-hidden ${heightClassName}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {/* MOBILE */}
      {/* MOBILE */}
      <div className="relative z-20 h-full lg:hidden">
        <div className="flex h-full flex-col py-[80px]">
          {zones.map((z, idx) => (
            <div
              key={idx}
              className="relative flex flex-1 items-center justify-center px-6 text-center"
            >
              {idx !== 0 && (
                <div className="absolute top-0 left-1/2 h-[1px] w-[173px] -translate-x-1/2 bg-white/40" />
              )}

              <div className="flex max-w-[250px] flex-col items-center">
                <h3 className="whitespace-pre-line text-[18px] font-medium leading-[1.08] text-white">
                  {z.title}
                </h3>

                {z.text && (
                  <p className="mt-3 text-[12px] leading-[1.35] text-white/88">
                    {z.text}
                  </p>
                )}

                {z.ctaLabel && z.ctaHref && (
                  <div className="mt-5">
                    <Link
                      href={z.ctaHref}
                      className="inline-flex h-[45px] min-w-[183px] items-center justify-between rounded-full bg-white pl-5 pr-[4px] text-[12px] font-medium text-[#7B7B7B] shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                    >
                      <span className="whitespace-nowrap">{z.ctaLabel}</span>

                      <span className="ml-3 grid h-[32px] w-[32px] shrink-0 place-items-center rounded-full bg-[#3F3F3F]">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 7H17V15"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div
        className="relative hidden h-full w-full lg:grid"
        style={{ gridTemplateColumns: `repeat(${zones.length}, 1fr)` }}
      >
        {zones.map((z, idx) => {
          const isActive = active === idx;

          return (
            <div
              key={idx}
              className={[
                "relative h-full w-full",
                idx !== 0 ? "border-l border-white/20" : "",
              ].join(" ")}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
            >
              <button
                type="button"
                className="absolute inset-0 z-10 h-full w-full outline-none"
                onFocus={() => setActive(idx)}
                onBlur={() => setActive(null)}
                aria-label={z.title}
              />

              <div className="pointer-events-none absolute inset-0">
                <div
                  className={[
                    "absolute inset-0 bg-black/25",
                    "transition-[opacity,backdrop-filter] duration-500 ease-out",
                    isActive
                      ? "opacity-100 backdrop-blur-[14px]"
                      : "opacity-0 backdrop-blur-0",
                  ].join(" ")}
                />
              </div>

              <div className="absolute inset-0 z-20 grid place-items-center px-6 text-center">
                <div className="max-w-[320px]">
                  <div className="whitespace-pre-line text-[24px] font-medium leading-[1.1] text-white">
                    {z.title}
                  </div>

                  {z.text && (
                    <p
                      className={[
                        "mt-4 text-[12px] leading-5 text-white/80",
                        "transition-opacity duration-400 ease-out",
                        isActive ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    >
                      {z.text}
                    </p>
                  )}

                  {z.ctaLabel && z.ctaHref && (
                    <div
                      className={[
                        "mt-6 flex justify-center",
                        "transition-opacity duration-400 ease-out",
                        isActive ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    >
                      <Link
                        href={z.ctaHref}
                        className="inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/10 px-5 py-3 text-[12px] font-medium text-white backdrop-blur-md hover:bg-white hover:text-black"
                      >
                        {z.ctaLabel}
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-black">
                          ↗
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
