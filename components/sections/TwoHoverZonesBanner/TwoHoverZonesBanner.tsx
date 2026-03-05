"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

export type TwoZone = {
  title?: string; // если нужен текст
  logoSrc?: string; // если нужен логотип картинкой
  logoAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  imageSrc: string;
  left: TwoZone;
  right: TwoZone;

  heightClassName?: string; // например "h-[520px]" или "h-screen"
  overlayClassName?: string; // затемнение фона
  className?: string;
};

export function TwoHoverZonesBanner({
  imageSrc,
  left,
  right,
  heightClassName = "h-[100svh]",
  overlayClassName = "bg-black/35",
  className = "",
}: Props) {
  const [active, setActive] = useState<"left" | "right" | null>(null);

  return (
    <section
      className={clsx(
        // Убрали rounded, оставили overflow-hidden
        "relative w-full overflow-hidden rounded-none",
        heightClassName,
        className,
      )}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className={clsx("absolute inset-0", overlayClassName)} />
      </div>

      {/* Zones */}
      <div className="relative grid h-full w-full grid-cols-12">
        {/* LEFT */}
        <div
          className="relative col-span-12 lg:col-span-6"
          onMouseEnter={() => setActive("left")}
          onMouseLeave={() => setActive(null)}
        >
          {/* Focus layer */}
          <button
            type="button"
            className="absolute inset-0 z-10 h-full w-full outline-none"
            onFocus={() => setActive("left")}
            onBlur={() => setActive(null)}
            aria-label={left.title ?? "Left zone"}
          />

          {/* Blur overlay ONLY on hover */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className={clsx(
                "absolute inset-0 bg-black/25",
                "transition-[opacity,backdrop-filter] duration-500 ease-out",
                active === "left"
                  ? "opacity-100 backdrop-blur-[14px]"
                  : "opacity-0 backdrop-blur-0",
              )}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 grid place-items-center px-6 text-center">
            <div className="max-w-[360px]">
              {/* LOGO or TITLE */}
              {left.logoSrc ? (
                <div className="relative mx-auto h-[48px] w-[400px] max-lg:h-[36px] max-lg:w-[260px]">
                  <Image
                    src={left.logoSrc}
                    alt={left.logoAlt ?? ""}
                    fill
                    className="object-contain"
                    sizes="400px"
                  />
                </div>
              ) : (
                left.title && (
                  <div className="whitespace-pre-line text-[26px] font-medium leading-[1.1] text-white max-lg:text-[22px]">
                    {left.title}
                  </div>
                )
              )}

              {/* CTA (only on hover/focus) */}
              {left.ctaLabel && left.ctaHref && (
                <div
                  className={clsx(
                    "mt-6 flex justify-center",
                    "transition-opacity duration-300 ease-out",
                    active === "left" ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Link
                    href={left.ctaHref}
                    className={clsx(
                      "inline-flex items-center justify-between gap-4",
                      "h-[54px] rounded-full bg-white px-6 text-[14px] font-medium text-black",
                      "shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
                      "hover:opacity-95",
                    )}
                  >
                    <span className="whitespace-nowrap">{left.ctaLabel}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white">
                      ↗
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="relative col-span-12 lg:col-span-6"
          onMouseEnter={() => setActive("right")}
          onMouseLeave={() => setActive(null)}
        >
          {/* Focus layer */}
          <button
            type="button"
            className="absolute inset-0 z-10 h-full w-full outline-none"
            onFocus={() => setActive("right")}
            onBlur={() => setActive(null)}
            aria-label={right.title ?? "Right zone"}
          />

          {/* Blur overlay ONLY on hover */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className={clsx(
                "absolute inset-0 bg-black/25",
                "transition-[opacity,backdrop-filter] duration-500 ease-out",
                active === "right"
                  ? "opacity-100 backdrop-blur-[14px]"
                  : "opacity-0 backdrop-blur-0",
              )}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 grid place-items-center px-6 text-center">
            <div className="max-w-[360px]">
              {right.logoSrc ? (
                <div className="relative mx-auto h-[80px] w-[400px] max-lg:h-[60px] max-lg:w-[280px]">
                  <Image
                    src={right.logoSrc}
                    alt={right.logoAlt ?? ""}
                    fill
                    className="object-contain"
                    sizes="260px"
                  />
                </div>
              ) : (
                right.title && (
                  <div className="whitespace-pre-line text-[26px] font-medium leading-[1.1] text-white max-lg:text-[22px]">
                    {right.title}
                  </div>
                )
              )}

              {right.ctaLabel && right.ctaHref && (
                <div
                  className={clsx(
                    "mt-6 flex justify-center",
                    "transition-opacity duration-300 ease-out",
                    active === "right" ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Link
                    href={right.ctaHref}
                    className={clsx(
                      "inline-flex items-center justify-between gap-4",
                      "h-[54px] rounded-full bg-white px-6 text-[14px] font-medium text-black",
                      "shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
                      "hover:opacity-95",
                    )}
                  >
                    <span className="whitespace-nowrap">{right.ctaLabel}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white">
                      ↗
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTER DIVIDER */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/35 lg:block" />
      </div>
    </section>
  );
}
