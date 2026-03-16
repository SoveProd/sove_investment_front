import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
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
    <section className="relative min-h-screen w-full min-w-0 overflow-x-hidden text-white">
      {/* BACKGROUND IMAGE */}
      <Image
        src={concept.image.src}
        alt={concept.image.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/10" />

      {/* BOTTOM PANEL */}
      <div className="absolute bottom-0 left-0 w-full min-w-0 bg-[#3B3B3B] h-[380px] overflow-hidden">
        <Container className="h-full min-w-0">
          <div className="grid h-full grid-cols-12 items-center gap-8 lg:gap-12 max-lg:gap-8">
            {/* LEFT */}
            <div className="col-span-12 min-w-0 lg:col-span-6">
              <div className="flex items-center gap-4">
                <h1 className="text-[40px] font-medium leading-none tracking-[0.06em] max-lg:text-[34px]">
                  {concept.title}
                </h1>

                <span className="flex h-[42px] w-[107px] items-center justify-center rounded-[10px] bg-white text-[14px] font-medium text-[#1f1f1f]">
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

            {/* RIGHT */}
            <div className="col-span-12 min-w-0 lg:col-span-6">
              <div className="max-w-[560px] text-[14px] leading-relaxed text-white/60 whitespace-pre-line">
                {concept.shortRightText}
              </div>

              {/* Кнопка как на скрине: большая белая капсула */}
              <div className="mt-7 max-w-[520px]">
                <Button
                  href={concept.ctaHref}
                  variant="secondaryLight"
                  size="lg"
                  maxWidth={false}
                  className={clsx(
                    "w-full",
                    "bg-white text-[#1f1f1f] border-transparent",
                    "hover:bg-white hover:text-[#1f1f1f]",
                    "h-[64px] sm:h-[72px]",
                    "text-[18px] sm:text-[20px]",
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

      {/* spacer чтобы панель не съедала высоту при скролле */}
      <div className="pointer-events-none h-[220px] max-lg:h-[260px]" />
    </section>
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
    <div className="flex flex-wrap gap-2 min-w-0">
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
