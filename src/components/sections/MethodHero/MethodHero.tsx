import Image from "next/image";
import { Container } from "@/src/components/layout/Container";
import { ArrowButton } from "@/src/components/ui/ArrowBtn";

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

        {/* твой overlay оставляем */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <Container className="relative">
        <div className="flex min-h-screen items-center justify-center py-24">
          <div className="flex flex-col items-center text-center">
            {/* LOGO */}
            <div className="relative w-[451px] h-[69px] max-lg:w-[320px] max-lg:h-[49px]">
              <Image
                src="/metod_logo.svg"
                alt="Metod ремонта"
                fill
                priority
                className="object-contain"
              />
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
