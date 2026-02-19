import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "../ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <Container className="relative flex min-h-screen items-end pb-10 lg:pb-12 xl:pb-16">
        <div className="grid w-full gap-8 lg:gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal delay={0}>
              <h1 className="whitespace-pre-line font-medium leading-[1.08] tracking-wide text-white text-[34px] sm:text-[44px] lg:text-[52px] xl:text-[65px]">
                SOVE - ИНВЕСТИРУЙ{"\n"}В НЕДВИЖИМОСТЬ КРАСИВО
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 sm:mt-5 lg:mt-6 max-w-xl leading-relaxed text-white/80 text-[15px] sm:text-[17px] lg:text-[18px] xl:text-[23px]">
                SOVE управляет всеми аспектами: дизайн, ремонт, продажа. Ты
                получаешь прибыль. Просто и надёжно.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="flex w-full flex-col gap-3 sm:gap-4 sm:max-w-[481px]">
              <Reveal delay={0.22}>
                <Button href="/packages" variant="primary">
                  НАЧАТЬ ИНВЕСТИРОВАТЬ
                </Button>
              </Reveal>

              <Reveal delay={0.32}>
                <Button href="/concepts" variant="outline">
                  ПОСМОТРЕТЬ КОНЦЕПЦИИ
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
