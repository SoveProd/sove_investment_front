import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { Container } from "@/src/components/layout/Container";
import { Button } from "@/src/components/ui/Button";
import type { ConceptHeroData } from "./types";

type Props = {
  concept: ConceptHeroData;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function ConceptHeroSection({ concept }: Props) {
  const total = Math.max(1, concept.totalSlots);
  const available = clamp(concept.availableSlots, 0, total);

  return (
    <>
      {/* MOBILE */}
      <section className="md:hidden w-full bg-[#3B3B3B] text-white">
        <div className="relative h-[520px] w-full overflow-hidden">
          <Image
            src={concept.image.src}
            alt={concept.image.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="bg-[#3B3B3B] px-3 pb-5 pt-4">
          <h1 className="text-[28px] font-medium uppercase leading-none tracking-[0.05em]">
            {concept.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex h-[26px] items-center justify-center rounded-[7px] bg-white px-2.5 text-[11px] font-medium text-[#1f1f1f]">
              {concept.badge}
            </span>

            {concept.styleLabel && (
              <span className="inline-flex h-[26px] items-center justify-center rounded-[7px] bg-white/15 px-2.5 text-[11px] font-medium text-white">
                {concept.styleLabel}
              </span>
            )}
          </div>

          {concept.shortRightText && (
            <p className="mt-4 text-[13px] leading-[1.35] text-white/72 whitespace-pre-line">
              {concept.shortRightText}
            </p>
          )}

          <div className="mt-4 space-y-2 text-[13px] leading-[1.35] text-white/80">
            <div>
              <span className="font-semibold text-white">Для кого:</span>{" "}
              {concept.forWho}
            </div>

            <div>
              <span className="font-semibold text-white">
                Ориентировочный бюджет за м2 ~
              </span>{" "}
              {concept.budgetPerM2}
            </div>
          </div>

          <div className="mt-5 text-[12px] text-white/60">
            Доступно {available}/{total} слотов
          </div>

          <div className="mt-2.5">
            <SegmentBarMobile total={total} available={available} />
          </div>

          <div className="mt-5">
            <Button
              href={concept.ctaHref}
              variant="secondaryLight"
              size="lg"
              maxWidth={false}
              className={clsx(
                "h-[48px] w-full rounded-full border-transparent bg-white px-5 text-[14px] font-medium text-[#1f1f1f]",
                "hover:bg-white hover:text-[#1f1f1f]",
              )}
            >
              {concept.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* DESKTOP */}
      <section className="relative hidden min-h-screen w-full min-w-0 overflow-x-hidden text-white md:block">
        <Image
          src={concept.image.src}
          alt={concept.image.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute bottom-0 left-0 h-[380px] w-full min-w-0 overflow-hidden bg-[#3B3B3B]">
          <Container className="h-full min-w-0">
            <div className="grid h-full grid-cols-12 items-center gap-8 lg:gap-12 max-lg:gap-8">
              <div className="col-span-12 min-w-0 lg:col-span-6">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-[40px] font-medium leading-none tracking-[0.06em] max-lg:text-[34px]">
                    {concept.title}
                  </h1>

                  <span className="flex h-[42px] min-w-[107px] items-center justify-center rounded-[10px] bg-white px-4 text-[14px] font-medium text-[#1f1f1f]">
                    {concept.badge}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-[14px] leading-relaxed text-white/80">
                  <div>
                    <span className="font-semibold text-white">Для кого:</span>{" "}
                    {concept.forWho}
                  </div>

                  <div>
                    <span className="font-semibold text-white">
                      Ориентировочный бюджет за м2 ~
                    </span>{" "}
                    {concept.budgetPerM2}
                  </div>
                </div>

                <div className="mt-5 text-[13px] text-white/60">
                  Доступно {available}/{total} слотов
                </div>

                <div className="mt-3">
                  <SegmentBar total={total} available={available} />
                </div>
              </div>

              <div className="col-span-12 min-w-0 lg:col-span-6">
                <div className="max-w-[560px] whitespace-pre-line text-[14px] leading-relaxed text-white/60">
                  {concept.shortRightText}
                </div>

                <div className="mt-7 max-w-[520px]">
                  <Button
                    href={concept.ctaHref}
                    variant="secondaryLight"
                    size="lg"
                    maxWidth={false}
                    className={clsx(
                      "h-[64px] w-full border-transparent bg-white text-[18px] text-[#1f1f1f] hover:bg-white hover:text-[#1f1f1f] sm:h-[72px] sm:text-[20px]",
                      "normal-case",
                    )}
                  >
                    {concept.ctaLabel}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="pointer-events-none h-[220px] max-lg:h-[260px]" />
      </section>
    </>
  );
}

function SegmentBarMobile({
  total,
  available,
}: {
  total: number;
  available: number;
}) {
  const safeTotal = Math.max(1, total);
  const safeAvailable = clamp(available, 0, safeTotal);

  return (
    <div className="flex gap-[6px]">
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const isAvailable = idx < safeAvailable;
        return (
          <span
            key={idx}
            className={clsx(
              "h-[6px] w-full rounded-full",
              isAvailable ? "bg-white" : "bg-white/14",
            )}
          />
        );
      })}
    </div>
  );
}

function SegmentBar({
  total,
  available,
}: {
  total: number;
  available: number;
}) {
  const safeTotal = Math.max(1, total);
  const safeAvailable = clamp(available, 0, safeTotal);

  return (
    <div className="flex min-w-0 flex-wrap gap-2">
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const isAvailable = idx < safeAvailable;
        return (
          <span
            key={idx}
            className={clsx(
              "h-[19px] w-[56px] rounded-full",
              isAvailable ? "bg-white" : "bg-white/20",
            )}
          />
        );
      })}
    </div>
  );
}
