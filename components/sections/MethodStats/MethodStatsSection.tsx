import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/layout/Container";

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
      className={clsx("w-full bg-white pb-[90px] max-lg:pb-[70px]", className)}
    >
      <Container>
        {/* Stats row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
           <div
  key={`${s.value}-${s.label}`}
  className="
    flex w-full flex-col items-center justify-center
    rounded-[32px]
    bg-[#383838]
    border border-[#F8F8F8]
    h-[269px]
    px-8
    text-center
    max-lg:h-[200px]
  "
>
  <div className="text-[56px] font-medium leading-none text-white max-lg:text-[40px]">
    {s.value}
  </div>

  <div className="mt-4 text-[24px] font-normal leading-snug text-white/80 max-lg:text-[16px]">
    {s.label}
  </div>

            </div>
          ))}
        </div>

        {/* Big image */}
        <div className="mt-6 overflow-hidden rounded-[26px] bg-black/5">
          <div className="relative aspect-[16/6] w-full max-lg:aspect-[16/8]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
