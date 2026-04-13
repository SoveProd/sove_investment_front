"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

export type TwoZone = {
  title?: string;
  logoSrc?: string;
  logoAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  imageSrc: string;
  left: TwoZone;
  right: TwoZone;
  heightClassName?: string;
  overlayClassName?: string;
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
    <>
      {/* MOBILE */}
      <section
        className={clsx(
          "relative w-full overflow-hidden lg:hidden",
          "h-[640px]",
          className,
        )}
      >
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

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="flex flex-1 flex-col items-center justify-center">
            <ZoneContentMobile zone={left} logoType="sove" />
          </div>

          <div className="w-[140px] border-t border-white/70" />

          <div className="flex flex-1 flex-col items-center justify-center">
            <ZoneContentMobile zone={right} logoType="metod" />
          </div>
        </div>
      </section>

      {/* DESKTOP */}
      <section
        className={clsx(
          "relative hidden w-full overflow-hidden rounded-none lg:block",
          heightClassName,
          className,
        )}
      >
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

        <div className="relative grid h-full w-full grid-cols-12">
          <div
            className="relative col-span-12 lg:col-span-6"
            onMouseEnter={() => setActive("left")}
            onMouseLeave={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute inset-0 z-10 h-full w-full outline-none"
              onFocus={() => setActive("left")}
              onBlur={() => setActive(null)}
              aria-label={left.title ?? "Left zone"}
            />

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

            <div className="absolute inset-0 z-20 grid place-items-center px-6 text-center">
              <div className="max-w-[360px]">
                {left.logoSrc ? (
                  <div className="relative mx-auto h-[48px] w-[400px]">
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
                    <div className="whitespace-pre-line text-[26px] font-medium leading-[1.1] text-white">
                      {left.title}
                    </div>
                  )
                )}

                {left.ctaLabel && left.ctaHref && (
                  <div
                    className={clsx(
                      "mt-6 flex justify-center transition-opacity duration-300 ease-out",
                      active === "left" ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <CtaLink href={left.ctaHref} label={left.ctaLabel} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="relative col-span-12 lg:col-span-6"
            onMouseEnter={() => setActive("right")}
            onMouseLeave={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute inset-0 z-10 h-full w-full outline-none"
              onFocus={() => setActive("right")}
              onBlur={() => setActive(null)}
              aria-label={right.title ?? "Right zone"}
            />

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

            <div className="absolute inset-0 z-20 grid place-items-center px-6 text-center">
              <div className="max-w-[360px]">
                {right.logoSrc ? (
                  <div className="relative mx-auto h-[80px] w-[400px]">
                    <Image
                      src={right.logoSrc}
                      alt={right.logoAlt ?? ""}
                      fill
                      className="object-contain"
                      sizes="400px"
                    />
                  </div>
                ) : (
                  right.title && (
                    <div className="whitespace-pre-line text-[26px] font-medium leading-[1.1] text-white">
                      {right.title}
                    </div>
                  )
                )}

                {right.ctaLabel && right.ctaHref && (
                  <div
                    className={clsx(
                      "mt-6 flex justify-center transition-opacity duration-300 ease-out",
                      active === "right" ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <CtaLink href={right.ctaHref} label={right.ctaLabel} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/35 lg:block" />
        </div>
      </section>
    </>
  );
}

function ZoneContentMobile({
  zone,
  logoType,
}: {
  zone: TwoZone;
  logoType: "sove" | "metod";
}) {
  return (
    <div className="flex flex-col items-center">
      {zone.logoSrc ? (
        <div
          className={clsx(
            "relative mx-auto",
            logoType === "sove" ? "h-[30px] w-[170px]" : "h-[54px] w-[190px]",
          )}
        >
          <Image
            src={zone.logoSrc}
            alt={zone.logoAlt ?? ""}
            fill
            className="object-contain"
            sizes="200px"
          />
        </div>
      ) : (
        zone.title && (
          <div className="text-[22px] font-medium leading-[1.1] text-white">
            {zone.title}
          </div>
        )
      )}

      {zone.ctaLabel && zone.ctaHref && (
        <div className="mt-6">
          <CtaLink href={zone.ctaHref} label={zone.ctaLabel} mobile />
        </div>
      )}
    </div>
  );
}

function CtaLink({
  href,
  label,
  mobile = false,
}: {
  href: string;
  label: string;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-between rounded-full bg-white text-black shadow-[0_18px_50px_rgba(0,0,0,0.28)] hover:opacity-95",
        mobile
          ? "h-[40px] w-[170px] px-4 text-[14px]"
          : "h-[54px] gap-4 px-6 text-[14px] font-medium",
      )}
    >
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={clsx(
          "grid shrink-0 place-items-center rounded-full bg-[#4A4A4A] text-white",
          mobile ? "h-[30px] w-[30px]" : "h-9 w-9",
        )}
      >
        <svg
          width={mobile ? "14" : "16"}
          height={mobile ? "14" : "16"}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 17L17 7M17 7H9M17 7V15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
