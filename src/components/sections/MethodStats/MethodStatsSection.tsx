import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/src/components/layout/Container";

export type MethodStatItem = {
  value: string;
  label: string;
};

type Props = {
  className?: string;
  stats: MethodStatItem[];
  image: { src: string; alt: string };
};

export function MethodStatsSection({ className = "", stats, image }: Props) {
  return (
    <section
      className={clsx("w-full bg-white pb-[56px] lg:pb-[90px]", className)}
    >
      <Container>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-[8px] lg:grid-cols-4 lg:gap-4">
          {stats.map((s) => (
            <div
              key={`${s.value}-${s.label}`}
              className={clsx(
                "flex flex-col items-center justify-center text-center",
                "bg-graphite border border-surfaceAlt",
                "rounded-[18px]",

                // MOBILE exact size
                "h-[156px] w-full",

                // DESKTOP
                "lg:h-[269px] lg:rounded-[32px] lg:px-8",
              )}
            >
              <div
                className={clsx(
                  "text-[32px] font-medium leading-none text-white",
                  "lg:text-[56px]",
                )}
              >
                {s.value}
              </div>

              <div
                className={clsx(
                  "mt-2 text-[12px] leading-[1.2] text-white/80 px-3",
                  "lg:mt-4 lg:text-[24px]",
                )}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="mt-6 overflow-hidden rounded-[20px] lg:rounded-[26px]">
          <div className="relative aspect-343/190 w-full lg:aspect-16/6">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
