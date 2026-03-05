import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/layout/Container";

type Props = {
  image: { src: string; alt: string };
  title: string;
  excerpt: string;
  date: string;
  className?: string;
};

export function JournalArticleHero({
  image,
  title,
  excerpt,
  date,
  className,
}: Props) {
  return (
    <section className={clsx("w-full", className)}>
      {/* ✅ Full viewport height */}
      <div className="relative h-[100svh] w-full overflow-hidden bg-black text-white">
        {/* ✅ Background image covers whole hero */}
        <div className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* ✅ Bottom panel full width */}
        <div className="absolute bottom-0 left-0 w-full bg-[#3E3E3E]/95 backdrop-blur-sm">
          <Container>
            <div className="py-10 max-lg:py-8">
              <div className="grid grid-cols-12 gap-10 max-lg:gap-8">
                {/* LEFT */}
                <div className="col-span-12 lg:col-span-6">
                  <h1 className="whitespace-pre-line text-[34px] font-medium leading-[1.1] tracking-wide text-white max-lg:text-[26px]">
                    {title}
                  </h1>
                </div>

                {/* RIGHT */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="whitespace-pre-line text-[12px] leading-6 text-white/70">
                    {excerpt}
                  </div>
                  <div className="mt-4 text-[11px] text-white/45">
                    Дата публикации {date}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
