import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ArrowButton } from "@/components/ui/ArrowBtn";

type Props = {
  bgSrc?: string;
};

export function MethodHero({ bgSrc = "/images/hero.jpg" }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* background */}
      <div className="absolute inset-0">
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* затемнение как на макете */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <Container className="relative">
        <div className="flex min-h-screen items-center justify-center py-24">
          <div className="text-center">
            {/* Title */}
            <div className="select-none">
              <div className="text-[64px] font-light uppercase tracking-[0.32em] text-white max-lg:text-[46px]">
                METOD
              </div>
              <div className="mt-2 text-[14px] font-light uppercase tracking-[0.55em] text-white/85 max-lg:text-[12px]">
                ремонта
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <ArrowButton
                label="Оформить подписку"
                href="/packages"
                variant="light"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
