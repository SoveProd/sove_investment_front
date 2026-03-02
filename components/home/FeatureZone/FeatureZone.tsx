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

      {/* Zones */}
      <div
        className="relative grid h-full w-full"
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
              {/* Click layer for accessibility */}
              <button
                type="button"
                className="absolute inset-0 z-10 h-full w-full outline-none"
                onFocus={() => setActive(idx)}
                onBlur={() => setActive(null)}
                aria-label={z.title}
              />

              {/* Blur overlay */}
              <div className="absolute inset-0 pointer-events-none">
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

              {/* Content */}
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

                  {/* CTA */}
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