import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
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

      {/* Content */}
      <Container className="relative flex min-h-screen items-end pb-16">
        <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 className="whitespace-pre-line text-[65px] leading-[1.1] tracking-wide text-white">
              SOVE - ИНВЕСТИРУЙ{"\n"}В НЕДВИЖИМОСТЬ КРАСИВО
            </h1>

            <p className="mt-6 max-w-xl text-[23px] leading-relaxed text-white/80">
              SOVE управляет всеми аспектами: дизайн, ремонт, продажа. Ты
              получаешь прибыль. Просто и надёжно.
            </p>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="flex w-full flex-col gap-4 sm:max-w-[481px]">
              <Button href="/packages" variant="primary">
                НАЧАТЬ ИНВЕСТИРОВАТЬ
              </Button>

              <Button href="/concepts" variant="outline">
                ПОСМОТРЕТЬ КОНЦЕПЦИИ
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
