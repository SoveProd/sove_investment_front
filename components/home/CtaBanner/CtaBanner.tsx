import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type Props = {
  title?: string;
  bgSrc?: string;
};

export function CtaBanner({
  title = "НАЧНИ СВОЙ ИНВЕСТ\nРЕМОНТ С SOVE",
  bgSrc = "/images/banner.png",
}: Props) {
  return (
    <section className="w-full overflow-hidden bg-bg">
      {/* MOBILE */}
      <div className="lg:hidden">
        <div className="relative h-[244px] w-full">
          <Image
            src={bgSrc}
            alt=""
            fill
            priority={false}
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <Container className="py-8">
          <h2 className="whitespace-pre-line text-[24px] font-medium uppercase leading-[1.02] tracking-[-0.02em] text-text">
            {title}
          </h2>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              href="/contact"
              variant="primary"
              className="w-full justify-center"
            >
              НАЧАТЬ ИНВЕСТИРОВАТЬ
            </Button>

            <Button
              href="/consultation"
              variant="outlineDark"
              className="w-full justify-center"
            >
              ПОСМОТРЕТЬ КОНЦЕПЦИИ
            </Button>
          </div>
        </Container>
      </div>

      {/* DESKTOP */}
      <div className="relative hidden min-h-screen w-full overflow-hidden lg:block">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={bgSrc}
            alt=""
            fill
            priority={false}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Content */}
        <Container className="relative">
          <div className="flex min-h-screen flex-col justify-between py-32">
            <h2 className="whitespace-pre-line text-[60px] font-medium leading-[1.05] tracking-[-0.02em] text-white uppercase">
              {title}
            </h2>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary">
                ЗАПОЛНИТЬ ЗАЯВКУ
              </Button>

              <Button href="/consultation" variant="outlineDark">
                ПРОКОНСУЛЬТИРОВАТЬСЯ
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
